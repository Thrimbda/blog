import { cp, mkdir, mkdtemp, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const managedLanguages = ["en-US", "ja-JP", "es-ES", "de-DE"] as const;
const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sourceRoot = path.join(repoRoot, ".czon", "src");
const contentRoot = path.join(repoRoot, "content");
const managedSuffixPattern = new RegExp(
  `\\.(${managedLanguages.map((language) => language.replace(/[-/\\^$*+?.()|[\]{}]/g, "\\$&")).join("|")})\\.md$`
);

type SyncResult = {
  generated: number;
  updated: number;
  unchanged: number;
  deleted: number;
  deletedFiles: string[];
};

type CliOptions = {
  command: "build" | "sync" | "clean";
  outputDir: string;
};

function normalizeLineEndings(content: string): string {
  return content.replace(/\r\n?/g, "\n");
}

function parseCliOptions(argv: string[]): CliOptions {
  let command: CliOptions["command"] = "build";
  let outputDir = path.join(repoRoot, "public");

  for (let index = 0; index < argv.length; index += 1) {
    const arg = argv[index];

    if (arg === "build" || arg === "sync" || arg === "clean") {
      command = arg;
      continue;
    }

    if (arg === "--output-dir") {
      const next = argv[index + 1];
      if (!next) {
        throw new Error("Missing value for --output-dir");
      }

      outputDir = path.resolve(repoRoot, next);
      index += 1;
      continue;
    }

    throw new Error(`Unknown argument: ${arg}`);
  }

  return { command, outputDir };
}

function ensureWithin(root: string, candidate: string): string {
  const resolvedRoot = path.resolve(root);
  const resolvedCandidate = path.resolve(candidate);

  if (resolvedCandidate === resolvedRoot || resolvedCandidate.startsWith(resolvedRoot + path.sep)) {
    return resolvedCandidate;
  }

  throw new Error(`Path escapes managed root: ${candidate}`);
}

async function requireDirectory(directoryPath: string): Promise<string> {
  const resolvedPath = ensureWithin(repoRoot, directoryPath);
  const metadata = await stat(resolvedPath).catch(() => null);

  if (!metadata || !metadata.isDirectory()) {
    throw new Error(`Required directory is missing: ${path.relative(repoRoot, resolvedPath)}`);
  }

  return resolvedPath;
}

async function walkMarkdownFiles(root: string): Promise<string[]> {
  const files: string[] = [];
  const resolvedRoot = ensureWithin(repoRoot, root);

  async function visit(currentDirectory: string): Promise<void> {
    const entries = await readdir(currentDirectory, { withFileTypes: true });

    for (const entry of entries) {
      const absolutePath = ensureWithin(resolvedRoot, path.join(currentDirectory, entry.name));

      if (entry.isSymbolicLink()) {
        throw new Error(`Symbolic links are not supported: ${path.relative(repoRoot, absolutePath)}`);
      }

      if (entry.isDirectory()) {
        await visit(absolutePath);
        continue;
      }

      if (entry.isFile() && absolutePath.endsWith(".md")) {
        files.push(absolutePath);
      }
    }
  }

  await visit(resolvedRoot);
  return files.sort();
}

function targetPathFor(sourceFile: string, language: (typeof managedLanguages)[number]): string {
  const languageContentRoot = ensureWithin(repoRoot, path.join(sourceRoot, language, "content"));
  const relativePath = path.relative(languageContentRoot, sourceFile);

  if (!relativePath || relativePath.startsWith("..")) {
    throw new Error(`Unexpected source path: ${path.relative(repoRoot, sourceFile)}`);
  }

  const extension = path.extname(relativePath);
  const baseName = relativePath.slice(0, -extension.length);
  return ensureWithin(contentRoot, path.join(contentRoot, `${baseName}.${language}${extension}`));
}

function normalizeDateValue(rawValue: string, fallbackDate: string | null = null): string | null {
  if (/^\d{4}-\d{2}-\d{2}(T.*)?$/.test(rawValue) || /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/.test(rawValue)) {
    return rawValue;
  }

  const parsedDate = new Date(rawValue);
  if (!Number.isNaN(parsedDate.getTime())) {
    return parsedDate.toISOString().slice(0, 10);
  }

  return fallbackDate;
}

function extractDateValue(markdown: string): string | null {
  if (markdown.startsWith("+++\n")) {
    const closingMarkerIndex = markdown.indexOf("\n+++\n", 4);
    if (closingMarkerIndex === -1) {
      return null;
    }

    const frontMatter = markdown.slice(4, closingMarkerIndex);
    for (const line of frontMatter.split("\n")) {
      const match = line.match(/^\s*date\s*=\s*(.+)$/);
      if (!match) {
        continue;
      }

      const rawValue = match[1].trim().replace(/^['"]|['"]$/g, "");
      return normalizeDateValue(rawValue);
    }

    return null;
  }

  if (!markdown.startsWith("---\n")) {
    return null;
  }

  const closingMarkerIndex = markdown.indexOf("\n---\n", 4);
  if (closingMarkerIndex === -1) {
    return null;
  }

  const frontMatter = markdown.slice(4, closingMarkerIndex);
  for (const line of frontMatter.split("\n")) {
    const match = line.match(/^date:(\s*)(.+)$/);
    if (!match) {
      continue;
    }

    const rawValue = match[2].trim().replace(/^['"]|['"]$/g, "");
    return normalizeDateValue(rawValue);
  }

  return null;
}

function normalizeFrontMatter(markdown: string, fallbackDate: string | null = null): string {
  if (markdown.startsWith("+++\n")) {
    const closingMarkerIndex = markdown.indexOf("\n+++\n", 4);
    if (closingMarkerIndex === -1) {
      return markdown;
    }

    const frontMatter = markdown.slice(4, closingMarkerIndex);
    const body = markdown.slice(closingMarkerIndex + 5);
    const normalizedFrontMatter = frontMatter
      .split("\n")
      .map((line) => {
        const dateMatch = line.match(/^(\s*date\s*=\s*)(.+)$/);
        if (dateMatch) {
          if (fallbackDate) {
            return `${dateMatch[1]}${fallbackDate}`;
          }

          const rawValue = dateMatch[2].trim().replace(/^['"]|['"]$/g, "");
          const normalizedDate = normalizeDateValue(rawValue, fallbackDate);
          if (normalizedDate) {
            return `${dateMatch[1]}${normalizedDate}`;
          }
        }

        const titleMatch = line.match(/^(\s*title\s*=\s*)(.+)$/);
        if (titleMatch) {
          let value = titleMatch[2].trim();
          if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
            value = value.slice(1, -1);
          }

          const escapedValue = value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
          return `${titleMatch[1]}"${escapedValue}"`;
        }

        return line;
      })
      .join("\n");

    return `+++\n${normalizedFrontMatter}\n+++\n${body}`;
  }

  if (!markdown.startsWith("---\n")) {
    return markdown;
  }

  const closingMarkerIndex = markdown.indexOf("\n---\n", 4);
  if (closingMarkerIndex === -1) {
    return markdown;
  }

  const frontMatter = markdown.slice(4, closingMarkerIndex);
  const body = markdown.slice(closingMarkerIndex + 5);
  const normalizedFrontMatter = frontMatter
    .split("\n")
    .map((line) => {
      const scalarMatch = line.match(/^(\s*)([A-Za-z0-9_-]+):(\s*)(.+)$/);
      if (scalarMatch && scalarMatch[2] === "date") {
        if (fallbackDate) {
          return `${scalarMatch[1]}${scalarMatch[2]}:${scalarMatch[3]}${fallbackDate}`;
        }

        const rawValue = scalarMatch[4].trim().replace(/^['"]|['"]$/g, "");
        const normalizedDate = normalizeDateValue(rawValue, fallbackDate);
        if (normalizedDate) {
          return `${scalarMatch[1]}${scalarMatch[2]}:${scalarMatch[3]}${normalizedDate}`;
        }
      }

      if (scalarMatch && scalarMatch[2] === "title") {
        let value = scalarMatch[4].trim();
        if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
          value = value.slice(1, -1);
        }

        const escapedValue = value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
        return `${scalarMatch[1]}${scalarMatch[2]}:${scalarMatch[3]}"${escapedValue}"`;
      }

      const match = line.match(/^(\s*)([A-Za-z0-9_-]+):(\s*)'(.*)'$/);
      if (!match) {
        return line;
      }

      const value = match[4].replace(/\\/g, "\\\\").replace(/"/g, '\\"');
      return `${match[1]}${match[2]}:${match[3]}"${value}"`;
    })
    .join("\n");

  return `---\n${normalizedFrontMatter}\n---\n${body}`;
}

async function readFallbackDate(targetFile: string, language: (typeof managedLanguages)[number]): Promise<string | null> {
  const languageSuffix = `.${language}.md`;
  if (!targetFile.endsWith(languageSuffix)) {
    return null;
  }

  const defaultContentFile = ensureWithin(contentRoot, `${targetFile.slice(0, -languageSuffix.length)}.md`);
  const defaultContent = await readFile(defaultContentFile, "utf8").catch((error: NodeJS.ErrnoException) => {
    if (error.code === "ENOENT") {
      return null;
    }

    throw error;
  });

  if (!defaultContent) {
    return null;
  }

  return extractDateValue(normalizeLineEndings(defaultContent));
}

async function writeIfChanged(targetFile: string, nextContent: string): Promise<"generated" | "updated" | "unchanged"> {
  const currentContent = await readFile(targetFile, "utf8").catch((error: NodeJS.ErrnoException) => {
    if (error.code === "ENOENT") {
      return null;
    }

    throw error;
  });

  if (currentContent === nextContent) {
    return "unchanged";
  }

  await mkdir(path.dirname(targetFile), { recursive: true });
  await writeFile(targetFile, nextContent, "utf8");
  return currentContent === null ? "generated" : "updated";
}

async function syncLanguage(language: (typeof managedLanguages)[number], expectedTargets: Set<string>, result: SyncResult): Promise<void> {
  const languageContentRoot = await requireDirectory(path.join(sourceRoot, language, "content"));
  const sourceFiles = await walkMarkdownFiles(languageContentRoot);

  for (const sourceFile of sourceFiles) {
    const targetFile = targetPathFor(sourceFile, language);
    expectedTargets.add(targetFile);

    const fallbackDate = await readFallbackDate(targetFile, language);
    let sourceContent = normalizeFrontMatter(normalizeLineEndings(await readFile(sourceFile, "utf8")), fallbackDate);
    if (targetFile.endsWith(`${path.sep}blog${path.sep}_index.${language}.md`)) {
      sourceContent = sourceContent.replace(/\]\(\/tags\)/g, "](../tags)");
    }

    const writeResult = await writeIfChanged(targetFile, sourceContent);
    if (writeResult === "generated") {
      result.generated += 1;
    } else if (writeResult === "updated") {
      result.updated += 1;
    } else {
      result.unchanged += 1;
    }
  }
}

async function cleanupStaleTargets(expectedTargets: Set<string>, result: SyncResult): Promise<void> {
  const existingMarkdownFiles = await walkMarkdownFiles(contentRoot);

  for (const filePath of existingMarkdownFiles) {
    if (!managedSuffixPattern.test(filePath) || expectedTargets.has(filePath)) {
      continue;
    }

    await rm(filePath);
    result.deleted += 1;
    result.deletedFiles.push(path.relative(repoRoot, filePath));
  }
}

async function deleteManagedTargets(result: SyncResult): Promise<void> {
  const existingMarkdownFiles = await walkMarkdownFiles(contentRoot);

  for (const filePath of existingMarkdownFiles) {
    if (!managedSuffixPattern.test(filePath)) {
      continue;
    }

    await rm(filePath);
    result.deleted += 1;
    result.deletedFiles.push(path.relative(repoRoot, filePath));
  }
}

function printResult(result: SyncResult): void {
  console.log(
    [
      `generated=${result.generated}`,
      `updated=${result.updated}`,
      `unchanged=${result.unchanged}`,
      `deleted=${result.deleted}`,
    ].join(" ")
  );

  for (const deletedFile of result.deletedFiles) {
    console.log(`deleted: ${deletedFile}`);
  }
}

async function runSync(): Promise<void> {
  await requireDirectory(sourceRoot);
  await requireDirectory(contentRoot);

  const expectedTargets = new Set<string>();
  const result: SyncResult = {
    generated: 0,
    updated: 0,
    unchanged: 0,
    deleted: 0,
    deletedFiles: [],
  };

  for (const language of managedLanguages) {
    await syncLanguage(language, expectedTargets, result);
  }

  await cleanupStaleTargets(expectedTargets, result);
  printResult(result);
}

async function runClean(): Promise<void> {
  await requireDirectory(contentRoot);
  const result: SyncResult = {
    generated: 0,
    updated: 0,
    unchanged: 0,
    deleted: 0,
    deletedFiles: [],
  };

  await deleteManagedTargets(result);
  printResult(result);
}

function shouldExclude(relativePath: string): boolean {
  if (!relativePath) {
    return false;
  }

  const normalized = relativePath.split(path.sep).join("/");
  if (
    normalized === ".git" ||
    normalized.startsWith(".git/") ||
    normalized === ".legion" ||
    normalized.startsWith(".legion/") ||
    normalized === "public" ||
    normalized.startsWith("public/") ||
    normalized === "final-output" ||
    normalized.startsWith("final-output/")
  ) {
    return true;
  }

  if (normalized.startsWith("content/")) {
    return managedLanguages.some((language) => normalized.endsWith(`.${language}.md`));
  }

  return false;
}

async function runCommand(command: string, args: string[], cwd: string): Promise<void> {
  await new Promise<void>((resolve, reject) => {
    const child = spawn(command, args, {
      cwd,
      stdio: "inherit",
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${command} ${args.join(" ")} exited with code ${code ?? "unknown"}`));
    });
  });
}

async function runBuild(outputDir: string): Promise<void> {
  const tempRoot = await mkdtemp(path.join(tmpdir(), "blog-zola-build-"));

  try {
    await cp(repoRoot, tempRoot, {
      recursive: true,
      filter(sourcePath) {
        const relativePath = path.relative(repoRoot, sourcePath);
        return !shouldExclude(relativePath);
      },
    });

    await runCommand("node", ["scripts/zola-i18n.ts", "sync"], tempRoot);
    await runCommand("zola", ["build"], tempRoot);

    await rm(outputDir, { recursive: true, force: true });
    await mkdir(path.dirname(outputDir), { recursive: true });
    await cp(path.join(tempRoot, "public"), outputDir, { recursive: true });
  } finally {
    await rm(tempRoot, { recursive: true, force: true });
  }
}

async function main(): Promise<void> {
  const options = parseCliOptions(process.argv.slice(2));

  if (options.command === "clean") {
    await runClean();
    return;
  }

  if (options.command === "sync") {
    await runSync();
    return;
  }

  await runBuild(options.outputDir);
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`zola-i18n failed: ${message}`);
  process.exitCode = 1;
});
