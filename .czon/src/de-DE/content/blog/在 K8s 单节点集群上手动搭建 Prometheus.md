---
"title": "Manuelle Einrichtung von Prometheus auf einem K8s-Einzelknoten-Cluster"
"summary": "Dieser Artikel ist ein technisches Tutorial, das Leser anleitet, das Prometheus-Monitoringsystem manuell auf einem Kubernetes-Einzelknoten-Cluster bereitzustellen, ohne auf schnelle Tools wie Helm-Charts oder den Prometheus Operator zurückzugreifen. Der Artikel führt zunächst durch einen Proof of Concept auf Bare-Metal, um den grundlegenden Betrieb und die Konfiguration von Prometheus vorzustellen. Anschließend werden die erforderlichen Ressourcen für die Bereitstellung in einer K8s-Umgebung detailliert erläutert, darunter Namespace, DaemonSet, ConfigMap, ServiceAccount, ClusterRole usw. Der Kern des Artikels erklärt, wie der Service Discovery von Prometheus (insbesondere `kubernetes_sd_config`) und Relabeling (`relabel_config`) konfiguriert werden, um mehrere Ziele wie Prometheus selbst, Node Exporter, Kubelet, cAdvisor und den API Server zu überwachen. Der Artikel betont auch die Bedeutung der RBAC-Berechtigungskonfiguration und bietet konkrete YAML-Konfigurationsbeispiele. Abschließend teilt der Autor eine Sammlung von Ressourcendeklarationen aus der Praxis, um Lesern bei der Bereitstellung zu helfen."
"tags":
  - "Observability"
  - "Prometheus"
  - "Kubernetes"
  - "Monitoring"
  - "Technisches Tutorial"
  - "Service Discovery"
  - "RBAC"
"date": "2020-11-05"
---

> Die Zielgruppe dieses Artikels sind Personen, die gerade erst mit Monitoringsystemen in Berührung kommen und wenig über Prometheus wissen (so wie der Autor zum Zeitpunkt der Verfassung dieses Artikels).
>
>
>
> Die für die Einrichtung von Prometheus in diesem Artikel verwendete Umgebung:
>
> - K8s-Version: 1.19.3
> - Prometheus-Version: 2.22.0
> - Betriebssystem: Archlinux, Stand 2020.11
> - Hosts konfiguriert, Domainname der Devbox ist `devbox`
>
> ⚠️ Bitte beachten: Die in diesem Artikel aufgeführten Befehlszeilenparameter müssen an die aktuelle Umgebung angepasst werden (z.B. Version des Prometheus-Binärpakets usw.).
>
>
>
> Hier sind einige empfohlene Lektüren im Vorfeld aufgelistet:
>
> 1. [Observability: Konzepte und Best Practices](https://github.com/lichuan0620/k8s-sre-learning-notes/blob/master/observability/OBSV-101.md) – stellt verschiedene Grundkonzepte der Observability vor.
> 2. [Erste Schritte mit Prometheus](https://github.com/lichuan0620/k8s-sre-learning-notes/blob/master/prometheus/PROM-101.md) – stellt das Prometheus-Projekt vor.
> 3. [Die offizielle Einführung auf der Prometheus-Website](https://prometheus.io/docs/introduction/overview/)

## Zielsetzung

Da wir Prometheus manuell auf K8s einrichten, legen wir hier zwei Konventionen fest:

1.  Wir verzichten bewusst auf schnelle Bereitstellungsmethoden wie Helm-Charts oder den Prometheus Operator. Hier einige Referenzen:
    1.  Der von der Prometheus-Community gepflegte [Helm-Chart](https://github.com/prometheus-community/helm-charts)
    2.  [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator)
    3.  [Kube-Prometheus](https://github.com/prometheus-operator/kube-prometheus)
2.  Die Bereitstellung von Prometheus auf K8s bedeutet, dass K8s für die Verwaltung des Prometheus-Dienstes verantwortlich ist. Im Gegensatz zum oben genannten Prometheus Operator werden wir hier die relevanten YAML-Konfigurationsdateien selbst schreiben.
3.  Folgende Überwachungsziele werden aufgelistet:
    1.  Prometheus
    2.  Node Exporter
    3.  Kubelet
    4.  cAdvisor
    5.  API Server

Dann legen wir los!

<!--more-->

## Proof of Concept: Prometheus auf Bare-Metal ausführen

Der erste Instinkt ist ein Proof of Concept auf Bare-Metal. Zuerst bringen wir es zum Laufen und experimentieren dann mit weiterer Konfiguration. Letztendlich, wenn wir die verschiedenen Konfigurationsoptionen von Prometheus verstanden haben, sollte die erneute Bereitstellung auf K8s ein Kinderspiel sein.

> Ich wollte versuchen, faul zu sein. Nach der Suche nach Tutorial-Blogs stellte ich fest, dass diese unklar und größtenteils veraltet waren. Das Ergebnis war, dass ich einen halben Tag verschwendete und dann brav die Dokumentation auf der offiziellen Website lesen musste.

### Prometheus installieren

Gemäß der [Dokumentation](https://prometheus.io/docs/prometheus/2.22/getting_started/) laden Sie einfach das entsprechende vorkompilierte Binärpaket von [hier](https://prometheus.io/download/) herunter:

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

Ein Blick ins Verzeichnis zeigt, dass eine Konfigurationsdatei `prometheus.yml` enthalten ist:

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

Jetzt starten wir den gerade heruntergeladenen Prometheus, um sich selbst zu überwachen, und erhalten eine kleine, befriedigende Feedback-Schleife:

```bash
./prometheus --config.file=prometheus.yml
```

Sie können sehen, dass Prometheus jetzt gestartet ist. Rufen Sie http://devbox:9090 auf, um seine Benutzeroberfläche zu sehen. Klicken Sie sich durch, um ein allgemeines Gefühl für die von Prometheus bereitgestellten Funktionen zu bekommen und das Verhalten von Prometheus im Normalbetrieb kennenzulernen.

### Node Exporter ausführen

Jetzt führen wir einen Node Exporter auf Bare-Metal aus, um verschiedene Metriken des lokalen Rechners zu beobachten.

```bash
curl -LO "https://github.com/prometheus/node_exporter/releases/download/v1.0.1/node_exporter-1.0.1.linux-amd64.tar.gz"
tar -zxvf node_exporter-1.0.1.linux-amd64.tar.gz
cd node_exporter-1.0.1.linux-amd64
./node_exporter
```

Als nächstes passen wir die Konfiguration an, damit Prometheus Metriken daraus sammelt.

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

Öffnen Sie die Prometheus-Web-UI und beobachten Sie, dass ein neues Target namens `node-exporter` hinzugefügt wurde. Sehen Sie sich die Arbeitslast an (es läuft ein Programm, das alle Kerne mit der ewigen Berechnung der Fibonacci-Folge auslastet, [hier](https://github.com/Thrimbda/fiber)):

![img](https://0xc1.space/images/2020/11/05/node-load.png)

Damit ist die Proof-of-Concept-Phase erfolgreich abgeschlossen.

> Hinweis: Als Proof of Concept wird hier nicht empfohlen, den auf Bare-Metal bereitgestellten Prometheus direkt zur Überwachung des K8s-Clusters zu verwenden. Der Grund dafür ist, dass der Zugriff auf K8s-Komponenten von außerhalb des Clusters die Konfiguration von Zertifikaten und einen entsprechend berechtigten [ClusterRole](https://kubernetes.io/zh/docs/reference/access-authn-authz/rbac/) erfordert (hier werden die verschiedenen Fallstricke weggelassen, die der Autor erlebt hat, als er versuchte, einen auf Bare-Metal bereitgestellten Prometheus zur Überwachung des K8s-Clusters und seiner Komponenten zu verwenden).

## Überwachung eines K8s-Clusters mit Prometheus

Als nächstes wollen wir unseren K8s-Cluster mit Prometheus überwachen.

### Konfigurationsoptionen von Prometheus

Aus der Einführung in Prometheus geht hervor, dass Prometheus hauptsächlich auf Pull-basierter Datenerfassung basiert. Daher ist Service Discovery erforderlich, d.h. Prometheus muss wissen, woher es Daten abrufen kann, damit Benutzer sie einsehen können.

Die erste zu lösende Frage ist also: **Service Discovery für den K8s-Cluster** – das Geheimnis muss in der Konfiguration verborgen sein.

In der [Dokumentation](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/) finden Sie eine detaillierte Beschreibung der Prometheus-Konfiguration.

Einige dieser Konfigurationselemente werden kurz beschrieben (sie sind nicht unbedingt orthogonal zueinander):

- [`<global>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#configuration-file): Die darin enthaltenen Konfigurationen wirken sich auf alle anderen Konfigurationselemente aus und dienen als Standardwerte für Elemente in anderen Konfigurationen.
- [`<scrape_config>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#scrape_config): Definiert einen Überwachungsjob und beschreibt, woher und wie Prometheus dieses Ziel überwachen soll.
- [`<tls_config>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#tls_config): Beschreibt die TLS-Konfiguration.
- [`<*_sd_config>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#kubernetes_sd_config): Prometheus bietet mit dieser Reihe von Konfigurationselementen die Konfiguration für die Service Discovery einer Reihe vordefinierter Überwachungsziele (sd steht für Service Discovery).
- [`<static_config>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#static_config): Für Überwachungsziele, die nicht von Prometheus vordefiniert sind (z.B. beliebige manuell auf Bare-Metal bereitgestellte Dienste), kann dieses Konfigurationselement für die Service Discovery verwendet werden. Im Proof of Concept oben haben wir dieses Konfigurationselement verwendet.
- [`<relabel_config>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#relabel_config): Bevor mit dem Abrufen der Metriken der Überwachungsziele begonnen wird, können mit diesem Konfigurationselement einige Labels geändert werden. Prometheus bietet einige vordefinierte Label-Regeln. Relabeling kann in mehreren Schritten erfolgen. Nach Abschluss des Relabelings werden Labels mit dem Präfix `__` gelöscht.

Es scheint, dass das Kernelement der Prometheus-Konfiguration `<scrape_config>` ist. Jedes definiert einen Überwachungsjob, ähnlich einem Namespace, und bietet hauptsächlich eine Aggregation von Überwachungszielen. Darin teilen wir Prometheus durch die Definition von `<*_sd_config>` oder `<static_config>` mit, von welchen Endpunkten genau Daten abgerufen werden sollen und wie diese Endpunkte gefiltert werden.

Lassen Sie uns das Verständnis dieser Konfigurationselemente durch praktische Übungen vertiefen!

### Bereitstellung von Prometheus

Die Kernarbeit bei der Bereitstellung besteht darin, klar zu überlegen, welche Ressourcen für die Bereitstellung von Prometheus im Cluster benötigt werden. Der Autor verrät die Antwort direkt hier:

1.  Einen dedizierten Namespace
2.  Ein DaemonSet zur Verwaltung von node-exporter
3.  Einen Node-exporter Service
4.  Verwaltung der Prometheus-Konfiguration mit einer ConfigMap
5.  Ein dedizierter ServiceAccount für Prometheus
6.  Eine ClusterRole mit ausreichenden Berechtigungen
7.  Ein ClusterRoleBinding, das den ServiceAccount und die ClusterRole verbindet
8.  Ein Prometheus Deployment
9.  Ein Prometheus Service

In einem K8s-Cluster mit aktiviertem RBAC müssen wir für Prometheus eine Rolle mit ausreichenden Berechtigungen definieren, die den Clusterstatus und verschiedene Metriken lesen kann. Daher sind die Punkte 5-7 erforderlich.

Hier ist eine [Sammlung von Ressourcendeklarationen](https://github.com/Thrimbda/prometheus-set-up), die der Autor während seines eigenen Einrichtungsprozesses gesammelt hat. Neben den oben genannten Ressourcen enthält sie auch kube-state-metrics. Wenn Sie in der angegebenen Reihenfolge vorgehen, erhalten Sie einen bereitgestellten Prometheus.

#### Node Exporter

Für den Node Exporter, der den Rechner selbst überwacht, ist die Anforderung einer pro Node. Da wir gleichzeitig die Lebenszyklusverwaltung von K8s nutzen möchten, ist DaemonSet die beste Wahl.

Da es in einem Container läuft, kann es ohne Konfiguration keine echten Node-Metriken sammeln. Daher müssen spezielle Orte des Hosts im Container gemountet werden, damit der Node Exporter Metriken sammeln kann.

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

Dann wird über einen Service ein Endpunkt verfügbar gemacht, auf den Prometheus dauerhaft zugreifen kann.

#### Prometheus

Prometheus wird mit einem Deployment bereitgestellt. Vor der Bereitstellung von Prometheus muss es mit ausreichenden Berechtigungen konfiguriert werden, damit es auf die notwendigen Endpunkte zugreifen kann, um Metriken zu sammeln. In einem K8s-Cluster mit konfiguriertem RBAC wird dies über ClusterRole/ServiceAccount/ClusterRoleBinding erreicht. Nach Abschluss der Konfiguration authentifiziert sich Prometheus über den ServiceAccount, um auf die benötigten Endpunkte zuzugreifen.

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

Bis jetzt haben wir alle Voraussetzungen für die Realisierung unserer Überwachungsziele. Aber wie treiben wir die leistungsstarke Engine Prometheus an, um unsere vorbereitete Umgebung optimal zu nutzen und die Überwachung zu realisieren?

In Kombination mit der vorherigen Einführung in die Prometheus-Konfiguration werden die vier Überwachungsziele mit vier `<scrape_config>`-Definitionen festgelegt:

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

Ein Label ist eine Eigenschaft eines bestimmten Endpunkts. Unterschiedliche Endpunkte können unter demselben Label unterschiedliche Werte haben. Was `<relabel_config>` tut, ist, einige Änderungs- und Filteroperationen an diesen Labels durchzuführen, damit wir die benötigten Endpunkte filtern/modifizieren können.

![img](https://0xc1.space/images/2020/11/05/node-exporter-target.png)

Wie Sie sehen können, gibt es in der obigen Konfiguration drei Relabel-Aktionen. Die erste bedeutet: Aus allen Werten des von der K8s-Service-Discovery **vordefinierten** Labels `__meta_kubernetes_service_name` werden gemäß dem angegebenen regulären Ausdruck "node-exporter" gefiltert. Gemäß der `action` werden die übereinstimmenden Zielendpunkte beibehalten und die restlichen Werte mit demselben Label verworfen. Die beiden folgenden Relabel-Aktionen dienen dazu, die semantischen Labels `node` und `host_ip` durch Umbenennung beizubehalten. (Erinnern Sie sich? Labels, die mit einem doppelten Unterstrich beginnen, werden am Ende gelöscht.)

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

Beachten Sie, dass die Rolle `node` ist. Daher sammelt Prometheus standardmäßig Metriken von `<node_ip>:10250/metrics`. Hier gibt es eine zusätzliche Konfigurationsoption `bearer_token_file`. Da Kubelet standardmäßig keinen anonymen Zugriff auf seine Metrikdaten erlaubt, kommt hier der zuvor konfigurierte ServiceAccount zum Einsatz. Der Einfachheit halber verwenden wir hier `insecure_skip_verify: true`, um die TLS-Authentifizierung zu umgehen.

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

Hier filtern wir mit `<relabel_config>` die Endpunkte des API Servers selbst heraus. Neben der Token-Authentifizierung müssen wir zusätzlich eine CA-Datei zur Identitätsüberprüfung bereitstellen. So können wir auf den API Server zugreifen.

Damit haben wir die Bereitstellung von Prometheus und die Konfiguration der Überwachung für die Zielendpunkte abgeschlossen.

Interessierte Leser können die Konfiguration weiter anpassen, um das Verhalten von Prometheus unter verschiedenen Konfigurationen zu beobachten und ihr Verständnis zu vertiefen. Hier eine kleine Aufgabe: Wie können wir einen K8s-Cluster mit einem auf Bare-Metal bereitgestellten Prometheus überwachen?

## Referenzen

1.  [Prometheus Configuration](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#configuration)
2.  [Kube-prometheus manifests](https://github.com/prometheus-operator/kube-prometheus/tree/8b0eebdd08d8926649d27d2bc23acf31144c2f6b/manifests)
3.  [TSDB v3 design](https://fabxc.org/tsdb/)
4.  [Observability: Konzepte und Best Practices](https://github.com/lichuan0620/k8s-sre-learning-notes/blob/master/observability/OBSV-101.md)
5.  [Erste Schritte mit Prometheus](https://github.com/lichuan0620/k8s-sre-learning-notes/blob/master/prometheus/PROM-101.md)
6.  [RBAC on K8s](https://kubernetes.io/zh/docs/reference/access-authn-authz/rbac/)