---
"title": "Lectura de Código Fuente: Harbor-Operator"
"summary": "Este artículo es un análisis técnico del código fuente de Harbor-Operator. El autor comienza con los principios de diseño (como 'Worse is Better') e introduce las características de Harbor-Operator, implementado en Golang para la plataforma Kubernetes. El artículo analiza en profundidad su arquitectura central, incluyendo cómo resuelve las dependencias entre recursos mediante un Gráfico de Dependencias (Dependency Graph), y cómo implementa la lógica de reconciliación para once CRDs diferentes a través de un único Controller unificado, mejorando enormemente la reutilización de código. También se interpretan en detalle diseños de componentes clave como ResourceManager y ProcessFunc, mostrando las excelentes prácticas de Harbor-Operator en la búsqueda de simplicidad, consistencia y mantenibilidad."
"tags":
  - "Operator"
  - "Kubernetes"
  - "Golang"
  - "Análisis de Código Fuente"
  - "Harbor"
  - "Patrones de Diseño"
  - "Gráfico de Dependencias"
  - "Controller"
"date": "2022-01-30"
---

<!--more-->

<a id="orgdafefdb"></a>

## Preparativos Antes de Comenzar

<a id="org081213e"></a>

### ¿Por Qué Harbor-Operator?

<a id="org55a74c9"></a>

#### ¿Worse is Better?

¿Qué es un buen software?

En un famoso artículo de finales de los 80, *The Rise of Worse is Better*, el autor menciona que un buen diseño de software debe considerar cuatro cualidades: **simplicidad, corrección, consistencia y completitud**.

El autor describe dos filosofías de diseño de software, llamémoslas *the right thing* y *worse is better* (es necesario señalar que este nombre no es peyorativo); ambas giran en torno a las cuatro cualidades mencionadas, diferenciándose en la priorización de estas.

---

<a id="orgbebeeee"></a>

##### The right thing

-   **Simplicidad** - El diseño debe ser simple y fácil de entender. La simplicidad de la interfaz es más importante que la simplicidad de la implementación.
-   **Corrección** - El diseño debe ser correcto. En esto no se puede ceder.
-   **Consistencia** - La consistencia es tan importante como la corrección, por lo que se puede ceder un poco en simplicidad y completitud.
-   **Completitud** - El diseño debe poder considerar una variedad de situaciones posibles. No se puede sacrificar excesivamente la completitud para mantener la simplicidad.

<a id="org948c614"></a>

##### Worse is better

-   **Simplicidad** - El diseño debe ser simple y fácil de entender. La simplicidad de la implementación es más importante que la simplicidad de la interfaz. La simplicidad es la cualidad más importante.
-   **Corrección** - El diseño debe ser correcto, por supuesto, pero mantener la simplicidad es un poco más importante que la corrección.
-   **Consistencia** - El diseño no debe ser demasiado inconsistente. Se puede sacrificar la consistencia para mantener la simplicidad. Se puede sacrificar la consistencia por completitud si se garantiza la simplicidad.
-   **Completitud** - El diseño debe poder considerar una variedad de situaciones posibles. Se puede sacrificar la completitud en cualquier momento para garantizar la simplicidad del diseño.

---

Posteriormente, el autor da muchos ejemplos de ambos para argumentar por qué *worse-is-better* estaba arrasando en la industria del software de entonces.

Estas dos filosofías no tienen superioridad o inferioridad. Hoy en día las vemos a nuestro alrededor, y la realidad a menudo oscila entre ambas. Aspiramos a crear diseños excelentes y con valor estético, pero también debemos considerar factores de costo y humanos. Al final, debemos entregar software de calidad que funcione para resolver problemas del mundo real, y el costo de escribir y mantener el software absolutamente no debe superar el valor del problema en sí.

<a id="org514ce0b"></a>

#### Golang - el lenguaje

Golang es casi un ejemplo paradigmático de la filosofía *worse is better*:

-   Condensa años de experiencia práctica de Google con C++.
-   Es tan simple, sin características complejas, que básicamente solo hay una forma (*building block*) de resolver un problema, lo que significa:
    -   Se puede dominar fácilmente sin necesidad de profundizar en el lenguaje mismo.
    -   El código es muy legible.
-   Compila rápidamente, incluso sacrificó los genéricos por la velocidad de compilación.
-   Permite ejecutar tareas en paralelo muy fácilmente mediante goroutines.
-   Casi descarta la característica del lenguaje de trazas de excepción, forzando la verificación y manejo de errores.
-   Compila una vez, ejecuta en cualquier lugar.

<a id="org2432232"></a>

#### Kubernetes - la plataforma

Kubernetes es familiar para todos, no me atrevo a dar lecciones, lo resumo en una frase: Proporciona un diseño de API conceptualmente muy simple, complementado con un mecanismo de reconciliación inspirado en la cibernética, permitiendo que el software containerizado se despliegue, escale y opere de forma automatizada.

K8s permite a los desarrolladores extender sus capacidades abriendo esta especificación de API y el mecanismo de reconciliación. Los desarrolladores pueden implementar el **Patrón Operator**: codificar el conocimiento sobre configuración, despliegue (Día-1) y operaciones, respaldo, conmutación por error (Día-2) del software en un software que opera el software, automatizando estas operaciones complejas y propensas a errores, mejorando así la confiabilidad y reduciendo costos.

---

Entonces, la razón para elegir Harbor Operator es que tiene un diseño excelente. En una plataforma sobresaliente y utilizando características de un lenguaje simple, sin trucos excesivos, logra un sistema de software pragmático y con valor estético a través de varios diseños clave que siguen los principios de diseño SOLID. Puede considerarse un practicante de la filosofía *the right thing*.

El código del autor casi no tiene comentarios, pero es excepcionalmente legible, lo cual también se debe a la coherencia de todo el sistema.

<a id="org6815286"></a>

## Objetivo

La abstracción y simplificación de problemas inevitablemente conlleva una pérdida de flexibilidad. Harbor Operator, sin embargo, sacrifica completamente la flexibilidad para lograr la máxima reducción de carga mental, haciendo que el desarrollo del Operator se asemeje más a declarar una configuración de software.

Escribir un operator manualmente con client-go, debido a la falta de genéricos en Golang, es casi un castigo. El proyecto estaría plagado de una enorme cantidad de *boilerplate code* (código repetitivo). Creo que incluso si alguien realmente escribiera un operator manualmente con client-go, nadie empezaría realmente desde cero.

Así surgió **kubebuilder**. Abstrae operaciones como la creación del cliente de Kubernetes, la escucha de solicitudes del API Server de Kubernetes y su encolamiento en bibliotecas comunes (*controller runtime*) y herramientas comunes (*controller tools*), y puede generar código *scaffolding* para que los desarrolladores se centren en desarrollar la lógica de negocio que maneja las solicitudes de cambio de objetos API.

Kubebuilder aún deja un espacio para la diversidad de la lógica de negocio. Harbor Operator, sobre esta base, busca llevar las cosas al extremo, sacrificando completamente la flexibilidad en pos de la consistencia y simplicidad conceptual, y el negocio al que se enfrenta es realmente muy adecuado para este enfoque.

Por lo tanto, en esta lectura de código fuente, nuestro objetivo principal es aprender de Harbor Operator:

-   Cómo realiza las operaciones del Día-1.
-   Cómo reduce aún más la redundancia del código del operator, utilizando el mismo código de Controller para implementar el Controller de once CRDs de diferentes niveles.
-   Cómo utiliza un DAG para resolver las dependencias entre recursos. El autor aparentemente incluso patentó esto.

Además, no nos centraremos en estudiar:

-   Las operaciones del Día-2 en Harbor Operator; de hecho, en la versión actual esta funcionalidad aún no es estable.
-   El código fuente y las funcionalidades del propio Harbor.

<a id="org345a335"></a>

## Lectura del Código Fuente

<a id="org1198d5f"></a>

### Estructura Estática

<a id="orgb32de77"></a>

#### Estructura de Directorios

Aquí solo se listan los directorios.

```
    root
    ├── apis
    │   ├── goharbor.io
    │   │   └── v1alpha3
    │   └── meta
    │       └── v1alpha1
    ├── controllers
    │   ├── controller_string.go
    │   ├── controllers.go
    │   └── goharbor
    │       ├── chartmuseum
    │       ├── controller_test.go
    │       ├── core
    │       ├── exporter
    │       ├── harbor
    │       ├── harborcluster
    │       ├── internal
    │       ├── jobservice
    │       ├── notaryserver
    │       ├── notarysigner
    │       ├── portal
    │       ├── registry
    │       ├── registryctl
    │       └── trivy
    ├── pkg
    │   ├── builder
    │   ├── cluster
    │   │   ├── controllers
    │   │   │   ├── cache
    │   │   │   ├── common
    │   │   │   ├── database
    │   │   │   │   └── api
    │   │   │   ├── harbor
    │   │   │   └── storage
    │   │   ├── gos
    │   │   ├── k8s
    │   │   └── lcm
    │   ├── config
    │   │   ├── harbor
    │   │   └── template
    │   ├── controller
    │   │   ├── errors
    │   │   ├── internal
    │   │   │   └── graph
    │   │   └── mutation
    │   ├── event-filter
    │   ├── exit
    │   ├── factories
    │   │   ├── application
    │   │   ├── logger
    │   │   └── owner
    │   ├── graph
    │   ├── harbor
    │   ├── image
    │   ├── manager
    │   ├── resources
    │   │   ├── checksum
    │   │   └── statuscheck
    │   ├── scheme
    │   ├── setup
    │   ├── status
    │   ├── template
    │   ├── tracing
    │   ├── utils
    │   │   └── strings
    │   └── version
    ...
```

<a id="orgfc0f08e"></a>

#### Interfaces Clave

![img](https://0xc1.space/images/2022/01/30/harbor-operator-class.svg)

<a id="org290c6c2"></a>

#### Arquitectura del Sistema

Hasta la versión v1.0.1, Harbor Operator se encarga principalmente de las operaciones del Día-1 del sistema Harbor.
![img](https://0xc1.space/images/2022/01/30/harbor-operator-arch.png)

<a id="org41c8944"></a>

### Enfocarse en lo Grande, Dejar lo Pequeño: HarborCluster

Primero, filtremos algunas partes no tan críticas: la definición del CRD HarborCluster y la implementación de su Controller.

¿Por qué es especial? Primero, observemos su posición en la arquitectura del sistema: está en el nivel más alto. Gestiona el propio sistema Harbor y todos los servicios con estado de los que depende. Esto debe explicarse desde la historia del proyecto y su posición especial en la arquitectura del sistema.

Desde la perspectiva de la arquitectura del sistema, este CRD HarborCluster es extremadamente similar en definición al CRD Harbor, con una gran redundancia de código, lo que lo hace verse poco elegante. Esto se debe a que, como el CRD más externo (superior) del sistema, está orientado directamente al usuario; debe poder proporcionar al usuario todas las configuraciones necesarias para declarar un despliegue de Harbor. Además, dado que Harbor en sí es un conjunto de servicios sin estado, un despliegue completo también requiere que el CRD HarborCluster gestione todos los servicios con estado de los que depende Harbor, incluyendo Postgres, Minio y Redis.

La información necesaria del propio sistema Harbor ya está definida en el CRD Harbor. Por lo tanto, la parte redundante en el CRD HarborCluster es transmitir esta información completa y correctamente al CRD Harbor. Además, el CRD HarborCluster necesita gestionar los CRDs de esos servicios con estado que están fuera de los límites de su propia responsabilidad, por lo que no puede utilizar completamente la lógica del Controller de Harbor y todos sus subcomponentes.

Desde una perspectiva histórica, Harbor Operator fue originalmente un proyecto privado de OVH Cloud, que luego fue donado a la comunidad goharbor. Por lo tanto, combinando la observación del historial de git, la razón por la cual la definición del CRD HarborCluster y la implementación de su Controller tienen tanta inconsistencia con los otros Controllers del sistema es que es un recién llegado contribuido por la comunidad, y las funciones que debe cumplir no se consideraron en el diseño inicial de Harbor Operator.

La implementación del propio HarborCluster Controller no difiere mucho de la mayoría de los Controllers implementados con Controller-runtime que solemos ver, por lo que no se estudiará en detalle.

---

HarborCluster Controller

![img](https://0xc1.space/images/2022/01/30/harbor-cluster-controller.png)

---

Harbor Core Controller

![img](https://0xc1.space/images/2022/01/30/harbor-core-controller.png)

---

<a id="orgd9c3526"></a>

### Resolviendo Dependencias entre Recursos: Dependency Graph

El gráfico de dependencias es un módulo relativamente independiente en todo el proyecto, pero en realidad actúa como el motor de ejecución de todos los controllers en Harbor Operator. Esencialmente, observa que existen relaciones de dependencia mutua entre varios tipos de recursos en Kubernetes. El despliegue y reconciliación de algunos recursos depende del despliegue y reconciliación de otros, por ejemplo, un Deployment puede depender de un Configmap; eventualmente, estas relaciones de dependencia forman un gráfico de dependencias, que en realidad debería ser un DAG. Aquí necesitamos una definición de interfaz como la siguiente:

```go
    package graph

    type Resource interface{}

    type RunFunc func(context.Context, Resource) error

    type Manager interface {
            Run(ctx context.Context) error
            AddResource(ctx context.Context, resource Resource, blockers []Resource, run RunFunc) error
    }

    type resourceManager struct {
       resources map[Resource][]Resource
       functions map[Resource]RunFunc

       lock sync.Mutex
    }
```

-   Donde `Resource` define un recurso abstracto. Dado que este módulo no se preocupa por lo que representa realmente un recurso, y para mantener la máxima flexibilidad dentro de las limitaciones expresivas del lenguaje, se utiliza el tipo superior `interface{}`.
-   `RunFunc` es responsable de manejar específicamente cómo operar sobre un `Resource`. Aquí, `RunFunc` enfrenta un problema de seguridad de tipos: `interface{}` significa que el compilador no sabe nada sobre este tipo y no puede proceder, pero `RunFunc` debe tomar este tipo que puede ser cualquier cosa y hacer algo con él. Por lo tanto, creemos que debe realizar una conversión de tipo forzada. Si cada `RunFunc` de recurso tuviera que convertir manualmente a un tipo específico, sería muy tedioso y desagradable; más adelante observaremos cómo Harbor Operator centraliza este trabajo sucio en un solo lugar.
-   `Manager` solo tiene dos métodos: agregar un `Resource` y ejecutar este gráfico. Necesitamos estudiarlos por separado.
-   La estructura de datos `resourceManager` que implementa `Manager` también es simple:
    -   Un mapa `resource -> blockers`
    -   Un mapa `resource -> runFunc`
    -   Un `lock` para manejar la concurrencia en las operaciones del mapa. Desde aquí podemos ver que al autor no le gustan las estructuras de datos como `Sync.Map` que garantizan seguridad concurrente pero pierden seguridad de tipos. Esto hace que sea aún más curioso cómo el autor maneja tantos `RunFunc` (11 componentes).

Si es un Graph, debe haber una estructura de datos para el Graph y un método de fábrica para construir este Graph. La estructura de datos de `resourceManager` parece un poco rígida, no estoy seguro de si es el Graph real.

<a id="org75cbb07"></a>

#### AddResource

Según la firma, se puede observar que `AddResource` agrega el recurso que necesita ser agregado, todas sus dependencias y la `runFunc` correspondiente. Vale la pena notar que primero se deben agregar los recursos que no dependen de ningún recurso (es decir, con grado de salida 0).

```go
    func (rm *resourceManager) AddResource(ctx context.Context, resource Resource, blockers []Resource, run RunFunc) error {
       if resource == nil {
          return nil
       }

       if run == nil {
          return errors.Errorf("unsupported RunFunc value %v", run)
       }

       span, _ := opentracing.StartSpanFromContext(ctx, "addResource", opentracing.Tags{
          "Resource": resource,
       })
       defer span.Finish()

       nonNilBlockers := []Resource{}

       for _, blocker := range blockers {
          if blocker == nil {
             continue
          }

          nonNilBlockers = append(nonNilBlockers, blocker)

          _, ok := rm.resources[blocker]
          if !ok {
             return errors.Errorf("unknown blocker %+v", blocker)
          }
       }

       rm.lock.Lock()
       defer rm.lock.Unlock()

       _, ok := rm.resources[resource]
       if ok {
          return errors.Errorf("resource %+v already added", resource)
       }

       rm.resources[resource] = nonNilBlockers
       rm.functions[resource] = run

       return nil
    }
```

<a id="org4cb9f3a"></a>

#### Run

Casi toda la lógica importante en este paquete está en el método `Run`. Primero veamos su primera mitad:

```go
    func (rm *resourceManager) Run(ctx context.Context) error {
       span, ctx := opentracing.StartSpanFromContext(ctx, "walkGraph", opentracing.Tags{
          "Nodes.count": len(rm.resources),
       })
       defer span.Finish()

       g := errgroup.Group{}
       l := logger.Get(ctx)

       for _, no := range rm.getGraph(ctx) {
       ...
```

¡Aparece! `getGraph`, parece que va a construir este gráfico. Al entrar, descubrimos que, efectivamente, `resourceManager` es solo un constructor, el gráfico real está escondido aquí dentro, expresado como una lista de adyacencia. A primera vista, incluso parece complejo:

```go
    type node struct {
       resource Resource
       fn       RunFunc

       parent      chan error
       parentLock  *sync.Mutex
       parentCount int

       children     []chan<- error
       childrenLock []*sync.Mutex
    }

    func (no *node) Wait(ctx context.Context) error {...}
    func (no *node) Terminates(err error) (result error) {...}
    func (no *node) AddChild(child *node) {...}
```

¿Por qué `Parent` y `children` son un channel? ¿Por qué se necesitan tantos locks? Mejor observemos el proceso de construcción del gráfico:

```go
    func (rm *resourceManager) getGraph(ctx context.Context) []*node {
       span, _ := opentracing.StartSpanFromContext(ctx, "getGraph")
       defer span.Finish()

       rm.lock.Lock()
       defer rm.lock.Unlock()

       graph := make(map[Resource]*node, len(rm.resources))
       result := make([]*node, len(rm.resources))

       i := 0

       for resource, blockers := range rm.resources {
          blockerCount := len(blockers)

          node := &node{
             resource: resource,
             fn:       rm.functions[resource],

             parent:      make(chan error, blockerCount),
             parentLock:  &sync.Mutex{},
             parentCount: blockerCount,

             children:     []chan<- error{},
             childrenLock: []*sync.Mutex{},
          }
          graph[resource] = node
          result[i] = node

          i++

          blockers := blockers

          defer func() {
             for _, blocker := range blockers {
                graph[blocker].AddChild(node)
             }
          }()
       }

       return result
    }
```

¡Ah! La relación de dependencia se ha invertido. Ahora, el recurso del que se depende apunta al dependiente. Para cada recurso, se construye un `node`, y para cada dependencia del recurso, se agrega el `parent chan` de este recurso a los `children` del recurso del que depende. El gráfico final es una colección de `node`s.

Esto es inevitablemente confuso. Entonces, observemos el proceso de ejecución:

```go
    for _, no := range rm.getGraph(ctx) {
       no := no

       g.Go(func() (err error) {

          defer func() {
             err := no.Terminates(err)
             if err != nil {
                l.Error(err, "failed to terminate node when running graph")
             }
          }()

          err = no.Wait(ctx)
          if err != nil {
             return err
          }

          err = no.fn(ctx, no.resource)

          return err
       })
    }
```

Muy simple y directo. Para cada `node`, espera a que se ejecuten todos sus `node`s de entrada (dependencias), luego ejecuta su propia `runFunc`, y propaga cualquier error potencial a todos los `node`s posteriores en la cadena que esperan ejecutarse, abortándolos anticipadamente.

Aquí no entiendo muy bien por qué no usar una ordenación topológica para resolver este problema clásico bien definido.

<a id="orgdcd001c"></a>

#### Inicialización

La inicialización del `GraphManager` utiliza una variable global *thread local*. Después de la inicialización, se lanza al aire (al `ctx`), una forma común de inyección de dependencias en varios frameworks de API.

```go
    func (c *Controller) NewContext(req ctrl.Request) context.Context {
            ctx := context.TODO()
            application.SetName(&ctx, c.GetName())
            application.SetVersion(&ctx, c.GetVersion())
            application.SetGitCommit(&ctx, c.GetGitCommit())
            ctx = sgraph.WithGraph(ctx)

            logger.Set(&ctx, c.Log.WithValues("request", req))

            return ctx
    }

    func WithGraph(ctx context.Context) context.Context {
            return context.WithValue(ctx, &graphKey, graph.NewResourceManager())
    }

    func Get(ctx context.Context) graph.Manager {
            g := ctx.Value(&graphKey)
            if g == nil {
                    return nil
            }

            return g.(graph.Manager)
    }
```

<a id="org73ef8b0"></a>

### Llevando la Reutilización de Código al Extremo: Controller

Aparte del HarborCluster Controller que eliminamos antes, todos los Controllers de componentes en Harbor Operator componen directamente este mismo Controller, extrayendo la lógica común de todos los Controllers, usando el mismo `Run`, el mismo `Reconcile`. ¿Cómo se logra?

-   ¿Qué lógica se extrajo?
-   ¿Cómo se manejan las diferencias?
-   ¿Qué se sacrificó?

<a id="orgbd581d5"></a>

#### Estructura de Datos

La implementación de la interfaz por parte del Controller, aparte de implementar `Reconciler`, no tiene nada interesante; entonces, primero veamos la definición de la estructura de datos del Controller:

```go
    type ResourceManager interface {
            AddResources(context.Context, resources.Resource) error
            NewEmpty(context.Context) resources.Resource
    }

    type Controller struct {
            client.Client

            BaseController controllers.Controller
            Version        string
            GitCommit      string

            ConfigStore *configstore.Store
            rm          ResourceManager
            Log         logr.Logger
            Scheme      *runtime.Scheme
    }
```

Las cosas que no conocemos bien son solo `BaseController` y `rm`.

Al revisar, `BaseController` es básicamente un identificador, utilizado para identificar la información del propio Controller y alguna información de etiquetas. Entonces, las diferencias lógicas entre los diferentes Controllers solo pueden existir dentro de `ResourceManager`. `ResourceManager` parece también una interfaz simple, y los que implementan `ResourceManager` son, efectivamente, los Controllers concretos; estudiaremos ejemplos específicos de `ResourceManager` al final.

```go
    type Controller int

    const (
       Core                Controller = iota // core
       JobService                            // jobservice
       Portal                                // portal
       Registry                              // registry
       RegistryController                    // registryctl
       ChartMuseum                           // chartmuseum
       Exporter                              // exporter
       NotaryServer                          // notaryserver
       NotarySigner                          // notarysigner
       Trivy                                 // trivy
       Harbor                                // harbor
       HarborCluster                         // harborcluster
       HarborConfiguration                   // harborconfiguration
    )

    func (c Controller) GetFQDN() string {
       return fmt.Sprintf("%s.goharbor.io", strings.ToLower(c.String()))
    }

    func (c Controller) Label(suffix ...string) string {
       return c.LabelWithPrefix("", suffix...)
    }

    func (c Controller) LabelWithPrefix(prefix string, suffix ...string) string {
       var suffixString string
       if len(suffix) > 0 {
          suffixString = "/" + strings.Join(suffix, "-")
       }

       if prefix != "" {
          prefix = "." + prefix
       }

       return fmt.Sprintf("%s%s%s", prefix, c.GetFQDN(), suffixString)
    }
```

<a id="orgc9dc9b0"></a>

#### Lógica de Reconcile

Entonces, ¿cómo logra el Controller usar solo un `Reconcile` para reconciliar toda la familia de once CRDs de Harbor junto con tantos recursos del sistema?

Según la información que ya conocemos, debería ser que para cada CRD se utiliza un `ResourceManager` para definir los diversos recursos que este CRD necesita crear y reconciliar, y estos recursos definen sus dependencias a través del gráfico de dependencias, y para cada CRD se escribe una `RunFunc` concreta para completar la reconciliación final.

```go
    func (c *Controller) Reconcile(req ctrl.Request) (ctrl.Result, error) {
       ctx := c.NewContext(req)

       span, ctx := opentracing.StartSpanFromContext(ctx, "reconcile", opentracing.Tags{
          "resource.namespace": req.Namespace,
          "resource.name":      req.Name,
          "controller":         c.GetName(),
       })
       defer span.Finish()

       l := logger.Get(ctx)

       // Obtener la instancia

       object := c.rm.NewEmpty(ctx)

       ok, err := c.GetAndFilter(ctx, req.NamespacedName, object)
       if err != nil {
          // Error al leer el objeto
          return ctrl.Result{}, err
       }

       if !ok {
          // Objeto de solicitud no encontrado, podría haber sido eliminado después de la solicitud de reconciliación.
          // Los objetos propiedad se recolectan automáticamente como basura. Para lógica de limpieza adicional, usar finalizers.
          l.Info("El objeto no existe")

          return ctrl.Result{}, nil
       }

       if !object.GetDeletionTimestamp().IsZero() {
          logger.Get(ctx).Info("El objeto se está eliminando")

          return ctrl.Result{}, nil
       }

       owner.Set(&ctx, object)

       if err := c.Run(ctx, object); err != nil {
          return c.HandleError(ctx, object, err)
       }

       return ctrl.Result{}, c.SetSuccessStatus(ctx, object)
    }
```

Lógica de `Reconcile` clásica. Parece que la magia está en `c.Run`:

```go
    func (c *Controller) Run(ctx context.Context, owner resources.Resource) error {
       span, ctx := opentracing.StartSpanFromContext(ctx, "run")
       defer span.Finish()

       logger.Get(ctx).V(1).Info("Reconciliando objeto")

       if err := c.rm.AddResources(ctx, owner); err != nil {
          return errors.Wrap(err, "cannot add resources")
       }

       if err := c.PrepareStatus(ctx, owner); err != nil {
          return errors.Wrap(err, "cannot prepare owner status")
       }

       return sgraph.Get(ctx).Run(ctx)
    }
```

¡Efectivamente, `rm` aparece aquí! Después de agregar los recursos necesarios para un Controller concreto, `PrepareStatus` parece ser uno unificado. Combinando el código fuente de este método y la definición de CRD, se descubre que asume que todos los componentes tienen el mismo `Status`. Otro diseño que sacrifica flexibilidad por simplicidad y consistencia. De hecho, este diseño sigue las normas promovidas por K8s, y se puede usar como referencia al diseñar CRDs. No lo detallaremos más aquí.

Última línea: `sgraph.Get(ctx).Run(ctx)`, ¡llega el gráfico de dependencias! Se toma del aire (del `ctx`). Hasta aquí, esta parte de la lógica se cierra. El problema restante es: ¿cómo construyen los Controllers concretos que implementan `ResourceManager` el gráfico de dependencias y construyen su propia `RunFunc`?

<a id="orgb7ed9a6"></a>

### Código como Configuración: ResourceManager

El último paso es casi natural.

Todos los Controllers que implementan `ResourceManager` deberían tener un estatus igual. Usemos el ejemplo de `harbor core` para investigar.

Aparte de las partes utilizadas para generar recursos K8s concretos, debemos centrarnos en las partes que implementan la interfaz `ResourceManager`.

```go
    func (r *Reconciler) NewEmpty(_ context.Context) resources.Resource {
       return &goharborv1.Core{}
    }

    func (r *Reconciler) AddResources(ctx context.Context, resource resources.Resource) error {
       core, ok := resource.(*goharborv1.Core)
       if !ok {
          return serrors.UnrecoverrableError(errors.Errorf("%+v", resource), serrors.OperatorReason, "unable to add resource")
       }

       service, err := r.GetService(ctx, core)
       if err != nil {
          return errors.Wrap(err, "cannot get service")
       }

       _, err = r.Controller.AddServiceToManage(ctx, service)
       if err != nil {
          return errors.Wrapf(err, "cannot add service %s", service.GetName())
       }

       configMap, err := r.GetConfigMap(ctx, core)
       if err != nil {
          return errors.Wrap(err, "cannot get configMap")
       }

       configMapResource, err := r.Controller.AddConfigMapToManage(ctx, configMap)
       if err != nil {
          return errors.Wrapf(err, "cannot add configMap %s", configMap.GetName())
       }

       secret, err := r.GetSecret(ctx, core)
       if err != nil {
          return errors.Wrap(err, "cannot get secret")
       }

       secretResource, err := r.Controller.AddSecretToManage(ctx, secret)
       if err != nil {
          return errors.Wrapf(err, "cannot add secret %s", secret.GetName())
       }

       deployment, err := r.GetDeployment(ctx, core)
       if err != nil {
          return errors.Wrap(err, "cannot get deployment")
       }

       _, err = r.Controller.AddDeploymentToManage(ctx, deployment, configMapResource, secretResource)
       if err != nil {
          return errors.Wrapf(err, "cannot add deployment %s", deployment.GetName())
       }

       err = r.AddNetworkPolicies(ctx, core)

       return errors.Wrap(err, "network policies")
    }
```

¡Vaya! Aparte de que los recursos deben agregarse en orden, esto equivale a un diseño declarativo; si quisieras agregar un nuevo Controller, sería extremadamente fácil: solo necesitas saber qué recursos debe reconciliar este Controller, no es necesario gestionar la lógica de `Reconcile` concreta.

Espera, ¿no necesitamos implementar `RunFunc` nosotros mismos? Este es el último problema de nuestra lectura de código fuente: ver cómo Harbor Operator generaliza y abstrae el proceso de `Reconcile` de cualquier `Resource` en una única función.

Entonces, por ejemplo, aquí hay un `r.Controller.AddServiceToManage(ctx, service)`.

```go
    func (c *Controller) AddServiceToManage(ctx context.Context, resource *corev1.Service, dependencies ...graph.Resource) (graph.Resource, error) {
       if resource == nil {
          return nil, nil
       }

       mutate, err := c.GlobalMutateFn(ctx)
       if err != nil {
          return nil, err
       }

       res := &Resource{
          mutable:   mutate,
          checkable: statuscheck.True,
          resource:  resource,
       }

       g := sgraph.Get(ctx)
       if g == nil {
          return nil, errors.Errorf("no graph in current context")
       }

       return res, g.AddResource(ctx, res, dependencies, c.ProcessFunc(ctx, resource, dependencies...))
    }
```

Hay dos puntos interesantes:

1.  La definición de `Resource`, que no habíamos visto antes.
2.  Aparece la llamada a `Graph AddResource`. La construcción de `RunFunc` que nos interesa está aquí, la estudiaremos más adelante.

Primero veamos este `Resource`. Recuerda que en `Graph`, como no le importa qué es exactamente un `Resource`, allí se le dio un `interface{}`. Aquí, para `Resource` sí importa, por lo que es más importante:

```go
    package controller

    type Resource struct {
            mutable   resources.Mutable
            checkable resources.Checkable
            resource  resources.Resource
    }

    package resources

    type Mutable func(context.Context, runtime.Object) error

    func (m *Mutable) AppendMutation(mutate Mutable) {
       old := *m
       *m = func(ctx context.Context, resource runtime.Object) error {
          if err := old(ctx, resource); err != nil {
             return err
          }

          return mutate(ctx, resource)
       }
    }

    func (m *Mutable) PrependMutation(mutate Mutable) {
       old := *m
       *m = func(ctx context.Context, resource runtime.Object) error {
          if err := mutate(ctx, resource); err != nil {
             return err
          }

          return old(ctx, resource)
       }
    }

    type Resource interface {
       runtime.Object
       metav1.Object
    }

    type Checkable func(context.Context, runtime.Object) (bool, error)
```

Se puede ver que, en esencia, es una encapsulación adicional que Harbor Operator hace sobre un recurso genérico de K