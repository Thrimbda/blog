---
"title": "Configuración manual de Prometheus en un clúster de un solo nodo de K8s"
"summary": "Este artículo es un tutorial técnico que guía al lector en el despliegue manual del sistema de monitorización Prometheus en un clúster de Kubernetes de un solo nodo, sin depender de herramientas rápidas como Helm Chart o Prometheus Operator. Comienza introduciendo la ejecución y configuración básica de Prometheus a través de una prueba de concepto en máquina física (bare metal), y luego detalla los recursos necesarios para el despliegue en un entorno K8s, incluyendo Namespace, DaemonSet, ConfigMap, ServiceAccount, ClusterRole, etc. La parte central explica cómo configurar el descubrimiento de servicios de Prometheus (especialmente kubernetes_sd_config) y el reetiquetado (relabel_config) para monitorizar múltiples objetivos, como el propio Prometheus, Node Exporter, Kubelet, cAdvisor y API Server. El artículo también enfatiza la importancia de la configuración de permisos RBAC y proporciona ejemplos concretos de configuración YAML. Finalmente, el autor comparte un conjunto de declaraciones de recursos acumuladas durante la práctica, para ayudar al lector a completar el despliegue."
"tags":
  - "Observabilidad"
  - "Prometheus"
  - "Kubernetes"
  - "Monitorización"
  - "Tutorial Técnico"
  - "Descubrimiento de Servicios"
  - "RBAC"
"date": "2020-11-05"
---

> El público objetivo de este artículo son aquellos que acaban de comenzar con sistemas de monitorización y el grupo desfavorecido que sabe poco sobre Prometheus (como el autor cuando escribió este artículo).
>
>
>
> Entorno utilizado para configurar Prometheus en este artículo:
>
> - Versión de K8s: 1.19.3
> - Versión de Prometheus: 2.22.0
> - Sistema operativo: Archlinux a fecha de 2020.11
> - Hosts configurados, el dominio de Devbox es `devbox`
>
> ⚠️ Nota: Los parámetros de línea de comandos enumerados en este artículo deben ajustarse ligeramente según el entorno actual (por ejemplo, la versión del paquete binario de Prometheus, etc.).
>
>
>
> Aquí se enumeran algunos elementos de lectura previa recomendados:
>
> 1. [Observabilidad: Conceptos y Mejores Prácticas](https://github.com/lichuan0620/k8s-sre-learning-notes/blob/master/observability/OBSV-101.md) Introduce varios conceptos básicos de observabilidad.
> 2. [Conocimiento Inicial de Prometheus](https://github.com/lichuan0620/k8s-sre-learning-notes/blob/master/prometheus/PROM-101.md) Presenta el proyecto Prometheus.
> 3. [Introducción del sitio web oficial de Prometheus](https://prometheus.io/docs/introduction/overview/)

## Objetivo

Dado que vamos a configurar Prometheus manualmente en K8s, establecemos aquí dos convenciones:

1. Deliberadamente no usar métodos de despliegue rápidos como Helm-Chart o Prometheus Operator. Se enumeran aquí como referencia:
   1. [Helm chart](https://github.com/prometheus-community/helm-charts) mantenido por la comunidad de Prometheus.
   2. [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator)
   3. [Kube-Prometheus](https://github.com/prometheus-operator/kube-prometheus)
2. Desplegar Prometheus en K8s, es decir, que K8s gestione el servicio Prometheus. A diferencia del Prometheus Operator mencionado anteriormente, aquí escribiremos nosotros mismos los archivos de configuración YAML relacionados.
3. Enumerar los siguientes objetivos de monitorización:
   1. Prometheus
   2. Node exporter
   3. Kubelet
   4. Cadvisor
   5. ApiServer

¡Empecemos!

<!--more-->

## Prueba de concepto: Ejecutar Prometheus en máquina física (Bare Metal)

Primero, la intuición inicial es hacer una prueba de concepto en máquina física, ponerlo en marcha y luego experimentar con configuraciones más avanzadas. Finalmente, una vez que comprendamos los elementos de configuración de Prometheus, desplegarlo en K8s debería ser pan comido.

> Intenté ser perezoso y buscar tutoriales en blogs, pero descubrí que no estaban claros y la mayoría estaban desactualizados. Perdí medio día y finalmente tuve que leer la documentación oficial concienzudamente.

### Instalar Prometheus

Según la [documentación](https://prometheus.io/docs/prometheus/2.22/getting_started/), descarga directamente el paquete binario precompilado correspondiente [aquí](https://prometheus.io/download/):

```bash
curl -LO "https://github.com/prometheus/prometheus/releases/download/v2.22.0/prometheus-2.22.0.linux-amd64.tar.gz"
tar -zxvf prometheus-2.22.0.linux-amd64.tar.gz
cd prometheus-2.22.0.linux-amd64
./prometheus --version
# La salida esperada debería ser similar a esta:
# prometheus, version 2.22.0 (branch: HEAD, revision: 0a7fdd3b76960808c3a91d92267c3d815c1bc354)
#  build user:    root@6321101b2c50
#  build date:    20201015-12:29:59
#  go version:    go1.15.3
#  platform:     linux/amd64
```

Al revisar el directorio, se encuentra un archivo de configuración incluido llamado `prometheus.yml`:

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

Ahora ejecutamos el Prometheus recién descargado para que se monitorice a sí mismo, obteniendo un pequeño bucle de retroalimentación de satisfacción:

```bash
./prometheus --config.file=prometheus.yml
```

Se puede ver que Prometheus ya se ha iniciado. Accede a http://devbox:9090 para ver su interfaz de usuario. En este punto, haz clic aleatoriamente para tener una idea general de las funciones que ofrece Prometheus, permitiéndonos conocer cómo se comporta cuando funciona normalmente.

### Ejecutar Node exporter

Ahora ejecutamos un Node Exporter en máquina física para observar varias métricas de la máquina local.

```bash
curl -LO "https://github.com/prometheus/node_exporter/releases/download/v1.0.1/node_exporter-1.0.1.linux-amd64.tar.gz"
tar -zxvf node_exporter-1.0.1.linux-amd64.tar.gz
cd node_exporter-1.0.1.linux-amd64
./node_exporter
```

A continuación, modifica la configuración para que Prometheus recopile métricas desde allí.

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

Abre la interfaz web de Prometheus y observa que se ha agregado un nuevo target llamado `node-exporter`. Revisa la carga de trabajo (ejecutando un [programa](https://github.com/Thrimbda/fiber) que calcula la secuencia de Fibonacci para siempre y puede saturar todos los núcleos):

![img](https://0xc1.space/images/2020/11/05/node-load.png)

En este punto, la fase de prueba de concepto se ha completado con éxito.

> Nota: Como parte de la prueba de concepto, no se recomienda usar Prometheus desplegado en máquina física para monitorizar directamente un clúster K8s. La razón es que acceder a los componentes de K8s desde fuera del clúster requiere configurar certificados y tener un [ClusterRole](https://kubernetes.io/zh/docs/reference/access-authn-authz/rbac/) con los permisos de acceso correspondientes (aquí se omiten los diversos problemas que el autor encontró al intentar usar Prometheus desplegado en máquina física para monitorizar un clúster K8s y sus componentes).

## Monitorizar un clúster K8s con Prometheus

A continuación, vamos a monitorizar nuestro clúster K8s a través de Prometheus.

### Elementos de configuración de Prometheus

En la introducción a Prometheus, se puede entender que Prometheus se basa principalmente en la obtención de datos mediante "Pull", por lo que necesita descubrimiento de servicios, es decir, hacer que Prometheus sepa de dónde extraer los datos para que los usuarios puedan verlos.

Entonces, primero hay que resolver un problema: **el descubrimiento de servicios para el clúster K8s** — el secreto debe estar escondido en la configuración.

La [documentación](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/) tiene una descripción detallada de la configuración de Prometheus.

Se describen brevemente los siguientes elementos de configuración (no necesariamente son ortogonales entre sí):

- [`<global>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#configuration-file): La configuración aquí tiene efecto en cualquier otro elemento de configuración y sirve como valor predeterminado para los elementos en otras configuraciones.
- [`<scrape_config>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#scrape_config): Define una tarea de monitorización, describiendo de dónde y cómo debe Prometheus monitorizar este objetivo, entre otra información.
- [`<tls_config>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#tls_config): Describe la configuración TLS.
- [`<*_sd_config>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#kubernetes_sd_config): Prometheus proporciona configuración para el descubrimiento de servicios de una serie de objetivos de monitorización predefinidos a través de esta serie de elementos de configuración (sd significa service discovery).
- [`<static_config>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#static_config): Para objetivos de monitorización no predefinidos por Prometheus (como cualquier servicio desplegado manualmente en máquina física), se puede usar este elemento de configuración para el descubrimiento de servicios. Lo usamos en la prueba de concepto anterior.
- [`<relabel_config>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#relabel_config): Antes de comenzar a extraer las métricas del objetivo de monitorización, se pueden modificar algunas etiquetas (labels) a través de este elemento de configuración. Prometheus proporciona algunas reglas de etiquetas predefinidas. El reetiquetado (relabel) se puede realizar en varios pasos. Después del reetiquetado, las etiquetas con el prefijo `__` se eliminarán.

Parece que el elemento de configuración central en Prometheus es su `<scrape_config>`. Cada uno define una tarea de monitorización, similar al concepto de namespace, proporcionando principalmente una agrupación de objetivos de monitorización. Dentro de él, definimos `<*_sd_config>` o `<static_config>` para decirle a Prometheus exactamente desde qué endpoints extraer datos y cómo filtrar estos endpoints.

¡Profundicemos en la comprensión de estos elementos de configuración a través de la práctica!

### Desplegar Prometheus

El trabajo central del despliegue radica en pensar claramente qué recursos se necesitan para desplegar Prometheus en el clúster. El autor da la respuesta directamente aquí:

1. Un Namespace dedicado.
2. Un DaemonSet para gestionar node-exporter.
3. Un Service para Node-exporter.
4. Gestionar la configuración de Prometheus con un ConfigMap.
5. Un ServiceAccount dedicado para Prometheus.
6. Un ClusterRole con permisos suficientes.
7. Un ClusterRoleBinding que vincule el ServiceAccount y el ClusterRole.
8. Un Deployment para Prometheus.
9. Un Service para Prometheus.

En un clúster K8s con RBAC aplicado, necesitamos definir un rol con permisos suficientes para Prometheus, que pueda leer el estado del clúster y varias métricas, de ahí la necesidad de los elementos 5-7.

Aquí se proporciona un [conjunto de declaraciones de recursos](https://github.com/Thrimbda/prometheus-set-up) acumulado por el autor durante su propio proceso de configuración. Además de los recursos mencionados, incluye kube-state-metrics. Siguiendo el orden de las operaciones, se puede obtener un Prometheus desplegado.

#### Node-exporter

Para Node-exporter, dado que es la monitorización de la máquina en sí, el requisito es uno por Node. Dado que también queremos disfrutar de la gestión del ciclo de vida de K8s, DaemonSet es la mejor opción.

Al ejecutarse en un contenedor, sin configuración no puede recopilar métricas reales del Node. Por lo tanto, es necesario montar ubicaciones especiales del host en el contenedor para que Node-exporter pueda recopilar métricas.

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

Luego, simplemente expón un endpoint al que Prometheus pueda acceder de forma persistente a través de un Service.

#### Prometheus

Prometheus se despliega usando un Deployment. Antes de desplegar Prometheus, es necesario configurarle permisos suficientes para que pueda acceder a los endpoints necesarios y recopilar métricas. En un clúster K8s con RBAC configurado, esto se logra a través de ClusterRole/ServiceAccount/ClusterRoleBinding. Una vez configurado, Prometheus utiliza el ServiceAccount para realizar la autenticación correspondiente y así acceder a los endpoints necesarios.

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

Hasta ahora, tenemos todas las condiciones previas para lograr los objetivos de monitorización. Entonces, ¿cómo impulsamos el poderoso motor de Prometheus para aprovechar plenamente el entorno que hemos preparado y lograr la monitorización?

Combinando la introducción a la configuración de Prometheus del apartado anterior, definimos cuatro objetivos de monitorización con cuatro `<scrape_config>`:

Para node-exporter:

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

Dado que está dentro del clúster, no se necesita autenticación adicional ni acceso HTTPS.

Aquí se explica más a fondo `<relabel_configs>` usando el ejemplo de node-exporter:

Una etiqueta (label) es un atributo sobre un endpoint específico. Diferentes endpoints pueden tener diferentes valores bajo la misma etiqueta. Lo que hace `<relabel_config>` es realizar algunas operaciones de modificación y filtrado sobre estas etiquetas, permitiéndonos filtrar/modificar los endpoints deseados.

![img](https://0xc1.space/images/2020/11/05/node-exporter-target.png)

Se puede ver que en la configuración anterior hay tres acciones de reetiquetado (relabel). La primera significa: de todos los valores de la etiqueta **predefinida** `__meta_kubernetes_service_name` para el descubrimiento de servicios de K8s, filtrar según la expresión regular dada "node-exporter" y, según la `action`, mantener los endpoints objetivo que coincidan y descartar los valores restantes con la misma etiqueta. Las dos últimas acciones de reetiquetado son para conservar las etiquetas semánticas `node` y `host_ip` cambiándoles el nombre. (¿Recuerdas? Las etiquetas que comienzan con doble guión bajo finalmente se eliminarán).

Para Prometheus mismo:

```yaml
- job_name: 'prometheus'
  kubernetes_sd_configs:
    - role: endpoints
  relabel_configs:
    - source_labels: [__meta_kubernetes_service_name]
      regex: prometheus
      action: keep
```

Usa la misma estrategia para filtrar los endpoints.

Para kubelet y cadvisor, la situación se vuelve un poco más compleja:

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

Observa que el `role` se convierte en `node`, por lo que Prometheus recopilará métricas por defecto desde `<node_ip>:10250/metrics`. Aquí hay un elemento de configuración adicional `bearer_token_file`. Dado que kubelet no permite el acceso anónimo a sus datos de métricas de forma predeterminada, aquí es donde se usa el ServiceAccount configurado anteriormente. Para facilitar las cosas, usamos `insecure_skip_verify: true` para omitir la autenticación TLS.

Para ApiServer, se vuelve un poco más complejo nuevamente:

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

Aquí filtramos los endpoints del propio ApiServer a través de `<relabel_config>`. Al proporcionar autenticación por token, también debemos proporcionar el archivo CA para verificar la identidad, ¡y así podremos acceder a ApiServer!

En este punto, hemos completado el despliegue de Prometheus y la configuración de monitorización para los endpoints objetivo.

Los lectores interesados pueden modificar aún más la configuración para observar el comportamiento de Prometheus bajo diferentes configuraciones y profundizar su comprensión. Aquí hay una pequeña tarea: ¿Cómo podemos monitorizar un clúster K8s con Prometheus desplegado en máquina física?

## Referencias

1. [Prometheus Configuration](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#configuration)
2. [Kube-prometheus manifests](https://github.com/prometheus-operator/kube-prometheus/tree/8b0eebdd08d8926649d27d2bc23acf31144c2f6b/manifests)
3. [TSDB v3 design](https://fabxc.org/tsdb/)
4. [Observabilidad: Conceptos y Mejores Prácticas](https://github.com/lichuan0620/k8s-sre-learning-notes/blob/master/observability/OBSV-101.md)
5. [Conocimiento Inicial de Prometheus](https://github.com/lichuan0620/k8s-sre-learning-notes/blob/master/prometheus/PROM-101.md)
6. [RBAC on K8s](https://kubernetes.io/zh/docs/reference/access-authn-authz/rbac/)