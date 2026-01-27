---
"title": "Source Code Reading: Harbor-Operator"
"summary": "This article is a technical analysis of the Harbor-Operator source code. The author begins with design philosophies (such as 'Worse is Better') and introduces the characteristics of Harbor-Operator, which is implemented in Golang on the Kubernetes platform. The article focuses on dissecting its core architecture, including how it resolves dependencies between resources through a Dependency Graph and how it uses a unified Controller to implement the reconciliation logic for eleven different CRDs, thereby greatly improving code reuse. The article also provides a detailed interpretation of the design of key components like ResourceManager and ProcessFunc, showcasing Harbor-Operator's excellent practices in pursuing simplicity, consistency, and maintainability."
"tags":
  - "Operator"
  - "Kubernetes"
  - "Golang"
  - "Source Code Analysis"
  - "Harbor"
  - "Design Patterns"
  - "Dependency Graph"
  - "Controller"
"date": "2022-01-30"
---

<!--more-->

<a id="orgdafefdb"></a>

## Preparation Before Starting

<a id="org081213e"></a>

### Why Harbor-Operator?

<a id="org55a74c9"></a>

#### Worse is Better?

What is good software?

In the famous late 1980s essay *The Rise of Worse is Better*, the author suggests that good software design should consider the four qualities of **simplicity, correctness, consistency, and completeness**.

The author describes two software design philosophies, tentatively named **the right thing** and **worse is better** (it's necessary to point out that this naming is not pejorative). Both philosophies revolve around the four qualities mentioned above, differing in their prioritization of these traits.

---

<a id="orgbebeeee"></a>

##### The right thing

-   **Simplicity** - The design must be simple, both in implementation and interface. It is more important for the interface to be simple than the implementation.
-   **Correctness** - The design must be correct in all observable aspects. Incorrectness is simply not allowed.
-   **Consistency** - The design must not be overly inconsistent. Consistency can be sacrificed in favor of simplicity. Consistency can also be sacrificed to achieve completeness if simplicity is retained.
-   **Completeness** - The design must cover as many important situations as is practical. All reasonably expected cases must be covered. Simplicity is not allowed to overly reduce completeness.

<a id="org948c614"></a>

##### Worse is better

-   **Simplicity** - The design must be simple, both in implementation and interface. It is more important for the implementation to be simple than the interface. Simplicity is the most important consideration.
-   **Correctness** - The design must be correct in all observable aspects. It is slightly better to be simple than correct.
-   **Consistency** - The design must not be overly inconsistent. Consistency can be sacrificed for simplicity in some cases, but it is better to drop those parts of the design that deal with less common circumstances than to introduce either complexity or inconsistency.
-   **Completeness** - The design must cover as many important situations as is practical. All reasonably expected cases should be covered. Completeness can be sacrificed in favor of any other quality. In fact, completeness must be sacrificed whenever implementation simplicity is jeopardized. Consistency can be sacrificed to achieve completeness if simplicity is retained; especially worthless is consistency of interface.

---

The author then provides many examples of both to argue why worse-is-better was sweeping the software industry at that time.

These two philosophies are not about superiority or inferiority. Today, we see them around us, and reality often navigates between them. We hope to create excellent, aesthetically valuable designs, but we must also consider cost and human factors. Ultimately, we need to deliver quality, working software to solve real-world problems, and the cost of writing and maintaining the software must not exceed the value of the problem itself.

<a id="org514ce0b"></a>

#### Golang - the language

Golang is almost a paragon of the worse is better philosophy:

-   It embodies Google's years of practical experience with C++.
-   It is so simple, with no complex features, meaning there is essentially only one building block to solve a problem. This implies:
    -   It can be easily mastered without much effort on the language itself.
    -   The code is very readable.
-   It compiles quickly, even sacrificing generics for compilation speed.
-   It can easily run concurrent tasks via goroutines.
-   It almost discards the language feature of exception stacks, forcing error checking and handling.
-   Compile once, run anywhere.

<a id="org2432232"></a>

#### Kubernetes - the platform

Kubernetes is familiar to everyone, so I won't show off in front of experts. In a nutshell: it provides a conceptually very simple API design, supplemented by a reconciliation mechanism from cybernetics, enabling automated deployment, scaling, and operation of containerized software within it.

K8s allows developers to extend its capabilities by opening up this API specification and reconciliation mechanism. Developers can implement the **Operator Pattern**: encoding the knowledge of software configuration, deployment (Day-1), operation, maintenance, backup, and failover (Day-2) into software that operates the software, automating these complex and error-prone operations to improve reliability and reduce costs.

---

The reason for choosing Harbor Operator is that it has excellent design. On an excellent platform and using simple language features, without excessive clever tricks, it implements a pragmatic and aesthetically valuable software system through several key designs that adhere to SOLID principles. It can be seen as a practitioner of the *the right thing* philosophy.

The author's code has almost no comments but is exceptionally readable, which also relies on the entire system's...

<a id="org6815286"></a>

## Goals

Abstracting and simplifying problems inevitably comes with a sacrifice in flexibility. Harbor Operator completely sacrifices flexibility to achieve the maximum reduction in cognitive load, making Operator development more like declaring a software configuration.

Handwriting an operator using client-go, thanks to the lack of generics in Golang, is simply asking for trouble. The entire project would be filled with a massive amount of boilerplate code. I believe even if someone really wrote it by hand with client-go, no one would actually start from scratch.

Thus, kubebuilder emerged. It abstracts operations like creating the Kubernetes Client, listening to requests from the Kubernetes API Server, and queuing requests into public libraries (controller runtime) and public tools (controller tools). It can generate scaffold code for developers, allowing them to focus on developing business logic for handling API object change requests.

Kubebuilder still preserves a bit of freedom for the diversity of business logic. Harbor Operator, on this basis, pursues the extreme, completely sacrificing flexibility to pursue conceptual consistency and simplicity. The business it faces is indeed very suitable for this approach.

Therefore, in this source code reading, our main goals are to learn how Harbor Operator:

-   Performs Day-1 operations.
-   Further reduces redundancy in operator code, using the same Controller code to implement Controllers for eleven different levels of CRDs.
-   Utilizes DAG to solve dependency issues between resources. The author seems to have even applied for a patent for this.

Additionally, we will not focus on:

-   Day-2 operations in Harbor Operator; in fact, this part is not yet stable in the current version.
-   The source code and functionality of Harbor itself.

<a id="org345a335"></a>

## Source Code Reading

<a id="org1198d5f"></a>

### Static Structure

<a id="orgb32de77"></a>

#### Directory Structure

Only directories are listed here.

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

#### Key Interfaces

![img](https://0xc1.space/images/2022/01/30/harbor-operator-class.svg)

<a id="org290c6c2"></a>

#### System Architecture

As of v1.0.1, Harbor Operator is primarily responsible for Day-1 operations of the Harbor system.
![img](https://0xc1.space/images/2022/01/30/harbor-operator-arch.png)

<a id="org41c8944"></a>

### Focus on the Big Picture: HarborCluster

First, let's filter out some less critical parts: the HarborCluster CRD and its Controller implementation.

Why is it special? First, observe its position in the system architecture: it's at the topmost layer, managing the Harbor system itself and all its dependent stateful services. This needs to be explained from both project history and its special position in the system architecture.

From the system architecture perspective, the HarborCluster CRD definition is very similar to the Harbor CRD, with a lot of code redundancy, which looks quite inelegant. This is because, as the outermost (top-level) CRD in the system, it directly faces users; it must be able to provide users with all necessary configuration items for declaring a Harbor deployment. Furthermore, since Harbor itself is a stateless service, a complete deployment also requires the HarborCluster CRD to manage all stateful services that Harbor depends on, including Postgres, Minio, and Redis.

The necessary information for the Harbor system itself is already defined in the Harbor CRD. Therefore, the redundant part in the HarborCluster CRD is to pass this information completely and accurately to the Harbor CRD. Additionally, the HarborCluster CRD needs to manage the CRDs of those stateful services that are outside its own responsibility boundary, so it cannot fully use the Controller logic from Harbor and all its subcomponents.

From a historical perspective, Harbor Operator was originally a private project of OVH Cloud and was later donated to the goharbor community. Therefore, observing the git history, the reason for the significant inconsistency between the HarborCluster CRD definition and its Controller implementation compared to other Controllers in the system is that it was a later contribution from the community. The initial design of Harbor Operator did not consider the functions it would shoulder.

The HarborCluster Controller implementation itself is not much different from most Controllers we see implemented using Controller-runtime, so it won't be studied in detail.

---

HarborCluster Controller

![img](https://0xc1.space/images/2022/01/30/harbor-cluster-controller.png)

---

Harbor Core Controller

![img](https://0xc1.space/images/2022/01/30/harbor-core-controller.png)

---

<a id="orgd9c3526"></a>

### Solving Dependencies Between Resources: Dependency Graph

The dependency graph is a relatively independent module in the entire project, but it actually serves as the execution engine for all controllers in Harbor Operator. Essentially, it observes that various resources in Kubernetes have interdependencies; the deployment and reconciliation of some resources depend on others, e.g., a Deployment might depend on a ConfigMap. Ultimately, these dependencies form a dependency graph, which should actually be a DAG. The interface definition here is as follows:

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

-   `Resource` defines an abstract resource. Since this module doesn't care what the resource represents, and to retain maximum flexibility within the language's expressive limitations, the top type `interface{}` is used.
-   `RunFunc` is responsible for handling how to operate on a `Resource`. Here, `RunFunc` faces a type safety issue: `interface{}` means the compiler knows nothing about the type, so it can't proceed. But `RunFunc` must take this type, which could be anything, and do something with it. Therefore, we assume it must perform a type assertion. If the `RunFunc` for each resource had to manually cast to a specific type, it would be very tedious and nauseating. Later, we'll see how Harbor Operator centralizes this dirty work.
-   `Manager` has only two methods: adding a `Resource` and running the graph. We need to study them separately.
-   The data structure `resourceManager` that implements `Manager` is also simple:
    -   A map of `resource -> blockers`
    -   A map of `resource -> runFunc`
    -   A `lock` to handle concurrency for map operations. From this, we can see the author doesn't like data structures like `Sync.Map` that guarantee concurrency safety but lose type safety. This makes us even more curious about how the author handles so many (11 components) `RunFunc`s.

Since it's a Graph, there must be a Graph data structure and a factory method to build it. The `resourceManager` data structure looks a bit rigid; it's uncertain if it's the actual Graph.

<a id="org75cbb07"></a>

#### AddResource

According to the signature, `AddResource` adds the resource itself, all its dependencies, and the corresponding `runFunc`. It's worth noting that resources that don't depend on any other resources (i.e., with zero out-degree) must be added first.

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

Almost all the important logic in this package is in the `Run` method. Let's look at its first half:

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

There it is! `getGraph`. It looks like it's going to build the graph. Going in, we find that `resourceManager` is indeed just a builder; the real graph is hidden inside, expressed using an adjacency list. At first glance, it even looks complex:

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

Why are `parent` and `children` channels? Why so many locks? Let's look at the graph construction process:

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

So the dependency relationship is inverted. Now, the depended-upon item points to the dependent. For each resource, a `node` is constructed. Simultaneously, for each dependency of the resource, the resource's `parent` channel is added to the dependency's `children`. The final graph is a collection of `node`s.

This is inevitably confusing. Let's look at the execution process:

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

It's very straightforward. For each `node`, wait for its indegree nodes to finish executing, then execute its own `runFunc`, and propagate any potential errors to all downstream nodes waiting to execute, terminating them early.

Here, I really don't understand why a topological sort isn't used to solve this well-defined classic problem.

<a id="orgdcd001c"></a>

#### Initialization

```go
    The GraphManager is initialized using a thread-local global variable, placed into the context (ctx) after initialization. This is a common dependency injection method in various API frameworks.
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

### Maximizing Code Reuse: Controller

Apart from the HarborCluster Controller we previously set aside, all component Controllers in Harbor Operator directly compose this same Controller, extracting the common logic of all Controllers, using the same `Run`, the same `Reconcile`. How is this done?

-   What logic was extracted?
-   How are differences handled?
-   What was sacrificed?

<a id="orgbd581d5"></a>

#### Data Structure

The Controller's implementation of the interface, besides implementing `Reconciler`, isn't very interesting. So first, let's look at the data structure definition of `Controller`:

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

The things we don't quite recognize are only `BaseController` and `rm`.

Looking at `BaseController`, it's basically an identifier, used to identify the Controller's own information and some label information. So, the logical differences between different Controllers can only exist within the `ResourceManager`. `ResourceManager` also looks like a very simple interface. Indeed, the ones implementing `ResourceManager` are the various specific Controllers; we will study specific examples of `ResourceManager` at the end.

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

#### Reconcile Logic

So how does the Controller manage to reconcile all eleven CRDs of the Harbor family along with so many system resources using only one `Reconcile`?

Based on the information we already have, it should be that for each CRD, a `ResourceManager` is used to define the various resources that need to be created and reconciled for that CRD. These resources define their dependencies through the dependency graph, and a specific `RunFunc` is written for each CRD to perform the final reconciliation.

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

It's a classic Reconcile logic. It seems the trick is in `c.Run`:

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

Indeed, `rm` appears here. After adding the resources required by a specific Controller, `PrepareStatus` seems to be a unified one. Combining the source code of this method and the CRD definitions, it assumes all components have the same Status. This is another design that sacrifices flexibility for simplicity and consistency. In fact, this design follows the norms advocated by K8s and can be used as a reference when designing CRDs. We won't elaborate further here.

The last line: `sgraph.Get(ctx).Run(ctx)`. The dependency graph comes, grabbed from the air (ctx). So far, this part of the logic is closed-loop. The remaining questions are: How do the various Concrete Controllers that implement `ResourceManager` construct the dependency graph and construct their own `RunFunc`?

<a id="orgb7ed9a6"></a>

### Code as Configuration: ResourceManager

The final step is a natural progression.

All Controllers implementing `ResourceManager` should be equal in status. Let's use the harbor core as an example to investigate.

Apart from the parts used to generate specific K8s resources, we should focus on the parts that implement the `ResourceManager` interface.

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

Wow, apart from the resources needing to be added in order, this is equivalent to a declarative design. Adding a new Controller would be extremely easy: just know what resources this Controller needs to reconcile, without needing to manage the specific Reconcile logic.

Wait, don't we need to implement the `RunFunc` ourselves? This is the final question of our source code reading: let's see how Harbor Operator generalizes and abstracts the reconciliation process of any Resource into a single function.

So, for example, here we have `r.Controller.AddServiceToManage(ctx, service)`.

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

There are two interesting points:

1.  The `Resource` definition, which we haven't seen before.
2.  The call to `Graph.AddResource` appears. The construction of the `RunFunc` we care about is here. We'll study it later.

First, look at this `Resource`. Remember, in the `Graph`, since it doesn't care what `Resource` specifically is, it was given an `interface{}`. Here, they care more about the `Resource`, so it's more important:

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

Essentially, it's a wrapper on top of K8s generic resources. Harbor Operator adds some extra encapsulation on top of that.

These extra encapsulations are `checkable` and `mutable`.

`checkable` defines the validation of resource legality, which is relatively simple.

`Mutable` looks fancy, but it's actually simple Monad Composition.

---

`Mutable` forms a Monad. Unlike function composition, each composition produces an additional result to express computational side effects, so functions cannot be applied continuously directly. Some functional languages provide the fish operator `>=>` to implement Monad Compose.

The signature of the fish operator described in Scala syntax is as follows:

```go
    def >=>[A, B, C](f: A => M[B], g: B => M[C]): A => M[C]
```

In plain language, the mutable data structure allows many mutation functions to be combined in a certain order, exiting directly upon encountering an error.

---

Now, the prerequisites for studying how to construct the `RunFunc` are complete. Finally, let's see how Harbor Operator uses these prerequisites to construct the specific implementation of Reconcile for various, completely different Resources through the same set of logic.

<a id="orgcce49ab"></a>

### The Final Mystery: ProcessFunc

`ProcessFunc` is essentially a higher-order function that uses closure to capture a `depManager`, mainly used to calculate and change the Checksum of the resource itself and its various dependencies.

The constructed `RunFunc` first checks if the resource and its dependencies have changed. If not, it simply checks for readiness and finishes. Otherwise, it updates the Checksum for the next check and then calls `c.applyAndCheck` to actually reconcile the change.

```go
    func (c *Controller) ProcessFunc(ctx context.Context, resource runtime.Object, dependencies ...graph.Resource) func(context.Context, graph.Resource) error { // nolint:funlen
            depManager := checksum.New(c.Scheme)

            depManager.Add(ctx, owner.Get(ctx), true)

            gvks, _, err := c.Scheme.ObjectKinds(resource)
            if err == nil {
                    resource.GetObjectKind().SetGroupVersionKind(gvks[0])
            }

            for _, dep := range dependencies {
                    if dep, ok := dep.(*Resource); ok {
                            gvks, _, err := c.Scheme.ObjectKinds(dep.resource)
                            if err == nil {
                                    dep.resource.GetObjectKind().SetGroupVersionKind(gvks[0])
                            }

                            depManager.Add(ctx, dep.resource, false)
                    }
            }

            return func(ctx context.Context, r graph.Resource) error {
                    res, ok := r.(*Resource)
                    if !ok {
                            return nil
                    }

                    span, ctx := opentracing.StartSpanFromContext(ctx, "process")
                    defer span.Finish()

                    namespace, name := res.resource.GetNamespace(), res.resource.GetName()

                    gvk := c.AddGVKToSpan(ctx, span, res.resource)
                    l := logger.Get(ctx).WithValues(
                            "resource.apiVersion", gvk.GroupVersion(),
                            "resource.kind", gvk.Kind,
                            "resource.name", name,
                            "resource.namespace", namespace,
                    )

                    logger.Set(&ctx, l)
                    span.
                            SetTag("resource.name", name).
                            SetTag("resource.namespace", namespace)

                    changed, err := c.Changed(ctx, depManager, res.resource)
                    if err != nil {
                            return errors.Wrap(err, "changes detection")
                    }

                    if !changed {
                            l.V(0).Info("dependencies unchanged")

                            err = c.EnsureReady(ctx, res)

                            return errors.Wrap(err, "check")
                    }

                    res.mutable.AppendMutation(func(ctx context.Context, resource runtime.Object) error {
                            if res, ok := resource.(metav1.Object); ok {
                                    depManager.AddAnnotations(res)
                            }

                            return nil
                    })

                    err = c.applyAndCheck(ctx, r)

                    return errors.Wrapf(err, "apply %s (%s/%s)", gvk, namespace, name)
            }
    }
```

The actual reconciliation logic is in `applyAndCheck`, which uses the `mutable` function registered earlier in the `Resource`.

```go
    func (c *Controller) applyAndCheck(ctx context.Context, node graph.Resource) error {
       span, ctx := opentracing.StartSpanFromContext(ctx, "applyAndCheck")
       defer span.Finish()

       res, ok := node.(*Resource)
       if !ok {
          return serrors.Un