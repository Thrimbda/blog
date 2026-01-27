---
"title": "Quellcode-Lektüre: Harbor-Operator"
"summary": "Dieser Artikel ist eine technische Analyse des Quellcodes des Harbor-Operators. Der Autor beginnt mit den Designprinzipien (wie 'Worse is Better') und stellt die Eigenschaften des Harbor-Operators vor, der in Golang für die Kubernetes-Plattform implementiert ist. Der Artikel analysiert schwerpunktmäßig die Kernarchitektur, einschließlich der Lösung von Abhängigkeiten zwischen Ressourcen durch einen Dependency Graph und der Implementierung der Reconcile-Logik für elf verschiedene CRDs durch einen einheitlichen Controller, was die Code-Wiederverwendung erheblich steigert. Der Artikel erläutert auch detailliert das Design wichtiger Komponenten wie ResourceManager und ProcessFunc und zeigt die hervorragenden Praktiken des Harbor-Operators im Streben nach Einfachheit, Konsistenz und Wartbarkeit."
"tags":
  - "Operator"
  - "Kubernetes"
  - "Golang"
  - "Quellcode-Analyse"
  - "Harbor"
  - "Entwurfsmuster"
  - "Abhängigkeitsgraph"
  - "Controller"
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

Der Autor erwähnt zwei Designphilosophien, die vorläufig *the right thing* und *worse is better* genannt werden (es sei darauf hingewiesen, dass diese Benennung nicht abwertend gemeint ist); beide Philosophien drehen sich um die genannten Eigenschaften, unterscheiden sich jedoch in der Priorisierung dieser Eigenschaften.

---

<a id="orgbebeeee"></a>

##### The right thing

-   **Einfachheit** - Das Design muss einfach und leicht verständlich sein. Einfache Schnittstellen sind wichtiger als eine einfache Implementierung.
-   **Korrektheit** - Das Design muss korrekt sein. Hier darf es keine Kompromisse geben.
-   **Konsistenz** - Konsistenz ist genauso wichtig wie Korrektheit. Daher können Einfachheit und Vollständigkeit etwas zurückstehen.
-   **Vollständigkeit** - Das Design muss eine Vielzahl möglicher Szenarien berücksichtigen. Vollständigkeit darf nicht übermäßig zugunsten der Einfachheit geopfert werden.

<a id="org948c614"></a>

##### Worse is better

-   **Einfachheit** - Das Design muss einfach und leicht verständlich sein. Eine einfache Implementierung ist wichtiger als einfache Schnittstellen. Einfachheit ist die wichtigste Eigenschaft.
-   **Korrektheit** - Das Design muss korrekt sein, allerdings ist Einfachheit ein wenig wichtiger als Korrektheit.
-   **Konsistenz** - Das Design darf nicht zu inkonsistent sein. Konsistenz kann zugunsten der Einfachheit geopfert werden. Um die Einfachheit zu wahren, kann Konsistenz auch für die Vollständigkeit geopfert werden.
-   **Vollständigkeit** - Das Design muss eine Vielzahl möglicher Szenarien berücksichtigen. Vollständigkeit kann jederzeit geopfert werden, um die Einfachheit des Designs zu gewährleisten.

---

Anschließend führt der Autor viele Beispiele für beide Philosophien an, um zu argumentieren, warum *worse-is-better* damals die Softwarebranche eroberte.

Diese beiden Philosophien sind nicht besser oder schlechter. Auch heute finden wir sie in unserer Umgebung, und die Realität bewegt sich oft zwischen ihnen. Wir möchten ein exzellentes, ästhetisch wertvolles Design schaffen, müssen aber auch Kosten und menschliche Faktoren berücksichtigen. Letztendlich müssen wir qualitativ angemessene, funktionierende Software liefern, um reale Probleme zu lösen, und die Kosten für die Entwicklung und Wartung der Software dürfen den Wert des Problems selbst auf keinen Fall übersteigen.

<a id="org514ce0b"></a>

#### Golang - die Sprache

Golang ist fast ein Paradebeispiel für die *worse is better*-Philosophie:

-   Es bündelt die jahrelange praktische Erfahrung von Google mit C++.
-   Es ist so einfach, ohne komplexe Funktionen, dass es für die Lösung eines Problems im Grunde nur einen *Building Block* gibt. Das bedeutet:
    -   Man kann es fast ohne Aufwand für die Sprache selbst leicht beherrschen.
    -   Der Code ist sehr gut lesbar.
-   Es kompiliert schnell und hat sogar Generics für die Kompiliergeschwindigkeit geopfert.
-   Parallele Aufgaben lassen sich sehr einfach über Goroutinen ausführen.
-   Es hat die Sprachfunktion der Ausnahmestapel fast vollständig aufgegeben und erzwingt die Fehlerprüfung und -behandlung.
-   Einmal kompiliert, überall ausführbar.

<a id="org2432232"></a>

#### Kubernetes - die Plattform

Kubernetes ist allen bekannt, daher werde ich nicht den Besserwisser spielen und es in einem Satz zusammenfassen: Es bietet ein konzeptionell sehr einfaches API-Design, ergänzt durch einen Reconcile-Mechanismus aus der Kybernetik, der es containerisierter Software ermöglicht, sich darin automatisiert bereitzustellen, zu skalieren und zu betreiben.

K8s erlaubt Entwicklern durch die Offenlegung dieser API-Spezifikation und des Reconcile-Mechanismus, seine Fähigkeiten zu erweitern. Entwickler können das Operator-Pattern implementieren: Das Wissen über die Konfiguration, Bereitstellung (Day-1) und den Betrieb, die Sicherung, die Fehlerbehebung (Day-2) einer Software wird in Software geschrieben, die die Software bedient, um diese komplexen und fehleranfälligen Operationen zu automatisieren, die Zuverlässigkeit zu erhöhen und die Kosten zu senken.

---

Der Grund für die Wahl des Harbor-Operators ist also sein hervorragendes Design. Auf einer exzellenten Plattform und mit einfachen Sprachfunktionen, ohne übermäßige Tricks, realisiert er durch einige Schlüsseldesigns, die den SOLID-Designprinzipien entsprechen, ein pragmatisches und ästhetisch wertvolles Softwaresystem, das als Praktiker der *the right thing*-Philosophie angesehen werden kann.

Der Code des Autors hat fast keine Kommentare, ist aber außergewöhnlich gut lesbar, was auch dem gesamten System zu verdanken ist.

<a id="org6815286"></a>

## Ziel

Die Abstraktion und Vereinfachung von Problemen geht zwangsläufig mit dem Verlust von Flexibilität einher, während der Harbor-Operator die Flexibilität vollständig opfert, um maximale kognitive Entlastung zu bringen, sodass die Entwicklung des Operators eher der Deklaration einer Softwarekonfiguration gleicht.

Das manuelle Schreiben eines Operators mit client-go ist dank des Fehlens von Generics in Golang eine Qual. Das gesamte Projekt wäre mit einer riesigen Menge an Boilerplate-Code (Template-Code) gefüllt. Ich glaube, selbst wenn jemand wirklich von Grund auf mit client-go schreiben würde, würde niemand wirklich bei Null anfangen.

So entstand kubebuilder. Es abstrahiert die Erstellung des Kubernetes-Clients, das Abhören von Anfragen des Kubernetes-API-Servers und das Einreihen von Anfragen in Warteschlangen in öffentliche Bibliotheken wie controller-runtime und öffentliche Tools wie controller-tools und kann für Entwickler Gerüstcode generieren, der sich auf die Entwicklung der Geschäftslogik zur Verarbeitung von Änderungsanfragen für API-Objekte konzentriert.

Kubebuilder bewahrt immer noch einen Hauch von Flexibilität für die Vielfalt der Geschäftslogik, während der Harbor-Operator darauf aufbauend weiter nach Perfektion strebt und die Flexibilität vollständig opfert, um konzeptionelle Konsistenz und Einfachheit zu erreichen – und die Geschäftsanforderungen, denen er gegenübersteht, eignen sich tatsächlich sehr gut für diesen Ansatz.

Daher ist unser Hauptziel in dieser Quellcode-Lektüre, vom Harbor-Operator zu lernen:

-   Wie Day-1-Operationen durchgeführt werden.
-   Wie der Redundanzgrad des Operator-Codes weiter reduziert wird, indem derselbe Controller-Code verwendet wird, um den Controller für elf CRDs auf verschiedenen Ebenen zu implementieren.
-   Wie DAG genutzt wird, um Abhängigkeiten zwischen Ressourcen zu lösen – der Autor scheint dafür sogar ein Patent angemeldet zu haben.

Darüber hinaus werden wir uns nicht schwerpunktmäßig mit Folgendem befassen:

-   Den Day-2-Operationen im Harbor-Operator; tatsächlich ist dieser Teil der Funktionalität in der aktuellen Version noch nicht stabil.
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

Bis Version v1.0.1 ist der Harbor-Operator hauptsächlich für die Day-1-Operationen des Harbor-Systems verantwortlich.
![img](https://0xc1.space/images/2022/01/30/harbor-operator-arch.png)

<a id="org41c8944"></a>

### Das Wesentliche im Blick: HarborCluster

Lassen Sie uns zunächst einige weniger kritische Teile ausblenden: die HarborCluster-CRD und die Implementierung ihres Controllers.

Warum ist sie besonders? Betrachten Sie zunächst ihre Position in der Systemarchitektur: Sie befindet sich auf der obersten Ebene und verwaltet das Harbor-System selbst sowie alle davon abhängigen Stateful Services. Dies muss aus der Projektgeschichte und ihrer besonderen Stellung in der Systemarchitektur erklärt werden.

Aus systemarchitektonischer Sicht ähnelt diese HarborCluster-CRD in ihrer Definition der Harbor-CRD stark, und der Code weist eine erhebliche Redundanz auf, was nicht sehr schön aussieht. Dies liegt daran, dass sie als die oberste (äußerste) CRD im gesamten System direkt dem Benutzer gegenübersteht; sie muss dem Benutzer alle notwendigen Konfigurationsoptionen für die Bereitstellung von Harbor zur Verfügung stellen. Da Harbor selbst ein stateless Service ist, erfordert eine vollständige Bereitstellung außerdem, dass die HarborCluster-CRD alle von Harbor abhängigen Stateful Services verwaltet, einschließlich Postgres, Minio und Redis.

Die notwendigen Informationen für das Harbor-System selbst sind bereits in der Harbor-CRD definiert, daher besteht der redundante Teil in der HarborCluster-CRD darin, diese Informationen vollständig und korrekt an die Harbor-CRD weiterzugeben. Darüber hinaus muss die HarborCluster-CRD auch die CRDs der Stateful Services verwalten, die außerhalb ihrer eigenen Zuständigkeitsgrenzen liegen, und kann daher die Controller-Logik in Harbor und allen Unterkomponenten von Harbor nicht vollständig nutzen.

Aus historischer Sicht war der Harbor-Operator ursprünglich ein privates Projekt von OVH Cloud und wurde später der goharbor-Community gespendet. Betrachtet man also den Git-History, liegt der Grund für die so große Inkonsistenz zwischen der CRD-Definition von HarborCluster und ihrer Controller-Implementierung im Vergleich zu anderen Controllern im System darin, dass sie ein späterer Community-Beitrag ist und die ursprüngliche Design des Harbor-Operators die von ihr übernommenen Funktionen nicht berücksichtigte.

Die HarborCluster-Controller-Implementierung selbst unterscheidet sich nicht wesentlich von den meisten anderen mit Controller-Runtime implementierten Controllern, die wir normalerweise sehen, und wird daher nicht detailliert untersucht.

---

HarborCluster-Controller

![img](https://0xc1.space/images/2022/01/30/harbor-cluster-controller.png)

---

Harbor Core-Controller

![img](https://0xc1.space/images/2022/01/30/harbor-core-controller.png)

---

<a id="orgd9c3526"></a>

### Lösung von Abhängigkeiten zwischen Ressourcen: Dependency Graph

Der Abhängigkeitsgraph ist ein relativ unabhängiges Modul im gesamten Projekt, aber es fungiert tatsächlich als Ausführungs-Engine für alle Controller im Harbor-Operator. Im Wesentlichen wird beobachtet, dass verschiedene Arten von Ressourcen in Kubernetes voneinander abhängen; die Bereitstellung und Abstimmung einiger Ressourcen hängt von der Bereitstellung und Abstimmung anderer Ressourcen ab, z. B. kann eine Deployment von einem ConfigMap abhängen; letztendlich bilden diese Abhängigkeiten einen Abhängigkeitsgraphen, der eigentlich ein DAG sein sollte. Hier benötigen wir die folgende Schnittstellendefinition:

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

-   Dabei definiert `Resource` eine abstrakte Ressource. Da sich dieses Modul nicht dafür interessiert, was eine Ressource genau darstellt, und gleichzeitig die maximale Flexibilität unter den Einschränkungen der Ausdruckskraft der Sprache bewahrt werden soll, wird der Top-Typ `interface{}` verwendet.
-   `RunFunc` ist dafür verantwortlich, die konkrete Operation für eine `Resource` durchzuführen. Hier steht `RunFunc` vor einem Typsicherheitsproblem: `interface{}` bedeutet, dass der Compiler nichts über diesen Typ weiß und daher nichts damit anfangen kann. Aber `RunFunc` muss mit diesem Typ, der alles sein kann, etwas anfangen. Daher gehen wir davon aus, dass es einen Type-Cast durchführen muss. Wenn jedes `RunFunc` für jede Ressource manuell in einen konkreten Typ umgewandelt werden müsste, wäre das sehr langweilig und widerlich. Später werden wir uns ansehen, wie der Harbor-Operator die Drecksarbeit an einer Stelle konzentriert.
-   `Manager` hat nur zwei Methoden: Ressource hinzufügen und diesen Graphen ausführen. Beide müssen untersucht werden.
-   Die Datenstruktur `resourceManager`, die `Manager` implementiert, ist ebenfalls einfach definiert:
    -   Eine `resource -> blockers` Map
    -   Eine `resource -> runFunc` Map
    -   Ein `lock` zur Behandlung der Nebenläufigkeit von Map-Operationen. Hier können wir sehen, dass der Autor Datenstrukturen wie `Sync.Map`, die nebenläufigkeitssicher, aber typsicher sind, nicht mag. Das macht es noch neugieriger, wie der Autor mit so vielen (11 Komponenten) `RunFunc` umgeht.

Da es sich um einen Graphen handelt, muss es eine Datenstruktur für den Graphen und eine Factory-Methode zum Erstellen dieses Graphen geben. Die Datenstruktur von `resourceManager` wirkt etwas steif, und es ist unklar, ob es sich dabei um den eigentlichen Graphen handelt.

<a id="org75cbb07"></a>

#### AddResource

Anhand der Signatur ist zu erkennen, dass `AddResource` die hinzuzufügende Ressource selbst, alle ihre Abhängigkeiten und die entsprechende `runFunc` hinzufügt. Es ist wichtig zu beachten, dass zuerst Ressourcen hinzugefügt werden müssen, die von keiner anderen Ressource abhängen (d. h. mit Ausgangsgrad 0).

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

Da ist es! `getGraph`. Es sieht so aus, als ob der Graph erstellt werden soll. Gehen wir hinein und stellen fest, dass `resourceManager` tatsächlich nur ein Builder ist. Der eigentliche Graph ist darin versteckt und wird als Adjazenzliste dargestellt. Auf den ersten Blick sieht es sogar komplex aus:

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

Warum sind `parent` und `children` ein Channel? Warum sind so viele Locks notwendig? Schauen wir uns den Erstellungsprozess des Graphen an:

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

Die Abhängigkeitsbeziehung wurde also umgekehrt. Jetzt zeigen die abhängigen Ressourcen auf die abhängigen Parteien. Für jede Ressource wird ein `node` erstellt, und für jede Abhängigkeit dieser Ressource wird der `parent`-Channel dieser Ressource zu den `children` der abhängigen Ressource hinzugefügt. Der endgültige Graph ist eine Sammlung von `node`s.

Das ist wirklich verwirrend. Schauen wir uns also den Ausführungsprozess an:

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

Es ist sehr einfach und direkt: Für jeden `node` wird gewartet, bis seine eingehenden `node`s ausgeführt sind, dann wird seine eigene `runFunc` ausgeführt, und potenzielle Fehler werden an alle nachfolgenden `node`s in der Kette weitergegeben, um sie vorzeitig abzubrechen.

Hier verstehe ich nicht, warum nicht eine topologische Sortierung verwendet wird, um dieses klar definierte klassische Problem zu lösen.

<a id="orgdcd001c"></a>

#### Initialisierung

Die Initialisierung des `GraphManager` verwendet eine thread-lokale globale Variable, die nach der Initialisierung in die Luft (ctx) geworfen wird – eine gängige Methode der Abhängigkeitsinjektion in verschiedenen API-Frameworks.

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

Abgesehen vom zuvor ausgeklammerten HarborCluster-Controller kombinieren alle Controller der Komponenten im Harbor-Operator direkt denselben Controller, extrahieren die gemeinsame Logik aller Controller und verwenden dasselbe `Run`, dasselbe `Reconcile`. Wie wird das gemacht?

-   Welche Logik wurde extrahiert?
-   Wie werden die Unterschiede behandelt?
-   Was wurde geopfert?

<a id="orgbd581d5"></a>

#### Datenstruktur

Die Implementierung der Schnittstelle durch den Controller ist, abgesehen von der Implementierung von `Reconciler`, nicht besonders interessant. Schauen wir uns zunächst die Definition der Datenstruktur des Controllers an:

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

Die Dinge, die wir nicht gut kennen, sind nur `BaseController` und `rm`.

Wenn wir uns `BaseController` ansehen, handelt es sich im Grunde um eine Identifikation, um Informationen über den Controller selbst und einige Label-Informationen zu identifizieren. Die unterschiedlichen logischen Unterschiede zwischen verschiedenen Controllern können also nur in `ResourceManager` liegen. `ResourceManager` scheint auch eine sehr einfache Schnittstelle zu sein, und die Implementierer von `ResourceManager` sind tatsächlich die jeweiligen konkreten Controller. Wir werden die konkreten Beispiele für `ResourceManager` am Ende untersuchen.

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

Wie schafft es der Controller also, mit nur einem `Reconcile` die gesamte Familie von elf Harbor-CRDs zusammen mit so vielen Systemressourcen zu reconciliieren?

Basierend auf den bereits bekannten Informationen sollte für jede CRD ein `ResourceManager` verwendet werden, um die verschiedenen Ressourcen zu definieren, die diese CRD erstellen und reconciliieren muss. Diese Ressourcen definieren ihre Abhängigkeiten über den Abhängigkeitsgraphen, und für jede CRD wird eine konkrete `RunFunc` geschrieben, um die endgültige Reconcile durchzuführen.

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

Eine klassische Reconcile-Logik. Es scheint, dass die ganze Magie in `c.Run` steckt:

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

Tatsächlich taucht `rm` hier auf. Nachdem die Ressourcen für einen bestimmten Controller hinzugefügt wurden, scheint `PrepareStatus` ein einheitlicher zu sein. In Kombination mit dem Quellcode dieser Methode und der CRD-Definition wird angenommen, dass alle Komponenten denselben Status haben – wieder ein Design, das Flexibilität für Einfachheit und Konsistenz opfert. Tatsächlich folgt dieses Design der von K8s empfohlenen Spezifikation und kann beim Entwerfen von CRDs als Referenz dienen. Darauf wird hier nicht weiter eingegangen.

Letzte Zeile: `sgraph.Get(ctx).Run(ctx)` – der Abhängigkeitsgraph kommt, aus der Luft (ctx) geholt. Damit schließt sich dieser Teil der Logik. Die verbleibende Frage ist: Wie konstruieren die konkreten Controller, die `ResourceManager` implementieren, den Abhängigkeitsgraphen und ihre eigene `RunFunc`?

<a id="orgb7ed9a6"></a>

### Code als Konfiguration: ResourceManager

Der letzte Schritt ergibt sich fast von selbst.

Alle Controller, die `ResourceManager` implementieren, sollten gleichberechtigt sein. Lassen Sie uns anhand des Beispiels von Harbor Core einen Blick darauf werfen.

Abgesehen von den Teilen, die zur Erzeugung konkreter K8s-Ressourcen verwendet werden, sollten wir uns auf die Teile konzentrieren, die die `ResourceManager`-Schnittstelle implementieren.

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

Meine Güte, abgesehen davon, dass die Ressourcen in einer bestimmten Reihenfolge hinzugefügt werden müssen, entspricht dies einer deklarativen Gestaltung. Wenn Sie einen neuen Controller hinzufügen möchten, ist es ein Kinderspiel: Sie müssen nur wissen, welche Ressourcen dieser Controller reconciliieren soll, und müssen sich nicht um die konkrete Reconcile-Logik kümmern.

Moment, müssen wir die `RunFunc` nicht selbst implementieren? Dies ist die letzte Frage unserer Quellcode-Lektüre: Wie verallgemeinert und abstrahiert der Harbor-Operator den Reconcile-Prozess einer beliebigen Ressource zu einer einzigen Funktion.

Nehmen wir zum Beispiel `r.Controller.AddServiceToManage(ctx, service)`.

```go
    func (c *Controller) AddServiceToManage(ctx context.Context, resource *corev1.Service, dependencies ...graph.Resource) (graph.Resource, error) {
       if resource == nil {
          return nil, nil
       }

       mutate, err := c.GlobalMutateFn(ctx)
       if err != nil {
          return nil, err