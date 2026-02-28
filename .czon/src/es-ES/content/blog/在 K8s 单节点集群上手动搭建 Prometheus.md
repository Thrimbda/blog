---
date: 2020-11-05
title: Configuración manual de Prometheus en un clúster de un solo nodo de K8s
taxonomies:
  tags:
    - Observabilidad
    - Prometheus
    - Tecnología
---
> El público objetivo de este artículo son aquellos que recién comienzan a explorar los sistemas de monitoreo, así como aquellos con conocimientos limitados sobre Prometheus (tal como el autor al momento de escribir este artículo).
>
>
>
> Entorno utilizado para configurar Prometheus en este artículo:
>
> - Versión de K8s: 1.19.3
> - Versión de Prometheus: 2.22.0
> - Sistema operativo: Archlinux a noviembre de 2020
> - Hosts configurados, el dominio de Devbox es devbox
>
> ⚠️ Nota: Los parámetros de línea de comandos enumerados en este artículo deben ajustarse ligeramente según el entorno actual (por ejemplo, la versión del paquete binario de Prometheus, etc.)
>
>
>
> Aquí se enumeran algunas lecturas previas recomendadas:
>
> 1. [Observabilidad: Conceptos y mejores prácticas](https://github.com/lichuan0620/k8s-sre-learning-notes/blob/master/observability/OBSV-101.md) Introduce varios conceptos básicos de observabilidad.
> 2. [Conocimiento inicial de Prometheus](https://github.com/lichuan0620/k8s-sre-learning-notes/blob/master/prometheus/PROM-101.md) Presenta el proyecto Prometheus.
> 3. [Introducción del sitio web oficial de Prometheus](https://prometheus.io/docs/introduction/overview/)

## Objetivo

Dado que estamos configurando Prometheus manualmente en K8s, establecemos dos convenciones aquí:

1. Evitar deliberadamente métodos de implementación rápidos como Helm-Chart, Prometheus Operator, etc. Se enumeran aquí como referencia:
   1. [Helm chart](https://github.com/prometheus-community/helm-charts) mantenido por la comunidad de Prometheus.
   2. [Prometheus Operator](https://github.com/prometheus-operator/prometheus-operator)
   3. [Kube-Prometheus](https://github.com/prometheus-operator/kube-prometheus)
2. Configurar Prometheus en K8s, es decir, que K8s gestione el servicio de Prometheus. A diferencia del Prometheus Operator mencionado anteriormente, aquí escribiremos manualmente los archivos de configuración YAML relacionados.
3. Enumerar los siguientes objetivos de monitoreo:
   1. Prometheus
   2. Node exporter
   3. Kubelet
   4. Cadvisor
   5. ApiServer

¡Comencemos!

<!--more-->

## Prueba de concepto de ejecución de Prometheus en máquina física

Primero, la intuición inicial es realizar una prueba de concepto en una máquina física, ejecutarla primero y luego experimentar con configuraciones más avanzadas. Finalmente, una vez que comprendamos los elementos de configuración de Prometheus, desplegarlo en K8s debería ser pan comido.

> Intenté ser perezoso y buscar tutoriales en blogs, pero descubrí que no estaban claros y la mayoría estaban desactualizados. Como resultado, perdí medio día y tuve que leer la documentación oficial con diligencia.

### Instalar Prometheus

Según la [documentación](https://prometheus.io/docs/prometheus/2.22/getting_started/), descargue directamente el paquete binario precompilado correspondiente [aquí](https://prometheus.io/download/):

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

Al revisar el directorio, se encuentra un archivo de configuración predeterminado llamado prometheus.yml:

```yaml
# my global config
global:
 scrape_interval:   15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
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

Ahora ejecutamos el Prometheus recién descargado para monitorearse a sí mismo, obteniendo un pequeño bucle de retroalimentación de satisfacción:

```bash
./prometheus --config.file=prometheus.yml
```

Se puede ver que Prometheus ya se ha iniciado. Acceda a http://devbox:9090 para ver su interfaz de usuario. En este punto, haga clic aleatoriamente para tener una idea general de las funciones proporcionadas por Prometheus, permitiéndonos comprender su comportamiento cuando funciona correctamente.

### Ejecutar Node exporter

Ahora ejecutamos un Node Exporter en la máquina física para observar varias métricas del sistema.

```bash
curl -LO "https://github.com/prometheus/node_exporter/releases/download/v1.0.1/node_exporter-1.0.1.linux-amd64.tar.gz"
tar -zxvf node_exporter-1.0.1.linux-amd64.tar.gz
cd node_exporter-1.0.1.linux-amd64
./node_exporter
```

A continuación, modifique la configuración para que Prometheus recopile métricas desde allí.

```yaml
# my global config
global:
 scrape_interval:   15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
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

Abra la interfaz web de Prometheus y observe que se ha agregado un nuevo target llamado `node-exporter`. Revise la carga de trabajo (ejecutando un [programa](https://github.com/Thrimbda/fiber) que calcula la secuencia de Fibonacci para siempre, ocupando todos los núcleos):

![img](https://0xc1.space/images/2020/11/05/node-load.png)

En este punto, la fase de prueba de concepto se ha completado con éxito.

> Nota: Como parte de la prueba de concepto, no se recomienda usar Prometheus implementado en máquina física para monitorear directamente un clúster de K8s. La razón es que acceder a los componentes de K8s desde fuera del clúster requiere configurar certificados y un [ClusterRole](https://kubernetes.io/zh/docs/reference/access-authn-authz/rbac/) con los permisos de acceso correspondientes (aquí se omiten los diversos problemas que el autor encontró al intentar usar Prometheus implementado en máquina física para monitorear el clúster de K8s y sus componentes).

## Monitorear un clúster de K8s con Prometheus

A continuación, vamos a monitorear nuestro clúster de K8s a través de Prometheus.

### Elementos de configuración de Prometheus

Según la introducción a Prometheus, su principal método de obtención de datos es basado en Pull, por lo que necesita descubrimiento de servicios, es decir, que Prometheus sepa de dónde extraer los datos para que los usuarios puedan verlos.

Entonces, primero hay que resolver un problema: **Descubrimiento de servicios para el clúster de K8s** — el secreto debe estar oculto en la configuración.

La [documentación](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/) contiene una descripción detallada de la configuración de Prometheus.

Se describen brevemente los siguientes elementos de configuración (no necesariamente ortogonales entre sí):

- [`<global>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#configuration-file): Su configuración afecta a cualquier otro elemento de configuración y sirve como valor predeterminado para los elementos en otras configuraciones.
- [`<scrape_config>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#scrape_config): Define una tarea de monitoreo, describiendo de dónde y cómo Prometheus debe monitorear este objetivo, entre otra información.
- [`<tls_config>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#tls_config): Describe la configuración TLS.
- [`<*_sd_config>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#kubernetes_sd_config): Prometheus proporciona configuración para el descubrimiento de servicios de una serie de objetivos de monitoreo predefinidos a través de esta serie de elementos de configuración (sd significa service discovery).
- [`<static_config>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#static_config): Para objetivos de monitoreo no predefinidos por Prometheus (como cualquier servicio implementado manualmente en máquina física), se puede usar este elemento de configuración para el descubrimiento de servicios. Lo usamos en la fase de prueba de concepto.
- [`<relabel_config>`](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#relabel_config): Antes de comenzar a extraer las métricas del objetivo de monitoreo, se pueden modificar algunas etiquetas (labels) mediante este elemento de configuración. Prometheus proporciona algunas reglas de etiquetas predefinidas. El relabeling se puede realizar en varios pasos. Después del relabeling, las etiquetas con el prefijo __ se eliminarán.

Parece que el elemento de configuración central en Prometheus es su `<scrape_config>`. Cada uno define una tarea de monitoreo, similar al concepto de namespace, proporcionando principalmente una agrupación de objetivos de monitoreo. Dentro de él, definimos `<*_sd_config>` o `<static_config>` para indicarle a Prometheus exactamente desde qué endpoints extraer datos y cómo filtrar estos endpoints.

¡Profundicemos en la comprensión de estos elementos de configuración a través de la práctica!

### Desplegar Prometheus

El trabajo central de la implementación radica en pensar claramente qué recursos se necesitan para implementar Prometheus en el clúster. El autor revela directamente la respuesta aquí:

1. Un Namespace dedicado
2. Un DaemonSet para gestionar node-exporter
3. Un Service para Node-exporter
4. Gestionar la configuración de Prometheus con ConfigMap
5. Un ServiceAccount dedicado para Prometheus
6. Un ClusterRole con permisos suficientes
7. Un ClusterRoleBinding que vincule el ServiceAccount y el ClusterRole
8. Un Deployment para Prometheus
9. Un Service para Prometheus

En un clúster de K8s con RBAC aplicado, necesitamos definir un rol con permisos suficientes para Prometheus, capaz de leer el estado del clúster y varias métricas, de ahí la necesidad de los elementos 5-7.

Aquí se proporciona un [conjunto de declaraciones de recursos](https://github.com/Thrimbda/prometheus-set-up) acumulado por el autor durante su propio proceso de configuración. Además de los recursos mencionados, incluye kube-state-metrics. Siguiendo el orden de las operaciones, se puede obtener un Prometheus implementado.

#### Node-exporter

Para Node-exporter, dado que es un monitoreo de la máquina en sí, el requisito es uno por cada Node. Dado que también deseamos disfrutar de la gestión del ciclo de vida de K8s, DaemonSet es la mejor opción.

Dado que se ejecuta dentro de un contenedor, sin configuración no puede recopilar métricas reales del Node. Por lo tanto, es necesario montar ubicaciones especiales del host en el contenedor para que Node-exporter pueda recopilar métricas.

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
 name: roo
```

Luego, exponga un endpoint al que Prometheus pueda acceder de manera persistente a través de un Service.

#### Prometheus

Prometheus se implementa utilizando un Deployment. Antes de implementar Prometheus, es necesario configurarle permisos suficientes para que pueda acceder a los endpoints necesarios y recopilar métricas. En un clúster de K8s con RBAC configurado, esto se logra a través de ClusterRole/ServiceAccount/ClusterRoleBinding. Una vez completada la configuración, Prometheus utiliza el ServiceAccount para realizar la autenticación correspondiente y así acceder a los endpoints necesarios.

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
  - "/metrics/cadviror"
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
 name: promtheus
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

Hasta ahora, tenemos todas las condiciones previas para lograr los objetivos de monitoreo. Entonces, ¿cómo impulsamos el poderoso motor de Prometheus para aprovechar plenamente el entorno que hemos preparado y lograr el monitoreo?

Combinando la introducción a la configuración de Prometheus en la sección anterior, los cuatro objetivos de monitoreo se definen con cuatro `<scrape_config>`:

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

Una etiqueta (label) es un atributo sobre un endpoint específico. Diferentes endpoints pueden tener diferentes valores bajo la misma etiqueta. Lo que hace `<relabel_config>` es realizar algunas operaciones de modificación y filtrado en estas etiquetas, permitiéndonos filtrar/modificar los endpoints deseados.

![img](https://0xc1.space/images/2020/11/05/node-exporter-target.png)

Se puede ver que en la configuración anterior hay tres acciones de relabeling. La primera significa: de todos los valores de la etiqueta **predefinida** `__meta_kubernetes_service_name` para el descubrimiento de servicios de K8s, filtrar según la expresión regular dada "node-exporter". Según `action`, se conservan los endpoints objetivo que coinciden y se descartan los valores restantes con la misma etiqueta. Las dos últimas acciones de relabeling son para conservar las etiquetas semánticas node y host_ip cambiándoles el nombre. (¿Recuerdan? Las etiquetas que comienzan con doble guión bajo finalmente se eliminarán).

Para Prometheus mismo:

```yaml
- job_name: 'prometheus'
 kubernetes_sd_configs:
 - role: endpoints
 relabel_configs:
 - source_labels: [__meta_kubernetes_service_name]
  regex: prometheus
  action: kee
```

Utilice la misma estrategia para filtrar los endpoints.

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

Note que el rol cambia a node, por lo que Prometheus recopilará métricas por defecto desde `<node_ip>:10250/metrics`. Aquí hay un elemento de configuración adicional `bearer_token_file`. Dado que kubelet no permite el acceso anónimo a sus datos de métricas de forma predeterminada, aquí es donde se utiliza el ServiceAccount configurado anteriormente. Para mayor comodidad, usamos `insecure_skip_verify: true` para omitir la autenticación TLS.

Para ApiServer, la situación se vuelve un poco más compleja nuevamente:

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

Aquí filtramos los endpoints del propio ApiServer a través de `<relabel_config>`. Al proporcionar autenticación por token, también debemos proporcionar el archivo CA para verificar la identidad, lo que nos permite acceder a ApiServer.

En este punto, hemos completado la implementación de Prometheus y la configuración de monitoreo para los endpoints objetivo.

Los lectores interesados pueden modificar aún más la configuración para observar el comportamiento de Prometheus bajo diferentes configuraciones y profundizar su comprensión. Aquí hay una pequeña tarea: ¿Cómo podemos monitorear un clúster de K8s con Prometheus implementado en una máquina física?

## Referencias

1. [Configuración de Prometheus](https://prometheus.io/docs/prometheus/2.22/configuration/configuration/#configuration)
2. [Manifiestos de Kube-prometheus](https://github.com/prometheus-operator/kube-prometheus/tree/8b0eebdd08d8926649d27d2bc23acf31144c2f6b/manifests)
3. [Diseño de TSDB v3](https://fabxc.org/tsdb/)
4. [Observabilidad: Conceptos y mejores prácticas](https://github.com/lichuan0620/k8s-sre-learning-notes/blob/master/observability/OBSV-101.md)
5. [Conocimiento inicial de Prometheus](https://github.com/lichuan0620/k8s-sre-learning-notes/blob/master/observability/OBSV-101.md)
6. [RBAC en K8s](https://kubernetes.io/zh/docs/reference/access-authn-authz/rbac/)