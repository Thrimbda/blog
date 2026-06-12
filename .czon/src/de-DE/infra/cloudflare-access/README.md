# Cloudflare Access Terraform Runbook

Dieses Verzeichnis verwaltet ausschließlich die Cloudflare Zero Trust Access-Anwendung und -Richtlinie für den Pfad `/const`. Verwenden Sie es nicht für DNS, Pages, Workers oder andere, nicht zugehörige Cloudflare-Ressourcen.

## 1. Erstellen eines Least-Privilege-Cloudflare-API-Tokens

Öffnen Sie im Cloudflare-Dashboard **My Profile → API Tokens → Create Token → Create Custom Token**.

Empfohlene Token-Form:

- Name: `terraform-const-access` oder ähnlich eng gefasst.
- Kontoumfang: nur das Zielkonto.
- Zonenumfang: nur die Zielzone für den Hostnamen der Site.
- Berechtigungen: ausschließlich Lese- und Schreib-/Bearbeitungsberechtigungen für Access-Apps und -Richtlinien. Die Cloudflare-UI kann dies als `Access: Apps and Policies Read` und `Access: Apps and Policies Write` oder `Edit` bezeichnen.
- Gewähren Sie keinen Global API Key, vollständige Administratorrechte, DNS-Schreibzugriff, Zoneneinstellungen-Schreibzugriff, Workers, Pages oder Zugriff auf alle Konten/Zonen.
- Optionale Härtung: Token-Ablauf und Quell-IP-Einschränkungen, falls sie zur Betriebsumgebung passen.

Kopieren Sie das Token nur einmal und fügen Sie es nur in die unten stehende SOPS-Datei ein. Fügen Sie **keine** Tokens, Konto-IDs, Zonen-IDs, Identitätsregeln, Team-Domänen, Gruppen-IDs oder E-Mails in Chat, Dokumentation, Shell-Verlauf oder unverschlüsselte Dateien ein.

## 2. Füllen Sie die SOPS-Umgebungsdatei aus

Bearbeiten Sie die verschlüsselte Dotenv-Vorlage aus dem Repository-Stammverzeichnis:

```sh
sops secrets/cloudflare-access.enc.env
```

Füllen Sie im SOPS-Editor mindestens diese Variablen aus:

- `CLOUDFLARE_API_TOKEN`
- `TF_VAR_account_id`
- `TF_VAR_zone_id`
- `TF_VAR_site_hostname` — nur Hostname, ohne Schema und ohne Pfad.
- `TF_VAR_access_policy_include` — Syntax für Access-Einschlussregeln des Providers v5, zum Beispiel `[{"email":{"email":"REPLACE_WITH_EMAIL"}}]` mit Ihrem privaten E-Mail-Wert.

Behalten Sie `TF_VAR_const_path=const` bei, es sei denn, eine separat geprüfte Änderung verschiebt den geschützten Pfad absichtlich.

Überprüfen Sie, ob die Datei ohne Ausgabe von Werten entschlüsselt werden kann:

```sh
sops -d secrets/cloudflare-access.enc.env >/dev/null
```

## 3. Führen Sie Terraform über `sops exec-env` aus

Führen Sie Terraform aus dem Repository-Stammverzeichnis aus, wobei Secrets nur in den Kindprozess eingeschleust werden:

Falls `terraform` nicht bereits im `PATH` ist, starten Sie zuerst `nix-shell`; `shell.nix` enthält Terraform für diesen Workflow.

```sh
terraform -chdir=infra/cloudflare-access fmt -check
sops exec-env secrets/cloudflare-access.enc.env 'terraform -chdir=infra/cloudflare-access init'
sops exec-env secrets/cloudflare-access.enc.env 'terraform -chdir=infra/cloudflare-access validate'
sops exec-env secrets/cloudflare-access.enc.env 'terraform -chdir=infra/cloudflare-access plan'
```

Überprüfen Sie den Plan vor dem Apply. Er darf nur folgende Ressourcen berühren:

- `cloudflare_zero_trust_access_policy.const`
- `cloudflare_zero_trust_access_application.const`

Die Zielabdeckung muss der Ziel-Hostname plus genau folgende Pfade sein:

- `/const`
- `/const/`
- `/const/*`

Fahren Sie nicht fort, wenn der Plan DNS, Pages, Workers, Schutz der gesamten Domain, nicht zugehörige Ressourcen oder unerwartete Identitätsregeln enthält.

Erst wenn der Plan akzeptabel ist und der Betreiber/Nutzer die Apply-Freigabe ausdrücklich erteilt:

```sh
sops exec-env secrets/cloudflare-access.enc.env 'terraform -chdir=infra/cloudflare-access apply'
```

Führen Sie `terraform destroy` nur dann aus, wenn es ausdrücklich als separater destruktiver Rollback angefordert wurde.

## 4. Umgang mit verschlüsseltem lokalen Zustand

Dieser Stack verwendet absichtlich einen lokalen Terraform-Zustand, aber die dauerhaft verfolgte Kopie ist mit SOPS verschlüsselt:

```text
secrets/cloudflare-access.tfstate.enc.json
```

Stellen Sie vor plan/apply den Zustand wieder her, falls bereits ein verschlüsselter Zustand existiert:

```sh
if [ -f secrets/cloudflare-access.tfstate.enc.json ]; then
  sops -d --input-type json --output-type json \
    --output infra/cloudflare-access/terraform.tfstate \
    secrets/cloudflare-access.tfstate.enc.json
  chmod 600 infra/cloudflare-access/terraform.tfstate
fi
```

Verschlüsseln Sie nach einem erfolgreichen apply den resultierenden Zustand über eine temporäre Datei, überprüfen Sie diese und verschieben Sie sie dann an ihren Platz:

```sh
tmp_state="$(mktemp /tmp/cloudflare-access.tfstate.enc.json.XXXXXX)"
sops --encrypt --input-type json --output-type json \
  --filename-override secrets/cloudflare-access.tfstate.enc.json \
  --output "$tmp_state" \
  infra/cloudflare-access/terraform.tfstate
sops -d --input-type json --output-type json "$tmp_state" >/dev/null
mv "$tmp_state" secrets/cloudflare-access.tfstate.enc.json
rm -f infra/cloudflare-access/terraform.tfstate \
      infra/cloudflare-access/terraform.tfstate.backup
```

Committen Sie niemals unverschlüsselte `terraform.tfstate`, Zustands-Backups, Plan-Dateien, `terraform.tfvars`, `*.auto.tfvars` oder unverschlüsselte env-Dateien. Die `.gitignore`-Allow-Liste enthält nur die oben genannte verschlüsselte Zustandsdatei.

## 5. Apply-Freigabe

Das Anwenden ist nur erlaubt, wenn alle folgenden Bedingungen erfüllt sind:

1. Die SOPS-Umgebungsdatei ist lokal ausgefüllt und lässt sich erfolgreich entschlüsseln, ohne Werte auszugeben.
2. Erforderliche Umgebungsvariablen sind über `sops exec-env` verfügbar.
3. `terraform fmt`, `init`, `validate` und `plan` sind erfolgreich.
4. Der Plan beschränkt sich auf die beabsichtigte Access-Anwendung/-Richtlinie und die `/const`-Pfadabdeckung.
5. Der Betreiber/Nutzer akzeptiert den überprüften Plan ausdrücklich.

Wenn eine Freigabe fehlschlägt, halten Sie an und beheben Sie das spezifische Problem, bevor Sie es erneut versuchen. Erweitern Sie die Cloudflare-Token-Berechtigungen nicht über den fehlenden Umfang für Access-Apps/-Richtlinien hinaus, ohne dies zu überprüfen.