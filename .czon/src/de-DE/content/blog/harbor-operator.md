---
"title": "Quellcode-Lektüre: Analyse des Designs und der Implementierung von Harbor-Operator"
"summary": "Dieser Artikel analysiert detailliert das Design des Harbor-Operator-Quellcodes, mit Schwerpunkt darauf, wie er Abhängigkeiten zwischen Ressourcen mithilfe eines Abhängigkeitsgraphen (Dependency Graph) löst, Code-Wiederverwendung für mehrere CRDs durch einen einheitlichen Controller erreicht und Konfiguration durch ResourceManager als Code umsetzt. Der Artikel stellt fest, dass Harbor-Operator auf der Kubernetes-Plattform, in der Programmiersprache Golang, das Prinzip 'Worse is Better' praktiziert, um ein einfaches Design zu erreichen, wobei Flexibilität für Konsistenz und Wartbarkeit geopfert wird. Durch die Analyse von Schlüsselmodulen wie HarborCluster, Dependency Graph, Controller und ResourceManager offenbart der Autor die herausragende Designphilosophie und Implementierungsdetails des Projekts."
"tags":
  - "Harbor-Operator"
  - "Kubernetes"
  - "Quellcode-Analyse"
  - "Design-Muster"
  - "Abhängigkeitsgraph"
  - "Controller"
  - "Golang"
"date": "2022-01-30"
---

<!--more-->

<a id="orgdafefdb"></a>

## Vorbereitung

<a id="org081213e"></a>

### Warum Harbor-Operator?

<a id="org55a74c9"></a>

#### Worse is Better?

Was ist gute Software?

In einem berühmten Artikel aus den späten 80er Jahren, *The Rise of Worse is Better*, erwähnt der Autor, dass gutes Softwaredesign die vier Eigenschaften *Einfachheit*, *Korrektheit*, *Konsistenz* und *Vollständigkeit* berücksichtigen sollte.

Der Autor beschreibt zwei Designphilosophien, die wir vorläufig *the right thing* und *worse is better* nennen (wobei anzumerken ist, dass letzterer Name nicht abwertend gemeint ist); beide Philosophien drehen sich um die genannten Eigenschaften, unterscheiden sich jedoch in der Priorisierung.

---

<a id="orgbebeeee"></a>

##### The right thing

-   **Einfachheit** - Das Design muss einfach und verständlich sein. Einfache Schnittstellen sind wichtiger als eine einfache Implementierung.
-   **Korrektheit** - Das Design muss korrekt sein. Hier darf es keine Kompromisse geben.
-   **Konsistenz** - Konsistenz ist genauso wichtig wie Korrektheit. Daher können Einfachheit und Vollständigkeit etwas zurückstehen.
-   **Vollständigkeit** - Das Design muss eine Vielzahl möglicher Szenarien berücksichtigen. Vollständigkeit darf nicht übermäßig zugunsten der Einfachheit geopfert werden.

<a id="org948c614"></a>

##### Worse is better

-   **Einfachheit** - Das Design muss einfach und verständlich sein. Eine einfache Implementierung ist wichtiger als einfache Schnittstellen. Einfachheit ist die wichtigste Eigenschaft.
-   **Korrektheit** - Das Design muss korrekt sein, aber Einfachheit ist noch ein wenig wichtiger als Korrektheit.
-   **Konsistenz** - Das Design sollte nicht zu inkonsistent sein. Konsistenz kann zugunsten der Einfachheit geopfert werden. Wenn die Einfachheit gewahrt bleibt, kann Konsistenz auch für Vollständigkeit geopfert werden.
-   **Vollständigkeit** - Das Design muss eine Vielzahl möglicher Szenarien berücksichtigen. Vollständigkeit kann jederzeit geopfert werden, um die Einfachheit des Designs zu gewährleisten.

---

Anschließend führt der Autor viele Beispiele für beide Philosophien an, um zu argumentieren, warum *worse-is-better* damals die Softwarebranche eroberte.

Diese beiden Philosophien sind nicht besser oder schlechter. Auch heute finden wir sie in unserer Umgebung, und die Realität bewegt sich oft zwischen ihnen. Wir möchten ein exzellentes, ästhetisch wertvolles Design schaffen, müssen aber auch Kosten und menschliche Faktoren berücksichtigen. Letztendlich müssen wir funktionierende Software von ausreichender Qualität liefern, um reale Probleme zu lösen, wobei die Kosten für Entwicklung und Wartung der Software auf keinen Fall den Wert des Problems selbst übersteigen dürfen.

<a id="org514ce0b"></a>

#### Golang - die Sprache

Golang ist fast ein Paradebeispiel für die *worse is better*-Philosophie:

-   Es bündelt die jahrelange praktische Erfahrung von Google mit C++.
-   Es ist so einfach, ohne komplexe Features. Daher gibt es im Grunde nur eine Art von Baustein, um ein Problem zu lösen, was bedeutet:
    -   Man muss sich kaum mit der Sprache selbst beschäftigen, um sie zu beherrschen.
    -   Der Code ist sehr gut lesbar.
-   Schnelle Kompilierung, sogar auf Kosten von Generics (zur damaligen Zeit).
-   Parallele Aufgaben können sehr einfach über Goroutinen ausgeführt werden.
-   Das Sprachfeature der Ausnahmebehandlung (Exceptions) wurde fast vollständig aufgegeben, was eine explizite Fehlerprüfung und -behandlung erzwingt.
-   Einmal kompiliert, überall ausführbar.

<a id="org2432232"></a>

#### Kubernetes - die Plattform

Kubernetes ist allen bekannt, daher werde ich nicht den Besserwisser spielen und es in einem Satz zusammenfassen: Es bietet ein konzeptionell sehr einfaches API-Design, ergänzt durch einen Regelmechanismus aus der Kybernetik, der die automatisierte Bereitstellung, Skalierung und den Betrieb containerisierter Software ermöglicht.

K8s erlaubt Entwicklern durch die Offenlegung dieser API-Spezifikation und des Regelmechanismus, seine Fähigkeiten zu erweitern. Entwickler können so das *Operator Pattern* implementieren: Das Wissen über Softwarekonfiguration, Bereitstellung (Day-1) sowie Betrieb, Backup, Failover (Day-2) wird in Software geschrieben, die die Software bedient. Diese komplexen und fehleranfälligen Operationen werden automatisiert, was die Zuverlässigkeit erhöht und die Kosten senkt.

---

Der Grund für die Wahl von Harbor Operator ist also sein exzellentes Design. Auf einer hervorragenden Plattform und mit einfachen Sprachfeatures, ohne übermäßige Tricks, realisiert es durch einige wenige, entscheidende, den SOLID-Designprinzipien entsprechende Entwürfe ein pragmatisches und ästhetisch wertvolles Softwaresystem. Es kann als Praktizierender der *the right thing*-Philosophie betrachtet werden.

Der Code des Autors hat fast keine Kommentare, ist aber außergewöhnlich gut lesbar, was auch dem gesamten Systemdesign zu verdanken ist.

<a id="org6815286"></a>

## Ziel

Die Abstraktion und Vereinfachung von Problemen geht zwangsläufig mit dem Verlust von Flexibilität einher. Harbor Operator verzichtet vollständig auf Flexibilität, um maximale kognitive Entlastung zu bringen, sodass die Entwicklung eines Operators eher der Deklaration einer Softwarekonfiguration gleicht.

Das manuelle Schreiben eines Operators mit client-go ist dank des Fehlens von Generics in Golang eine Qual. Das Projekt wäre mit einer riesigen Menge an Boilerplate-Code (Template-Code) übersät. Ich glaube, selbst wenn jemand wirklich mit client-go von Hand schreiben würde, würde niemand wirklich bei Null anfangen.

Daher entstand kubebuilder. Es abstrahiert die Erstellung des Kubernetes-Clients, das Abhören von Anfragen des Kubernetes API-Servers und deren Einreihung in Warteschlangen in eine gemeinsame Bibliothek (controller runtime) und gemeinsame Tools (controller tools). Es kann für Entwickler Gerüstcode generieren, sodass sie sich auf die Geschäftslogik zur Verarbeitung von Änderungsanfragen an API-Objekte konzentrieren können.

Kubebuilder bewahrt noch einen Hauch von Freiheit für die Vielfalt der Geschäftslogik. Harbor Operator strebt darauf aufbauend weiter nach Perfektion, opfert Flexibilität vollständig, um konzeptionelle Konsistenz und Einfachheit zu erreichen – und die Geschäftsanforderungen, denen es gegenübersteht, eignen sich tatsächlich sehr gut für diesen Ansatz.

Daher ist unser Hauptziel in dieser Quellcode-Lektüre, von Harbor Operator zu lernen:

-   Wie es Day-1-Operationen durchführt.
-   Wie es die Redundanz im Operator-Code weiter reduziert und denselben Controller-Code verwendet, um Controller für elf CRDs auf verschiedenen Ebenen zu implementieren.
-   Wie es DAGs nutzt, um Abhängigkeiten zwischen Ressourcen zu lösen (der Autor scheint dafür sogar ein Patent angemeldet zu haben).

Darüber hinaus werden wir uns nicht schwerpunktmäßig mit Folgendem befassen:

-   Day-2-Operationen in Harbor Operator (in der aktuellen Version ist dieser Teil noch nicht stabil).
-   Dem Quellcode und den Funktionen von Harbor selbst.

<a id="org345a335"></a>

## Quellcode-Lektüre

<a id="org1198d5f"></a>

### Statische Struktur

<a id="orgb32de77"></a>

#### Verzeichnisstruktur

Hier sind nur die Verzeichnisse aufgelistet.

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

#### Wichtige Schnittstellen

![img](https://0xc1.space/images/2022/01/30/harbor-operator-class.svg)

<a id="org290c6c2"></a>

#### Systemarchitektur

Bis Version v1.0.1 ist Harbor Operator hauptsächlich für die Day-1-Operationen des Harbor-Systems verantwortlich.
![img](https://0xc1.space/images/2022/01/30/harbor-operator-arch.png)

<a id="org41c8944"></a>

### Das Wesentliche im Blick: HarborCluster

Lassen Sie uns zunächst einige weniger kritische Teile ausblenden: Die CRD `HarborCluster` und die Implementierung ihres Controllers.

Warum ist sie besonders? Betrachten Sie zunächst ihre Position in der Systemarchitektur: Sie befindet sich auf der obersten Ebene und verwaltet das Harbor-System selbst sowie alle davon abhängigen zustandsbehafteten Dienste. Dies muss aus der Projektgeschichte und ihrer besonderen Stellung in der Systemarchitektur erklärt werden.

Aus Sicht der Systemarchitektur weist die `HarborCluster`-CRD in ihrer Definition große Ähnlichkeit mit der `Harbor`-CRD auf, der Code enthält viel Redundanz und sieht nicht sehr elegant aus. Das liegt daran, dass sie als die oberste (äußerste) CRD im gesamten System direkt dem Benutzer gegenübersteht. Sie muss dem Benutzer alle notwendigen Konfigurationsoptionen für die Bereitstellung von Harbor zur Verfügung stellen. Da Harbor selbst ein zustandsloser Dienst ist, erfordert eine vollständige Bereitstellung außerdem, dass die `HarborCluster`-CRD alle abhängigen zustandsbehafteten Dienste verwaltet, einschließlich Postgres, Minio und Redis.

Die notwendigen Informationen für das Harbor-System selbst sind bereits in der `Harbor`-CRD definiert. Daher besteht der redundante Teil in der `HarborCluster`-CRD darin, diese Informationen vollständig und korrekt an die `Harbor`-CRD weiterzugeben. Darüber hinaus muss die `HarborCluster`-CRD die CRDs der zustandsbehafteten Dienste verwalten, die außerhalb ihrer eigenen Zuständigkeitsgrenzen liegen, und kann daher die Controller-Logik aus Harbor und allen seinen Unterkomponenten nicht vollständig wiederverwenden.

Aus historischer Sicht war Harbor Operator ursprünglich ein privates Projekt von OVH Cloud und wurde später der goharbor-Community gespendet. Betrachtet man den Git-History, wird der Grund für die große Inkonsistenz zwischen der CRD-Definition von `HarborCluster` und ihrer Controller-Implementierung im Vergleich zu anderen Controllern im System deutlich: Sie ist ein späterer Community-Beitrag, und bei der ursprünglichen Designphase von Harbor Operator wurden die von ihr zu erfüllenden Funktionen nicht berücksichtigt.

Die Implementierung des `HarborCluster`-Controllers selbst unterscheidet sich nicht wesentlich von den meisten mit Controller-Runtime implementierten Controllern, die wir normalerweise sehen, und wird daher nicht detailliert untersucht.

---

HarborCluster Controller

![img](https://0xc1.space/images/2022/01/30/harbor-cluster-controller.png)

---

Harbor Core Controller

![img](https://0xc1.space/images/2022/01/30/harbor-core-controller.png)

---

<a id="orgd9c3526"></a>

### Abhängigkeiten zwischen Ressourcen lösen: Dependency Graph

Der Abhängigkeitsgraph ist ein relativ unabhängiges Modul im gesamten Projekt, aber es fungiert tatsächlich als Ausführungs-Engine für alle Controller im Harbor Operator. Im Wesentlichen wird beobachtet, dass zwischen verschiedenen Ressourcentypen in Kubernetes gegenseitige Abhängigkeiten bestehen. Die Bereitstellung und Regelung einiger Ressourcen hängt von der Bereitstellung und Regelung anderer Ressourcen ab, z. B. kann ein Deployment von einem ConfigMap abhängen. Letztendlich bilden diese Abhängigkeiten einen Abhängigkeitsgraphen, der eigentlich ein DAG (Directed Acyclic Graph) sein sollte. Hier benötigen wir die folgende Schnittstellendefinition:

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

-   `Resource` definiert eine abstrakte Ressource. Da sich dieses Modul nicht dafür interessiert, was eine Ressource genau darstellt, und gleichzeitig maximale Flexibilität innerhalb der Grenzen der Ausdruckskraft der Sprache bewahren möchte, wird der Top-Typ `interface{}` verwendet.
-   `RunFunc` ist dafür verantwortlich, die konkrete Operation für eine `Resource` durchzuführen. Hier steht `RunFunc` vor einem Typsicherheitsproblem: `interface{}` bedeutet, dass der Compiler nichts über den Typ weiß und nichts damit anfangen kann. Aber `RunFunc` muss mit diesem Typ, der alles sein kann, etwas anfangen. Daher gehen wir davon aus, dass es einen Type-Cast durchführen muss. Wenn jedes `RunFunc` für jede Ressource manuell in einen konkreten Typ umgewandelt werden müsste, wäre das sehr langweilig und ekelhaft. Später werden wir sehen, wie Harbor Operator diese Drecksarbeit an einer zentralen Stelle erledigt.
-   `Manager` hat nur zwei Methoden: Ressource hinzufügen und diesen Graphen ausführen. Beide müssen untersucht werden.
-   Die Datenstruktur `resourceManager`, die `Manager` implementiert, ist ebenfalls einfach definiert:
    -   Eine Map `resource -> blockers`
    -   Eine Map `resource -> runFunc`
    -   Ein `lock` zur Behandlung der Nebenläufigkeit von Map-Operationen. Hier können wir sehen, dass der Autor Datenstrukturen wie `Sync.Map`, die nebenläufigkeitssicher, aber nicht typsicher sind, nicht mag. Das macht noch neugieriger, wie der Autor die vielen (11 Komponenten) `RunFunc`s handhabt.

Da es sich um einen Graphen handelt, muss es eine Datenstruktur für den Graphen und eine Factory-Methode zum Erstellen dieses Graphen geben. Die Datenstruktur von `resourceManager` wirkt etwas starr, es ist unklar, ob dies der eigentliche Graph ist.

<a id="org75cbb07"></a>

#### AddResource

Anhand der Signatur ist zu erkennen, dass `AddResource` die hinzuzufügende Ressource selbst, alle ihre Abhängigkeiten und die entsprechende `runFunc` hinzufügt. Wichtig ist, dass zuerst Ressourcen hinzugefügt werden müssen, die von keiner anderen Ressource abhängen (d. h. mit Ausgangsgrad 0).

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

Fast die gesamte wichtige Logik in diesem Paket befindet sich in der Methode `Run`. Sehen wir uns zuerst die erste Hälfte an:

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

Da ist es! `getGraph`. Es sieht so aus, als ob der Graph erstellt werden soll. Geht man hinein, stellt man fest, dass `resourceManager` tatsächlich nur ein Builder ist. Der eigentliche Graph ist hier versteckt, ausgedrückt als Adjazenzliste. Auf den ersten Blick sieht es sogar komplex aus:

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

Warum sind `parent` und `children` ein Channel? Warum so viele Locks? Schauen wir uns den Erstellungsprozess des Graphen an:

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

Die Abhängigkeitsbeziehung wurde also umgedreht. Jetzt zeigt die abhängige Ressource auf die Ressource, von der sie abhängt. Für jede Ressource wird ein `node` konstruiert. Gleichzeitig wird für jede Abhängigkeit dieser Ressource der `parent`-Channel dieser Ressource zu den `children` der abhängigen Ressource hinzugefügt. Der endgültige Graph ist eine Sammlung von `node`s.

Das ist sicherlich verwirrend. Schauen wir uns also den Ausführungsprozess an:

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

Sehr einfache und direkte Vorgehensweise: Für jeden `node` wird gewartet, bis seine eingehenden `node`s ausgeführt sind, dann wird seine eigene `runFunc` ausgeführt, und potenzielle Fehler werden an alle nachfolgenden `node`s in der Kette weitergegeben, um sie vorzeitig abzubrechen.

Ich verstehe hier nicht ganz, warum nicht eine topologische Sortierung verwendet wird, um dieses klar definierte klassische Problem zu lösen.

<a id="orgdcd001c"></a>

#### Initialisierung

Die Initialisierung des `GraphManager` verwendet eine thread-lokale globale Variable. Nach der Initialisierung wird sie in den Äther (den `ctx`) geworfen, eine gängige Methode der Abhängigkeitsinjektion in verschiedenen API-Frameworks.

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

### Code-Wiederverwendung maximieren: Controller

Abgesehen vom zuvor ausgeklammerten `HarborCluster`-Controller kombinieren alle Komponenten-Controller in Harbor Operator direkt denselben Controller. Sie extrahieren die gemeinsame Logik aller Controller und verwenden dasselbe `Run`, dieselbe `Reconcile`. Wie wird das gemacht?

-   Welche Logik wurde extrahiert?
-   Wie werden Unterschiede behandelt?
-   Was wurde geopfert?

<a id="orgbd581d5"></a>

#### Datenstruktur

Die Implementierung der Schnittstelle durch den `Controller` ist, abgesehen von der Implementierung von `Reconciler`, nicht besonders interessant. Schauen wir uns zunächst die Definition der Datenstruktur des `Controller` an:

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

Die Dinge, die wir nicht so gut kennen, sind nur `BaseController` und `rm`.

`BaseController` ist im Grunde ein Identifikator, der Informationen über den Controller selbst und einige Label-Informationen enthält. Die unterschiedlichen logischen Unterschiede zwischen verschiedenen Controllern können also nur in `ResourceManager` liegen. `ResourceManager` scheint auch eine sehr einfache Schnittstelle zu sein, und tatsächlich wird sie von den jeweiligen konkreten Controllern implementiert. Wir werden uns am Ende konkrete Beispiele für `ResourceManager` ansehen.

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

#### Reconcile-Logik

Wie schafft es der `Controller` also, mit nur einem `Reconcile` die gesamte Familie von elf Harbor-CRDs zusammen mit so vielen Systemressourcen zu reconciliieren?

Basierend auf den bereits bekannten Informationen sollte für jede CRD ein `ResourceManager` verwendet werden, um die verschiedenen Ressourcen zu definieren, die diese CRD erstellen und reconciliieren muss. Diese Ressourcen definieren ihre Abhängigkeiten über den Abhängigkeitsgraphen, und für jede CRD wird eine konkrete `RunFunc` geschrieben, um die endgültige Reconciliierung durchzuführen.

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

       // Fetch the instance

       object := c.rm.NewEmpty(ctx)

       ok, err := c.GetAndFilter(ctx, req.NamespacedName, object)
       if err != nil {
          // Error reading the object
          return ctrl.Result{}, err
       }

       if !ok {
          // Request object not found, could have been deleted after reconcile request.
          // Owned objects are automatically garbage collected. For additional cleanup logic use finalizers.
          l.Info("Object does not exists")

          return ctrl.Result{}, nil
       }

       if !object.GetDeletionTimestamp().IsZero() {
          logger.Get(ctx).Info("Object is being deleted")

          return ctrl.Result{}, nil
       }

       owner.Set(&ctx, object)

       if err := c.Run(ctx, object); err != nil {
          return c.HandleError(ctx, object, err)
       }

       return ctrl.Result{}, c.SetSuccessStatus(ctx, object)
    }
```

Sehr klassische Reconcile-Logik. Es scheint, dass die ganze Magie in `c.Run` steckt:

```go
    func (c *Controller) Run(ctx context.Context, owner resources.Resource) error {
       span, ctx := opentracing.StartSpanFromContext(ctx, "run")
       defer span.Finish()

       logger.Get(ctx).V(1).Info("Reconciling object")

       if err := c.rm.AddResources(ctx, owner); err != nil {
          return errors.Wrap(err, "cannot add resources")
       }

       if err := c.PrepareStatus(ctx, owner); err != nil {
          return errors.Wrap(err, "cannot prepare owner status")
       }

       return sgraph.Get(ctx).Run(ctx)
    }
```

Tatsächlich taucht `rm` hier auf. Nachdem die für einen bestimmten Controller benötigten Ressourcen hinzugefügt wurden, scheint `PrepareStatus` ein einheitlicher Schritt zu sein. Eine Kombination aus dem Quellcode dieser Methode und der CRD-Definition zeigt, dass davon ausgegangen wird, dass alle Komponenten denselben Status haben – wieder ein Design, das Flexibilität für Einfachheit und Konsistenz opfert. Tatsächlich folgt dieses Design der von K8s empfohlenen Norm und kann beim Entwurf von CRDs als Referenz dienen. Hier wird nicht weiter darauf eingegangen.

Letzte Zeile: `sgraph.Get(ctx).Run(ctx)` – der Abhängigkeitsgraph kommt, aus dem Äther (`ctx`) geholt. Damit schließt sich der Kreis für diesen Teil der Logik. Die verbleibende Frage ist: Wie konstruieren die konkreten Controller, die `ResourceManager` implementieren, den Abhängigkeitsgraphen und ihre eigene `RunFunc`?

<a id="orgb7ed9a6"></a>

### Konfiguration als Code: ResourceManager

Der letzte Schritt ergibt sich fast von selbst.

Alle Controller, die `ResourceManager` implementieren, sollten gleichberechtigt sein. Lassen Sie uns anhand des Beispiels `harbor core` einen Blick darauf werfen.

Abgesehen von den Teilen, die zur Erzeugung konkreter K8s-Ressourcen dienen, sollten wir uns auf die Teile konzentrieren, die die `ResourceManager`-Schnittstelle implementieren.

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

Meine Güte, abgesehen davon, dass Ressourcen in einer bestimmten Reihenfolge hinzugefügt werden müssen, ist das im Grunde ein deklaratives Design. Wenn man einen neuen Controller hinzufügen möchte, ist es kinderleicht: Man muss nur wissen, welche Ressourcen der Controller reconciliieren soll, und muss sich nicht um die konkrete Reconcile-Logik kümmern.

Moment, müssen wir die `RunFunc` nicht selbst implementieren? Dies ist die letzte Frage unserer Quellcode-Lektüre. Lassen Sie uns sehen, wie Harbor Operator den Reconcile-Prozess einer beliebigen `Resource` verallgemeinert und zu einer einzigen Funktion abstrahiert.

Nehmen wir zum Beispiel `r.Controller.AddServiceToManage(ctx, service)`.

```go
    func (c *Controller) AddServiceToManage(ctx context.Context, resource *corev1.Service, dependencies ...graph.Resource) (graph.Resource, error) {
       if resource == nil {
          return nil, nil
       }