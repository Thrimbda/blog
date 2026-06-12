import fs from "node:fs/promises";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const sourceDir = path.join(root, "scripts", "daily-sources");
const contentDir = path.join(root, "content");
const dataDir = path.join(root, "data");

function pad(value) {
  return String(value).padStart(2, "0");
}

function normalizeDate(raw) {
  const match = raw.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!match) {
    throw new Error(`Invalid date heading: ${raw}`);
  }

  return `${match[1]}-${pad(match[2])}-${pad(match[3])}`;
}

function tomlString(value) {
  return JSON.stringify(String(value));
}

function frontMatter({ title, date, slug, template = "daily-entry.html", taxonomies, extra = {} }) {
  const lines = ["+++", `title = ${tomlString(title)}`];

  if (date) {
    lines.push(`date = ${date}`);
  }

  if (slug) {
    lines.push(`slug = ${tomlString(slug)}`);
  }

  if (template) {
    lines.push(`template = ${tomlString(template)}`);
  }

  if (taxonomies?.tags?.length) {
    lines.push("", "[taxonomies]");
    lines.push(`tags = [${taxonomies.tags.map(tomlString).join(", ")}]`);
  }

  if (Object.keys(extra).length) {
    lines.push("", "[extra]");
    Object.entries(extra).forEach(([key, value]) => {
      if (typeof value === "number" || typeof value === "boolean") {
        lines.push(`${key} = ${value}`);
      } else {
        lines.push(`${key} = ${tomlString(value)}`);
      }
    });
  }

  lines.push("+++", "");
  return lines.join("\n");
}

function sectionFrontMatter({ title, template, pageTemplate, sortBy = "date", paginateBy = 8, extra = {} }) {
  const lines = [
    "+++",
    `title = ${tomlString(title)}`,
    `sort_by = ${tomlString(sortBy)}`,
    `paginate_by = ${paginateBy}`,
    `template = ${tomlString(template)}`,
    `page_template = ${tomlString(pageTemplate)}`,
  ];

  if (Object.keys(extra).length) {
    lines.push("", "[extra]");
    Object.entries(extra).forEach(([key, value]) => {
      if (typeof value === "number" || typeof value === "boolean") {
        lines.push(`${key} = ${value}`);
      } else {
        lines.push(`${key} = ${tomlString(value)}`);
      }
    });
  }

  lines.push("+++", "");
  return lines.join("\n");
}

function stripFrontMatter(markdown) {
  return markdown.replace(/^---\r?\n[\s\S]*?\r?\n---\r?\n/, "");
}

function stripMonthHeadings(markdown) {
  return markdown
    .split(/\r?\n/)
    .filter((line) => !/^# 2026\s*$/.test(line) && !/^## \d{4}-\d{2}\b/.test(line))
    .join("\n");
}

function trimSeparators(markdown) {
  const lines = markdown.split(/\r?\n/);

  while (lines.length && (/^\s*$/.test(lines[0]) || /^\s*---+\s*$/.test(lines[0]))) {
    lines.shift();
  }

  while (lines.length && (/^\s*$/.test(lines[lines.length - 1]) || /^\s*---+\s*$/.test(lines[lines.length - 1]))) {
    lines.pop();
  }

  return lines.join("\n").trim();
}

function extractEntries(markdown, headingPattern) {
  const matches = Array.from(markdown.matchAll(headingPattern));

  return matches.map((match, index) => {
    const next = matches[index + 1];
    const headingStart = match.index ?? 0;
    const contentStart = headingStart + match[0].length;
    const contentEnd = next?.index ?? markdown.length;
    return {
      rawDate: match[1],
      content: trimSeparators(markdown.slice(contentStart, contentEnd)),
    };
  });
}

function topicFromGcores(content) {
  const lines = content
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
  const last = lines[lines.length - 1];

  if (last?.startsWith("- ")) {
    return last.slice(2).trim();
  }

  return "";
}

async function resetDir(dir) {
  await fs.rm(dir, { recursive: true, force: true });
  await fs.mkdir(dir, { recursive: true });
}

async function writeFile(file, body) {
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, body.endsWith("\n") ? body : `${body}\n`, "utf8");
}

async function splitDiaryYear(year, title, tags) {
  const source = await fs.readFile(path.join(sourceDir, `diary-${year}.md`), "utf8");
  const body = stripMonthHeadings(stripFrontMatter(source));
  const entries = extractEntries(body, /^###\s+(\d{4}-\d{2}-\d{2})\s*$/gm);
  const outDir = path.join(contentDir, "diary", String(year));

  await resetDir(outDir);
  await writeFile(
    path.join(outDir, "_index.md"),
    `${sectionFrontMatter({
      title,
      template: "daily-archive.html",
      pageTemplate: "daily-entry.html",
      paginateBy: year === 2026 ? 6 : 10,
      extra: {
        daily_source: "diary",
        daily_source_label: "工作日志",
        daily_archive_label: title,
        daily_archive_kind: "year",
        daily_index_key: `diary-${year}`,
      },
    })}> 按天翻看 ${year} 年的工作日志。`
  );

  const indexEntries = [];

  for (const entry of entries) {
    const date = normalizeDate(entry.rawDate);
    const urlPath = `/diary/${year}/${date}/`;
    indexEntries.push({
      title: date,
      path: urlPath,
      date,
      source: "工作日志",
    });

    await writeFile(
      path.join(outDir, `${date}.md`),
      `${frontMatter({
        title: date,
        date,
        slug: date,
        taxonomies: { tags },
        extra: {
          daily_source: "diary",
          daily_source_label: "工作日志",
          daily_archive_label: title,
          daily_archive_path: `@/diary/${year}/_index.md`,
          daily_entry_key: date,
        },
      })}${entry.content}`
    );
  }

  indexEntries.sort((a, b) => b.date.localeCompare(a.date));
  return indexEntries;
}

async function splitGcores() {
  const source = await fs.readFile(path.join(sourceDir, "gcores-talks.md"), "utf8");
  const body = stripFrontMatter(source);
  const entries = extractEntries(body, /^##\s+(\d{4}-\d{1,2}-\d{1,2})\s*$/gm).map((entry) => ({
    ...entry,
    date: normalizeDate(entry.rawDate),
  }));
  const counts = entries.reduce((memo, entry) => {
    memo.set(entry.date, (memo.get(entry.date) ?? 0) + 1);
    return memo;
  }, new Map());
  const seen = new Map();
  const outDir = path.join(contentDir, "gcores-talks");

  await resetDir(outDir);
  await writeFile(
    path.join(outDir, "_index.md"),
    `${sectionFrontMatter({
      title: "0xc1 的机组日志",
      template: "daily-archive.html",
      pageTemplate: "daily-entry.html",
      paginateBy: 8,
      extra: {
        daily_source: "gcores",
        daily_source_label: "机组",
        daily_archive_label: "0xc1 的机组日志",
        daily_archive_kind: "source",
        daily_index_key: "gcores",
        source_url: "https://www.gcores.com/users/464460/talks",
      },
    })}原始链接：[Thrimbda 的机组](https://www.gcores.com/users/464460/talks)`
  );

  const indexEntries = [];

  for (const entry of entries) {
    const sequence = (seen.get(entry.date) ?? 0) + 1;
    seen.set(entry.date, sequence);
    const duplicateCount = counts.get(entry.date) ?? 1;
    const slug = duplicateCount > 1 ? `${entry.date}-${pad(sequence)}` : entry.date;
    const title = duplicateCount > 1 ? `${entry.date} #${sequence}` : entry.date;
    const topic = topicFromGcores(entry.content);
    indexEntries.push({
      title,
      path: `/gcores-talks/${slug}/`,
      date: entry.date,
      source: "机组",
      topic,
      sequence,
    });

    await writeFile(
      path.join(outDir, `${slug}.md`),
      `${frontMatter({
        title,
        date: entry.date,
        slug,
        extra: {
          daily_source: "gcores",
          daily_source_label: "机组",
          daily_archive_label: "0xc1 的机组日志",
          daily_archive_path: "@/gcores-talks/_index.md",
          daily_entry_key: slug,
          source_url: "https://www.gcores.com/users/464460/talks",
          sequence,
          duplicate_count: duplicateCount,
          topic,
        },
      })}${entry.content}`
    );
  }

  indexEntries.sort((a, b) => {
    const dateOrder = b.date.localeCompare(a.date);
    if (dateOrder !== 0) {
      return dateOrder;
    }
    return a.sequence - b.sequence;
  });
  return indexEntries;
}

async function writeDailyIndex(data) {
  await writeFile(path.join(dataDir, "daily-index.json"), JSON.stringify(data, null, 2));
}

function anchorFromPath(urlPath) {
  return String(urlPath).split("/").filter(Boolean).pop() ?? "";
}

function buildDailyToc(entries, { groupBy }) {
  const dateCounts = entries.reduce((memo, entry) => {
    memo.set(entry.date, (memo.get(entry.date) ?? 0) + 1);
    return memo;
  }, new Map());
  const groups = [];
  const groupMap = new Map();

  entries.forEach((entry) => {
    const groupLabel = groupBy === "year" ? entry.date.slice(0, 4) : entry.date.slice(0, 7);
    const dateLabel = groupBy === "year" ? entry.date : entry.date.slice(5);
    const duplicateCount = dateCounts.get(entry.date) ?? 1;

    if (!groupMap.has(groupLabel)) {
      const group = { label: groupLabel, dates: [] };
      groups.push(group);
      groupMap.set(groupLabel, { group, dateMap: new Map() });
    }

    const groupRecord = groupMap.get(groupLabel);
    if (!groupRecord.dateMap.has(entry.date)) {
      const dateGroup = {
        label: dateLabel,
        date: entry.date,
        duplicate_count: duplicateCount,
        entries: [],
      };
      groupRecord.group.dates.push(dateGroup);
      groupRecord.dateMap.set(entry.date, dateGroup);
    }

    groupRecord.dateMap.get(entry.date).entries.push({
      path: entry.path,
      anchor: anchorFromPath(entry.path),
      title: entry.title,
      topic: entry.topic ?? "",
      sequence_label: duplicateCount > 1 ? pad(entry.sequence ?? 1) : "",
    });
  });

  return groups;
}

async function writeDailyToc(data) {
  await writeFile(
    path.join(dataDir, "daily-toc.json"),
    JSON.stringify({
      "diary-2020": buildDailyToc(data["diary-2020"], { groupBy: "month" }),
      "diary-2026": buildDailyToc(data["diary-2026"], { groupBy: "month" }),
      gcores: buildDailyToc(data.gcores, { groupBy: "year" }),
    }, null, 2)
  );
}

async function writeDiaryIndex() {
  await writeFile(
    path.join(contentDir, "diary", "_index.md"),
    `+++
title = "日志归档"
template = "daily-home.html"
sort_by = "date"
+++

> 按时间翻看这些阶段性的工作与生活记录。`
  );
}

async function writeCompatibilityPage(year) {
  await writeFile(
    path.join(contentDir, "diary", `diary-${year}.md`),
    `${frontMatter({
      title: `${year} 工作日志`,
      date: `${year}-01-01`,
      template: "daily-redirect.html",
      extra: {
        target_path: `@/diary/${year}/_index.md`,
        target_label: `打开 ${year} 每日归档`,
      },
    })}${year} 工作日志已经拆成每日文档。`
  );
}

const diary2020 = await splitDiaryYear(2020, "2020 工作日志", ["工作日志", "月度总结", "技术"]);
const diary2026 = await splitDiaryYear(2026, "2026 工作日志", ["工作日志"]);
const gcores = await splitGcores();
const dailyIndex = {
  "diary-2020": diary2020,
  "diary-2026": diary2026,
  gcores,
};
await writeDiaryIndex();
await writeCompatibilityPage(2020);
await writeCompatibilityPage(2026);
await writeDailyIndex(dailyIndex);
await writeDailyToc(dailyIndex);

console.log(`Generated ${diary2020.length} diary-2020 entries`);
console.log(`Generated ${diary2026.length} diary-2026 entries`);
console.log(`Generated ${gcores.length} gcores entries`);
