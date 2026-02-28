---
title: Source Code Reading: Harbor-Operator
date: 2022-01-30
taxonomies:
  tags:
    - Operator
    - Technology
extra:
  toc:
    - level: 1
      title: Preparation Before Starting
      id: orgdafefdb
      permalink: orgdafefdb
      children:
        - level: 2
          title: Why Harbor-Operator
          id: org081213e
          permalink: org081213e
          children:
            - level: 3
              title: Worse is Better?
              id: org55a74c9
              permalink: org55a74c9
              children:
                - level: 4
                  title: The right thing
                  id: orgbebeeee
                  permalink: orgbebeeee
                - level: 4
                  title: Worse is better
                  id: org948c614
                  permalink: org948c614
            - level: 3
              title: Golang - the language
              id: org55a74c9
              permalink: org55a74c9
            - level: 3
              title: Kubernetes - the platform
              id: org2432232
              permalink: org2432232
    - level: 1
      title: Goals
      id: org6815286
      permalink: org6815286
    - level: 1
      title: Source Code Reading
      id: org1198d5f
      permalink: org1198d5f
      children:
        - level: 2
          title: Static Structure
          id: orgfc0f08e
          permalink: orgfc0f08e
          children:
            - level: 3
              title: Directory Structure
              id: orgb32de77
              permalink: orgb32de77
            - level: 3
              title: Key Interfaces
              id: org290c6c2
              permalink: org290c6c2
            - level: 3
              title: System Architecture
              id: org41c8944
              permalink: org41c8944
        - level: 2
          title: Focus on the Big Picture: HarborCluster
          id: orgd9c3526
          permalink: orgd9c3526
        - level: 2
          title: Resolving Dependencies Between Resources: Dependency Graph
          id: org75cbb07
          permalink: org75cbb07
          children:
            - level: 3
              title: AddResource
              id: org4cb9f3a
              permalink: org4cb9f3a
            - level: 3
              title: Run
              id: orgdcd001c
              permalink: orgdcd001c
            - level: 3
              title: Initialization
              id: org73ef8b0
              permalink: org73ef8b0
        - level: 2
          title: Maximizing Code Reusability: Controller
          id: orgbd581d5
          permalink: orgbd581d5
          children:
            - level: 3
              title: Data Structures
              id: org73ef8b0
              permalink: org73ef8b0
            - level: 3
              title: Reconcile Logic
              id: orgdcd001c
              permalink: orgdcd001c
        - level: 2
          title: Code as Configuration: ResourceManager
          id: orgdcd001c
          permalink: orgdcd001c
        - level: 2
          title: The Final Mystery: ProcessFunc
          id: orgdcd001c
          permalink: orgdcd001c
---

<!--more-->

<a id="orgdafefdb"></a>

## Preparation Before Starting

<a id="org081213e"></a>

### Why Harbor-Operator

<a id="org55a74c9"></a>

#### Worse is Better?

What makes good software?

In the famous late 80s article *The Rise of Worse is Better*, the author mentions that good software design should consider the four qualities of *simplicity, correctness, consistency, and completeness*.

The author describes two software design philosophies, which we can temporarily call *the right thing* and *worse is better* (it's necessary to point out that this naming is not pejorative). Both philosophies revolve around the four qualities mentioned above, differing in their prioritization of these qualities.

---

<a id="orgbebeeee"></a>

##### The right thing

-   **Simplicity** - The design must be simple to understand. Simplicity of the interface is more important than simplicity of the implementation.
-   **Correctness** - The design must be correct. There can be no compromise on this point.
-   **Consistency** - Consistency is as important as correctness. Therefore, simplicity and completeness can be compromised slightly.
-   **Completeness** - The design must cover a wide variety of possible situations. Completeness should not be overly sacrificed for the sake of simplicity.

<a id="org948c614"></a>

##### Worse is better

-   **Simplicity** - The design must be simple to understand. Simplicity of the implementation is more important than simplicity of the interface. Simplicity is the most important quality.
-   **Correctness** - The design must be correct, but simplicity is slightly more important than correctness.
-   **Consistency** - The design should not be too inconsistent. Consistency can be sacrificed for simplicity. Consistency can be sacrificed for completeness, provided simplicity is maintained.
-   **Completeness** - The design must cover a wide variety of possible situations. Completeness can be sacrificed at any time to keep the design simple.

---

The author then gives many examples of both to argue why *worse-is-better* was sweeping the software industry at the time.

These two philosophies are not about superiority or inferiority. We see them around us today, and reality often moves between them. We hope to create excellent, aesthetically valuable designs, but we must also consider cost and human factors. Ultimately, we need to deliver quality, working software to solve real-world problems, and the cost of writing and maintaining the software must absolutely not exceed the value of the problem itself.

<a id="org514ce0b"></a>

#### Golang - the language

Golang is almost a model example of the *worse is better* philosophy:

-   It embodies Google's years of practical experience with C++.
-   It is so simple, with no complex features, meaning there is essentially only one building block to solve a problem. This implies:
    -   It can be easily mastered with almost no effort spent on the language itself.
    -   The code is very easy to read.
-   It compiles quickly, even sacrificing generics for compilation speed.
-   It can easily run concurrent tasks via goroutines.
-   It almost completely discards the language feature of exception stacks, forcing error checking and handling.
-   Compile once, run anywhere.

<a id="org2432232"></a>

#### Kubernetes - the platform

Everyone is familiar with Kubernetes, so I won't show off. In a nutshell: It provides a conceptually very simple API design, supplemented by a reconciliation mechanism from cybernetics, enabling automated deployment, scaling, and operation of containerized software within it.

Kubernetes allows developers to extend its capabilities by opening up this API specification and reconciliation mechanism. Developers can implement the **Operator Pattern**: encoding the knowledge of software configuration, deployment (Day-1), and operation, maintenance, backup, failover (Day-2) into software that operates the software, automating these complex and error-prone operations, thereby improving reliability and reducing costs.

---

So the reason for choosing Harbor Operator is that it has an excellent design. On an excellent platform and using simple language features, without excessive clever tricks, it implements a pragmatic and aesthetically valuable software system through several key designs that adhere to SOLID principles. It can be seen as a practitioner of the *the right thing* philosophy.

The author's code has almost no comments but is exceptionally easy to read, which also relies on the entire system's...

<a id="org6815286"></a>

## Goals

Abstracting and simplifying problems inevitably comes with a sacrifice in flexibility. Harbor Operator completely sacrifices flexibility to achieve the greatest degree of mental relief, making Operator development more like declaring a software configuration.

Handwriting an operator using client-go, thanks to the lack of generics in Golang, is simply asking for trouble. The entire project would be filled with a huge amount of boilerplate code. I believe even if someone really wrote it by hand with client-go, no one would actually start from scratch.

Thus, **kubebuilder** emerged. It abstracts the creation of the Kubernetes Client, listening to requests from the Kubernetes API Server, and queuing requests into public libraries like **controller-runtime** and public tools like **controller-tools**. It can generate scaffold code for developers, allowing them to focus on developing the business logic for handling API object change requests.

Kubebuilder still preserves a bit of freedom for the diversity of business logic. Harbor Operator, on this foundation, pursues the extreme further, completely sacrificing flexibility to pursue conceptual consistency and simplicity. The business it faces is indeed very suitable for this approach.

Therefore, in this source code reading, our main goals are to learn from Harbor Operator:

-   How to perform Day-1 operations.
-   How to further reduce redundancy in operator code, using the same Controller code to implement Controllers for eleven different levels of CRDs.
-   How to use DAG to solve dependency problems between resources. The author seems to have even applied for a patent for this.

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
    │   │   └── graph
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

Why is it special? First, observe its position in the system architecture: it's at the topmost layer. It manages the Harbor system itself and all the stateful services it depends on. This needs to be explained from both the project's history and its special position in the system architecture.

From a system architecture perspective, the HarborCluster CRD definition is very similar to the Harbor CRD, with a lot of code redundancy, which looks quite inelegant. This is because, as the outermost (top-level) CRD in the entire system, it directly faces users. It must be able to provide users with all the necessary configuration items to declare a Harbor deployment. Additionally, since Harbor itself is a stateless service, a complete deployment also requires the HarborCluster CRD to manage all the stateful services Harbor depends on, including Postgres, Minio, and Redis.

The necessary information for the Harbor system itself is already defined in the Harbor CRD. Therefore, the redundant part in the HarborCluster CRD is to pass this information completely and accurately to the Harbor CRD. Furthermore, the HarborCluster CRD also needs to manage the CRDs of those stateful services that are outside its own responsibility boundary, so it cannot completely reuse the Controller logic from Harbor and all its subcomponents.

From a historical perspective, Harbor Operator was originally a private project of OVH Cloud and was later donated to the goharbor community. Therefore, combined with observing the git history, the reason for the significant inconsistency between the HarborCluster CRD definition and its Controller implementation compared to other Controllers in the system is that it was a later contribution from the community. The functionality it shoulders was not considered in the initial design of Harbor Operator.

The HarborCluster Controller implementation itself is not much different from most Controllers we see implemented using Controller-runtime, so it won't be studied in detail.

---

HarborCluster Controller

![img](https://0xc1.space/images/2022/01/30/harbor-cluster-controller.png)

---

Harbor Core Controller

![img](https://0xc1.space/images/2022/01/30/harbor-core-controller.png)

---

<a id="orgd9c3526"></a>

### Resolving Dependencies Between Resources: Dependency Graph

The dependency graph is a relatively independent module in the entire project, but it actually serves as the execution engine for all controllers in Harbor Operator. The essence is observing that various resources in Kubernetes have interdependencies. The deployment and reconciliation of some resources depend on the deployment and reconciliation of others, e.g., a Deployment might depend on a ConfigMap. Ultimately, these dependencies form a dependency graph, which should actually be a DAG. Here we need the interface definition as follows:

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

-   `Resource` defines an abstract resource. Since this module doesn't care what the resource represents, and to retain maximum flexibility within the limitations of the language's expressiveness, the top type `interface{}` is used.
-   `RunFunc` is responsible for handling how to operate on a `Resource`. Here, `RunFunc` faces a type safety issue: `interface{}` means the compiler knows nothing about the type and can't help. But `RunFunc` must take this type, which could be anything, and do something with it. Therefore, we think it must perform a type assertion. If the `RunFunc` for each resource had to manually assert to a concrete type, it would be very tedious and disgusting. Later, we'll see how Harbor Operator centralizes this dirty work.
-   `Manager` has only two methods: adding a `Resource` and running the graph. We need to study them separately.
-   The data structure `resourceManager` that implements `Manager` is also simple:
    -   A `resource -> blockers` map.
    -   A `resource -> runFunc` map.
    -   A `lock` to handle concurrency for map operations. From this, we can see the author doesn't like `Sync.Map` type data structures that guarantee concurrency safety but lose type safety. This makes us even more curious about how the author handles so many (11 components) `RunFunc`s.

Since it's a Graph, there must be a Graph data structure and a factory method to build this Graph. The `resourceManager` data structure looks a bit rigid; it's uncertain if it's the actual Graph.

<a id="org75cbb07"></a>

#### AddResource

According to the signature, `AddResource` adds the resource itself, all its dependencies, and the corresponding `runFunc`. It's worth noting that resources that don't depend on any other resources (i.e., out-degree 0) must be added first.

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

Almost all the important logic in this package is in the `Run` method. Let's look at the first half:

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

Why are `parent` and `children` channels? Why so many locks? Let's observe the graph construction process:

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

So the dependency relationship is inverted. Now the depended-upon item points to the dependent. For each resource, a `node` is constructed. Simultaneously, for each dependency of the resource, the resource's `parent` channel is added to the dependency's `children`. The final graph is a collection of `node`s.

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

It's very straightforward. For each `node`, wait for its indegree nodes to finish executing, then execute its own `runFunc`, and propagate potential errors to all downstream nodes waiting to execute, terminating them early.

Here, I really don't understand why a topological sort isn't used to solve this classic, well-defined problem.

<a id="orgdcd001c"></a>

#### Initialization

```go
    The GraphManager is initialized using a thread-local global variable. After initialization, it's thrown into the air (ctx), which is a common dependency injection method in various API frameworks.
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

### Maximizing Code Reusability: Controller

Except for the HarborCluster Controller we removed earlier, all component Controllers in Harbor Operator directly compose this same Controller, extracting the common logic of all Controllers, using the same `Run`, the same `Reconcile`. How is this done?

-   What logic was extracted?
-   How are differences handled?
-   What was sacrificed?

<a id="orgbd581d5"></a>

#### Data Structures

The Controller's implementation of the interface, besides implementing `Reconciler`, isn't very interesting. Let's first look at the data structure definition of the Controller:

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

Looking at `BaseController`, it's basically an identity identifier, used to identify the Controller's own information and some label information. So the only possible difference in logic between different Controllers must lie within the `ResourceManager`. `ResourceManager` also looks like a very simple interface. Indeed, the ones that implement `ResourceManager` are the various specific Controllers. We will study a concrete example of `ResourceManager` at the end.

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

So how does the Controller manage to reconcile Harbor's entire family of eleven CRDs along with so many system resources using only one `Reconcile`?

Based on the information we already know, it should be that for each CRD, a `ResourceManager` is used to define the various resources that this CRD needs to create and reconcile. These resources define their dependencies through the dependency graph, and a specific `RunFunc` is written for each CRD to perform the final reconciliation.

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

Very classic Reconcile logic. It seems the trick is in `c.Run`:

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

The last line: `sgraph.Get(ctx).Run(ctx)`. The dependency graph arrives, grabbed from the air (ctx). At this point, this part of the logic is closed-loop. The remaining questions are: How do the various Concrete Controllers that implement `ResourceManager` construct the dependency graph and construct their own `RunFunc`?

<a id="orgb7ed9a6"></a>

### Code as Configuration: ResourceManager

The final step is almost a natural progression.

All Controllers that implement `ResourceManager` should be equal in status. Let's use the harbor core as an example to investigate.

Besides the part used to generate specific K8s resources, we should focus on the part that implements the `ResourceManager` interface.

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

Wow, besides adding resources in order, this is essentially a declarative design. Adding a new Controller would be extremely easy: just know what resources this Controller needs to reconcile; there's no need to manage the specific Reconcile logic.

Wait, don't we need to implement the `RunFunc` ourselves? This is the final question of our source code reading: let's see how Harbor Operator generalizes and abstracts the Reconcile process of any Resource into a single function.

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
2.  The call to `Graph.AddResource` appears. The construction of the `RunFunc` we care about is here; we'll study it later.

First, look at this `Resource`. Remember, in the Graph, since it doesn't care what the Resource specifically is, it was given an `interface{}`. Here, we care more about the Resource, so it's more important:

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

It can be seen that, in essence, it's a wrapper on top of K8s generic resources, with some additional encapsulation by Harbor Operator.

These additional encapsulations are `checkable` and `mutable`.

`checkable` defines the legality check of the resource, which is relatively simple.

`Mutable` looks fancy, but it's actually simple Monad Composition.

---

`Mutable` forms a Monad. Unlike function composition, each composition produces an additional result to express computational side effects, so functions cannot be applied directly and continuously. Some functional languages provide the fish operator `>=>` to implement Monad Compose.

The signature of the fish operator described in Scala syntax is as follows:

```go
    def >=>[A, B, C](f: A => M[B], g: B => M[C]): A => M[C]
```

In plain language, the `mutable` data structure allows many mutation functions to be combined in a certain order, exiting directly when an error is encountered.

---

At this point, the prerequisites for studying how to construct the `RunFunc` are complete. Finally, let's see how Harbor Operator uses these prerequisites to construct the concrete implementation of Reconcile for various, completely different Resources through the same set of logic.

<a id="orgcce49ab"></a>

### The Final Mystery: ProcessFunc

`ProcessFunc` is essentially a higher-order function that uses a closure to capture a `depManager`, mainly used to calculate and change the Checksum of the resource itself and its various dependencies.

The constructed `RunFunc` first checks whether the resource and its dependencies have changed. If not, it simply checks if it's ready and that's it. Otherwise, it updates the Checksum for the next check and then calls `c.applyAndCheck` to actually reconcile the change.

```go
    func (c *Controller) ProcessFunc(ctx context.Context, resource runtime.Object, dependencies ...graph.Resource) func(context.Context, graph