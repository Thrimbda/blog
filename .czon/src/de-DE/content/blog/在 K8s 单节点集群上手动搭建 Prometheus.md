---
"title": "Manueller Aufbau von Prometheus auf einem K8s-Einzelknoten-Cluster"
"summary": "Dieser Artikel ist eine detaillierte Anleitung zum manuellen Aufbau eines Prometheus-Monitoring-Systems auf einem Kubernetes-Einzelknoten-Cluster. Zunächst wird ein Proof of Concept in einer Bare-Metal-Umgebung durchgeführt, bei dem Prometheus und Node Exporter ausgeführt werden, um die Grundkonfiguration zu verstehen. Der Schwerpunkt liegt dann auf der Bereitstellung innerhalb des K8s-Clusters. Es werden die erforderlichen K8s-Ressourcen (wie Namespace, DaemonSet, ConfigMap, ServiceAccount, ClusterRole usw.) detailliert beschrieben und erläutert, wie die Service Discovery von Prometheus (insbesondere kubernetes_sd_config) und Relabeling (relabel_config) konfiguriert werden, um mehrere Ziele zu überwachen, darunter Prometheus selbst, Node Exporter, Kubelet, cAdvisor und den API Server. Der Artikel betont die manuelle Konfiguration (anstelle der Verwendung von Helm oder Operator), um ein tiefes Verständnis der Funktionsweise von Prometheus zu erlangen, und enthält Konfigurationsbeispiele und Berechtigungseinstellungen. Abschließend fasst der Artikel die Bereitstellungsschritte zusammen und stellt eine Denkaufgabe, wie ein Bare-Metal-Prometheus einen K8s-Cluster überwachen kann."
"tags":
  - "Observability"
  - "Prometheus"
  - "Kubernetes"
  - "Monitoring"
  - "Service Discovery"
  - "Node Exporter"
  - "cAdvisor"
  - "Kubelet"
"date": "05.11.2020"
---

> Die Zielgruppe dieses Artikels sind Personen, die gerade erst mit Monitoringsystemen in Berührung kommen, sowie die benachteiligte Gruppe, die wenig über Prometheus weiß (so wie der Autor zum Zeitpunkt der Abfassung dieses Artikels).
>
>
>
> Die in diesem Artikel verwendete Umgebung für den Aufbau von Prometheus:
>
> - K8s-Version: 1.19.3
> - Prometheus-Version: 2.22.0
> - Betriebssystem: Archlinux, Stand 2020.11
> - Hosts konfiguriert, Domainname von Devbox ist devbox
>
> ⚠️ Bitte beachten Sie: Die in diesem Artikel aufgeführten Befehlszeilenparameter müssen je nach aktueller Umgebung leicht angepasst werden (z.B. Version des Prometheus-Binärpakets usw.).
>
>
>
> Hier sind einige empfohlene Lektüren im Vorfeld aufgeführt:
>
> 1. [Observability: Konzepte und Best Practices](https://github.com/lichuan0620/k8s-sre-learning-notes/blob/master/observability/OBSV-101.md) – stellt verschiedene Grundkonzepte der Observability vor.
> 2. [Erste Schritte mit Prometheus](https://github.com/lichuan0620/k8s-sre-learning-notes/blob/master/prometheus/PROM-101.md) – stellt das Prometheus-Projekt vor.
> 3. [Die offizielle Einführung von Prometheus](https://prometheus.io/docs/introduction/overview/)

## Ziel

Da es um den manuellen Aufbau von Prometheus auf K8s geht, legen wir hier zwei Konventionen fest:

1.  Wir verzichten bewusst auf schnelle Bereitstellungsmethoden wie Helm-Charts oder den Prometheus Operator. Hier einige Referenzen:
    1.  Der von der Prometheus-Community gepflegte [Helm chart](https://github.com/prometheus-community/helm-charts)
    2.  [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator)
    3.  [Kube-Prometheus](https://github.com/prometheus-operator/kube-prometheus)
2.  Prometheus wird auf K8s aufgebaut, d.h. K8s verwaltet den Prometheus-Dienst. Im Gegensatz zum oben genannten Prometheus Operator werden wir hier die relevanten YAML-Konfigurationsdateien selbst schreiben.
3.  Folgende Monitoring-Ziele werden aufgelistet:
    1.  Prometheus
    2.  Node Exporter
    3.  Kubelet
    4.  cAdvisor
    5.  API Server

Los geht's!

<!--more-->

## Proof of Concept: Prometheus auf Bare Metal ausführen

Der erste Gedanke ist ein Proof of Concept auf Bare Metal. Zuerst lassen wir es laufen und experimentieren dann mit weiterer Konfiguration. Letztendlich sollte die erneute Bereitstellung auf K8s ein Kinderspiel sein, sobald wir die verschiedenen Konfigurationsoptionen von Prometheus verstanden haben.

> Ich wollte versuchen, faul zu sein. Nach der Suche nach Tutorial-Blogs stellte ich fest, dass diese unklar und größtenteils veraltet waren. Letztendlich habe ich einen halben Tag verschwendet und musste brav die Dokumentation auf der offiziellen Website lesen.

### Prometheus installieren

Gemäß der [Dokumentation](https://prometheus.io/docs/prometheus/2.22/getting_started/) laden Sie das entsprechende vorkompilierte Binärpaket direkt [hier](https://prometheus.io/download/) herunter:

```bash
curl -LO "https://github.com/prometheus/prometheus/releases/download/v2.22.0/prometheus-2.22.0.linux-amd64.tar.gz"
tar -zxvf prometheus-2.22.0.linux-amd64.tar.gz
cd prometheus-2.22.0.linux-amd64
./prometheus --version
# Erwartete Ausgabe sollte so aussehen:
# prometheus, version 2.22.0 (branch: HEAD, revision: 0a7fdd3b76960808c3a91d92267c3d815c1bc354)
#  build user:    root@6321101b2c50
#  build date:    20201015-12:29:59
#  go version:    go1.15.3
#  platform:     linux/amd64
```

Ein Blick ins Verzeichnis zeigt eine mitgelieferte Konfigurationsdatei `prometheus.yml`:

```yaml
# my global config
global:
  scrape_interval:     15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
  # scrape_timeout is set to the global default (10s).

# Alertmanager configuration
alerting:
  alertmanagers:
  - static_configs:
    - targets:
      # - alertmanager:9093

# Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
rule_files:
  # - "first_rules.yml"
  # - "second_rules.yml"

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: 'prometheus'
    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.
    static_configs:
    - targets: ['localhost:9090']
```

Jetzt starten wir den gerade heruntergeladenen Prometheus, um sich selbst zu überwachen, und erhalten eine kleine positive Rückmeldung:

```bash
./prometheus --config.file=prometheus.yml
```

Sie können sehen, dass Prometheus jetzt gestartet ist. Rufen Sie http://devbox:9090 auf, um seine Benutzeroberfläche zu sehen. Klicken Sie sich durch, um einen allgemeinen Eindruck von den Funktionen zu bekommen und zu verstehen, wie sich Prometheus im normalen Betrieb verhält.

### Node Exporter ausführen

Jetzt führen wir einen Node Exporter auf Bare Metal aus, um verschiedene Metriken der lokalen Maschine zu beobachten.

```bash
curl -LO "https://github.com/prometheus/node_exporter/releases/download/v1.0.1/node_exporter-1.0.1.linux-amd64.tar.gz"
tar -zxvf node_exporter-1.0.1.linux-amd64.tar.gz
cd node_exporter-1.0.1.linux-amd64
./node_exporter
```

Als nächstes ändern wir die Konfiguration, damit Prometheus Metriken daraus sammelt.

```yaml
# my global config
global:
  scrape_interval:     15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
  # scrape_timeout is set to the global default (10s).

# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: 'prometheus'
    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.
    static_configs:
    - targets: ['localhost:9090']

  - job_name: 'node-exporter'
    static_configs:
    - targets: ['localhost:9100']
```

Öffnen Sie die Prometheus-Web-Oberfläche und beobachten Sie, dass ein neues Target namens `node-exporter` hinzugefügt wurde. Sehen Sie sich die Auslastung an (es läuft ein [Programm](https://github.com/Thrimbda/fiber), das die Fibonacci-Folge für immer berechnet und alle Kerne auslastet):

![img](https://0xc1.space/images/2020/11/05/node-load.png)

Damit ist die Proof-of-Concept-Phase erfolgreich abgeschlossen.

> Hinweis: Als Proof of Concept wird hier **nicht** empfohlen, einen Bare-Metal-Prometheus direkt zur Überwachung eines K8s-Clusters zu verwenden. Der Grund ist, dass der Zugriff auf K8s-Komponenten von außerhalb des Clusters die Konfiguration von Zertifikaten und einen [ClusterRole](https://kubernetes.io/zh/docs/reference/access-authn-authz/rbac/) mit entsprechenden Zugriffsberechtigungen erfordert (hier werden die verschiedenen Fallstricke weggelassen, die der Autor erlebt hat, als er versuchte, einen Bare-Metal-Prometheus zur Überwachung des K8s-Clusters und seiner Komponenten zu verwenden).

## Überwachung eines K8s-Clusters mit Prometheus

Als nächstes möchten wir unseren K8s-Cluster mit Prometheus überwachen.

### Prometheus-Konfigurationsoptionen

Aus der Einführung in Prometheus geht hervor, dass Prometheus hauptsächlich auf Pull-basierter Datenerfassung basiert. Daher ist Service Discovery erforderlich, d.h. Prometheus muss wissen, woher es Daten abrufen kann, damit Benutzer sie einsehen können.

Die erste zu lösende Frage ist also: **Service Discovery für den K8s-Cluster** – das Geheimnis muss in der Konfiguration verborgen sein.

Die [Dokumentation](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/) enthält eine detaillierte Beschreibung der Prometheus-Konfiguration.

Einige dieser Konfigurationselemente werden kurz beschrieben (sie sind nicht unbedingt orthogonal zueinander):

- [`<global>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#configuration-file): Die darin enthaltenen Konfigurationen wirken sich auf alle anderen Konfigurationselemente aus und dienen als Standardwerte für Elemente in anderen Konfigurationen.
- [`<scrape_config>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#scrape_config): Definiert einen Scraping-Job und beschreibt, woher und wie Prometheus dieses Ziel überwachen soll.
- [`<tls_config>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#tls_config): Beschreibt die TLS-Konfiguration.
- [`<*_sd_config>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#kubernetes_sd_config): Prometheus bietet mit dieser Reihe von Konfigurationselementen vordefinierte Konfigurationen für die Service Discovery einer Reihe von Monitoring-Zielen (sd steht für Service Discovery).
- [`<static_config>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#static_config): Für Monitoring-Ziele, die nicht von Prometheus vordefiniert sind (z.B. beliebige manuell auf Bare Metal bereitgestellte Dienste), kann dieses Konfigurationselement für die Service Discovery verwendet werden. Im Proof of Concept oben haben wir dieses Element verwendet.
- [`<relabel_config>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#relabel_config): Bevor mit dem Abrufen der Metriken der Monitoring-Ziele begonnen wird, können mit diesem Konfigurationselement einige Labels geändert werden. Prometheus bietet einige vordefinierte Label-Regeln. Relabeling kann in mehreren Schritten erfolgen. Nach Abschluss des Relabelings werden Labels mit dem Präfix `__` gelöscht.

Es scheint, dass das Kernkonfigurationselement in Prometheus `<scrape_config>` ist. Jedes definiert einen Scraping-Job, ähnlich einem Namespace, und bietet hauptsächlich eine Gruppierung von Monitoring-Zielen. Darin teilen wir Prometheus durch die Definition von `<*_sd_config>` oder `<static_config>` mit, von welchen Endpunkten genau Daten abgerufen werden sollen und wie diese Endpunkte gefiltert werden sollen.

Lassen Sie uns das Verständnis dieser Konfigurationselemente durch praktische Übungen vertiefen!

### Bereitstellung von Prometheus

Die Kernarbeit bei der Bereitstellung besteht darin, genau zu überlegen, welche Ressourcen für die Bereitstellung von Prometheus im Cluster benötigt werden. Der Autor verrät die Antwort direkt hier:

1.  Einen dedizierten Namespace
2.  Ein DaemonSet zur Verwaltung von node-exporter
3.  Einen Node-exporter Service
4.  Verwaltung der Prometheus-Konfiguration mit einer ConfigMap
5.  Ein dediziertes ServiceAccount für Prometheus
6.  Eine ClusterRole mit ausreichenden Berechtigungen
7.  Ein ClusterRoleBinding, das ServiceAccount und ClusterRole verbindet
8.  Ein Prometheus Deployment
9.  Ein Prometheus Service

In einem K8s-Cluster mit aktiviertem RBAC müssen wir für Prometheus eine Rolle mit ausreichenden Berechtigungen definieren, die den Clusterstatus und verschiedene Metriken lesen kann. Daher sind die Punkte 5-7 erforderlich.

Hier ist eine [Sammlung von Ressourcendeklarationen](https://github.com/Thrimbda/prometheus-set-up), die der Autor während seines eigenen Aufbaus gesammelt hat. Neben den oben genannten Ressourcen enthält sie auch kube-state-metrics. Wenn Sie in der angegebenen Reihenfolge vorgehen, erhalten Sie einen bereitgestellten Prometheus.

#### Node-exporter

Für den Node-exporter, der die Maschine selbst überwacht, ist die Anforderung einer pro Node. Da wir gleichzeitig die Lebenszyklusverwaltung von K8s nutzen möchten, ist DaemonSet die beste Wahl.

Da er in einem Container läuft, kann er ohne Konfiguration keine echten Node-Metriken sammeln. Daher müssen spezielle Orte des Hosts im Container gemountet werden, damit der Node-exporter Metriken sammeln kann.

```yaml
args:
  - '--path.procfs=/host/proc'
  - '--path.sysfs=/host/sys'
  - '--path.rootfs=/host/root'
volumes:
  - hostPath:
      path: /proc
    name: proc
  - hostPath:
      path: /sys
    name: sys
  - hostPath:
      path: /
    name: root
```

Dann wird über einen Service ein Endpunkt verfügbar gemacht, auf den Prometheus langfristig zugreifen kann.

#### Prometheus

Prometheus wird mit einem Deployment bereitgestellt. Vor der Bereitstellung von Prometheus muss ihm ausreichende Berechtigungen erteilt werden, damit es auf die notwendigen Endpunkte zugreifen kann, um Metriken zu sammeln. In einem K8s-Cluster mit konfiguriertem RBAC wird dies über ClusterRole/ServiceAccount/ClusterRoleBinding erreicht. Nach Abschluss der Konfiguration authentifiziert sich Prometheus über den ServiceAccount, um auf die benötigten Endpunkte zuzugreifen.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: prometheus
  labels:
    app.kubernetes.io/name: prometheus
rules:
  - apiGroups: [""]
    resources:
      - nodes
      - nodes/metrics
      - services
      - endpoints
      - pods
    verbs: ["get", "list", "watch"]
  - nonResourceURLs:
      - "/metrics"
      - "/metrics/cadvisor"
    verbs: ["get"]
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: default
  namespace: monitoring-system
  labels:
    app.kubernetes.io/name: prometheus
---
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: prometheus
  labels:
    app.kubernetes.io/name: prometheus
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: prometheus
subjects:
  - kind: ServiceAccount
    name: default
    namespace: monitoring-system
```

Bis jetzt haben wir alle Voraussetzungen für die Erreichung unserer Monitoring-Ziele. Aber wie treiben wir die leistungsstarke Engine Prometheus an, um unsere Umgebung optimal zu nutzen und die Überwachung zu realisieren?

In Kombination mit der vorherigen Einführung in die Prometheus-Konfiguration werden die vier Monitoring-Ziele mit vier `<scrape_config>`-Blöcken definiert:

Für node-exporter:

```yaml
- job_name: 'node-exporter'
  kubernetes_sd_configs:
    - role: endpoints
  relabel_configs:
    - source_labels: [__meta_kubernetes_service_name]
      regex: node-exporter
      action: keep
    - source_labels: [__meta_kubernetes_endpoint_node_name]
      target_label: node
    - source_labels: [__meta_kubernetes_pod_host_ip]
      target_label: host_ip
```

Da es sich um einen Cluster-internen Zugriff handelt, ist keine zusätzliche Authentifizierung erforderlich und auch kein HTTPS-Zugriff nötig.

Hier wird `<relabel_configs>` am Beispiel von node-exporter weiter erklärt:

Ein Label ist eine Eigenschaft eines bestimmten Endpunkts. Unterschiedliche Endpunkte können unter demselben Label unterschiedliche Werte haben. Was `<relabel_config>` tut, ist, Operationen wie Ändern und Filtern auf diesen Labels durchzuführen, damit wir die gewünschten Endpunkte filtern/modifizieren können.

![img](https://0xc1.space/images/2020/11/05/node-exporter-target.png)

Wie Sie sehen können, gibt es in der obigen Konfiguration drei Relabel-Aktionen. Die erste bedeutet: Filtern Sie aus allen Werten des von der K8s-Service-Discovery **vordefinierten** Labels `__meta_kubernetes_service_name` gemäß dem angegebenen regulären Ausdruck "node-exporter". Gemäß der `action` werden die übereinstimmenden Zielendpunkte beibehalten und die restlichen Werte mit demselben Label verworfen. Die beiden folgenden Relabel-Aktionen dienen dazu, die semantischen Labels `node` und `host_ip` durch Umbenennung beizubehalten. (Erinnern Sie sich? Labels, die mit einem doppelten Unterstrich beginnen, werden am Ende gelöscht.)

Für Prometheus selbst:

```yaml
- job_name: 'prometheus'
  kubernetes_sd_configs:
    - role: endpoints
  relabel_configs:
    - source_labels: [__meta_kubernetes_service_name]
      regex: prometheus
      action: keep
```

Verwenden Sie den gleichen Ansatz, um die Endpunkte herauszufiltern.

Für Kubelet und cAdvisor wird die Situation etwas komplexer:

```yaml
- job_name: 'kubelet'
  kubernetes_sd_configs:
    - role: node
  tls_config:
    # ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
    # cert_file: /etc/secret/cert
    # key_file: /etc/secret/key
    insecure_skip_verify: true
  bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
  scheme: https

- job_name: 'cadvisor'
  kubernetes_sd_configs:
    - role: node
  metrics_path: /metrics/cadvisor
  tls_config:
    # ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
    # cert_file: /etc/secret/cert
    # key_file: /etc/secret/key
    insecure_skip_verify: true
  bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
  scheme: https
```

Beachten Sie, dass die Rolle `node` ist. Daher sammelt Prometheus standardmäßig Metriken von `<node_ip>:10250/metrics`. Hier gibt es eine zusätzliche Konfigurationsoption `bearer_token_file`. Da Kubelet standardmäßig keinen anonymen Zugriff auf seine Metrikdaten erlaubt, kommt hier der zuvor konfigurierte ServiceAccount ins Spiel. Der Einfachheit halber verwenden wir `insecure_skip_verify: true`, um die TLS-Überprüfung zu überspringen.

Für den API Server wird es wieder etwas komplexer:

```yaml
scrape_configs:
  - job_name: 'kubernetes-apiservers'
    kubernetes_sd_configs:
      - role: endpoints
    scheme: https
    tls_config:
      ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
    bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token
    relabel_configs:
      - source_labels: [__meta_kubernetes_namespace, __meta_kubernetes_service_name, __meta_kubernetes_endpoint_port_name]
        action: keep
        regex: default;kubernetes;https
```

Hier filtern wir mit `<relabel_config>` die Endpunkte des API Servers selbst heraus. Neben der Token-Authentifizierung müssen wir auch eine CA-Datei zur Identitätsüberprüfung bereitstellen. So können wir auf den API Server zugreifen.

Damit haben wir die Bereitstellung von Prometheus und die Konfiguration der Überwachung der Zielendpunkte abgeschlossen.

Interessierte Leser können die Konfiguration weiter anpassen, um das Verhalten von Prometheus unter verschiedenen Konfigurationen zu beobachten und ihr Verständnis zu vertiefen. Hier eine kleine Aufgabe: Wie können wir einen K8s-Cluster mit einem Bare-Metal-Prometheus überwachen?

## Referenzen

1.  [Prometheus Configuration](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#configuration)
2.  [Kube-prometheus manifests](https://github.com/prometheus-operator/kube-prometheus/tree/8b0eebdd08d8926649d27d2bc23acf31144c2f6b/manifests)
3.  [TSDB v3 design](https://fabxc.org/tsdb/)
4.  [Observability: Konzepte und Best Practices](https://github.com/lichuan0620/k8s-sre-learning-notes/blob/master/observability/OBSV-101.md)
5.  [Erste Schritte mit Prometheus](https://github.com/lichuan0620/k8s-sre-learning-notes/blob/master/observability/OBSV-101.md)
6.  [RBAC on K8s](https://kubernetes.io/zh/docs/reference/access-authn-authz/rbac/)