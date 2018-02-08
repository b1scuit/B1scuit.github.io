---
layout: post
title: Local development with Kubernetes and Docker
categories: Kubernetes
---

- [Introduction](#introduction)
- [Step 1 - Kickstarting](#step-1---kickstarting)
- [Step 2 - Implementing the basics](#step-2---implementing-the-basics)
- [Step 3 - Getting inside the VM](#step-3---getting-inside-the-vm)
- [Step 4 - The first of many services](#step-4---the-first-of-many-services)
- [Step 5 - The first of many Deployments](#step-5---the-first-of-many-deployments)
- [Step 6 - The first of not so many load balancers](#step-6---the-first-of-not-so-many-load-balancers)
- [Step 7 - Tying it all together](#step-7---tying-it-all-together)

### Introduction
If you're following on from the last tutorial/how to 'thing', you should have a test repo set up with a self-updating docker image, however when developing locally, were constantly using `docker build` and `docker run` to change anything on the site, considering how long this takes, it can get very annoying very fast and I did elude into streamlining this process.

I would like to take this opportunity to invite onto the stage; [Minikube](https://kubernetes.io/docs/getting-started-guides/minikube/).

Minikube basically will hook into a VM provider (VirtualBox for example) and provide a local Kubernetes cluster, this will be what we use for local development, giving us as close to production as we can manage.

Now, something to note here, I did look into (And even set up) Helm, but after about 4-6 hours of frustration with it, I eventually gave up, all I discovered is Helm somehow managed to make YAML, a simple and easy to read format, confusing and irritating, pointless, so for this I won't be using it and I'll be using a custom deployment solution using just straight YAML.

### Step 1 - Kickstarting

Since now we have the main tool for the job, much like a car or chainsaw, it needs to be started up before it's useful, so go ahead and type:
```
minikube start
```
This will create the VM using your particular provider, set everything up and initialise the kubernetes cluster

>Sidenote:
> Do be aware, this is a single node only inside a VM, I'd avoid pushing it to the max (except load testing later).

>Other Sidenote:
> You can use `kubectl config current-context` to figure out of you are connected to a Kubernetes cluster

If it looks like the below, you're all up and running, happy days +1 coffee!

![Shows everything set up right ]({{"images/local-development/01.png" | absolute_url}})

### Step 2 - Implementing the basics

Now Kubernetes is an "ideal state" based system, basically, what this means is you feed it a load of configuration files (in this case YAML files) that say how you want the system to be, i.e. you want 3 site containers, a load balancer, MySQL with local only access etc. and Kubernetes runs a loads of stuff to make it happen, that way in a production enviroment, should you lose a node (server basically) then all the little gnomes in the cluster will try their best to get the system back to your desired state.

Also through all of this, we need to have a way we can quickly update the site for local development. What I'm looking to do is have the cluster pull from the online repository by default and then we can override the containers with our own local copies, this allows us to make system and infrastructure modifications quickly and simply.

> Sidenote:
> In a production environment, you would NOT keep all your deployment YAML files in your project repo, mainly because if you're doing things right, you should have loads of project repo's, however since we have only one right now, we can just use that.

So to start with we need a Makefile, this is a file that contains a load of quick commands we plan to use often, now in this step I'll explain them all first and then we will move on, if you're after a quick setup, copy-paste and move on.

All that's needed is for you to make a file in the root of your project folder called `Makefile` (Capital M on that one) and fill it with this:

```
.PHONY: local localise mount create secrets delete deleteCluster createCluster
REPO=site
TIMESTAMP=tmp-$(shell date +%s )

local:
    @eval $$(minikube docker-env) ;\
    docker build -t $(REPO):$(TIMESTAMP) -f .docker/Dockerfile .
    kubectl set image -f ./.kubernetes/deployments/Site.yaml site=$(REPO):$(TIMESTAMP)

localise:
    kubectl set image -f ./.kubernetes/deployments/Site.yaml site=$(service)

create:
    # Create the drives, services and deployments
    @eval $$(minikube docker-env) ;\
    docker build -t $(REPO):create -f .docker/Dockerfile .
    @echo "Setting up cluster services"
    kubectl apply -f ./.kubernetes/services
    @echo "Setting up cluster deployments"
    kubectl apply -f ./.kubernetes/deployments
    @echo "Setting up Ingress"
    kubectl apply -f ./.kubernetes/ingress

delete:
    kubectl delete -f ./.kubernetes/

secrets:
    # Create a secret for the root password
    kubectl create secret generic mysql-pass --from-literal=password=root

mount:
    # Create a folder in /Users and make it available to the pods
    $(shell sudo mkdir /Users/.minikube-mounts)
    $(shell sudo ln -sn ${PWD} /Users/.minikube-mounts/site)
    @echo $(shell ls /Users/.minikube-mounts)

deleteCluster:
    minikube delete || true

createCluster:
    minikube start

enableAddons:
    minikube addons enable ingress
    minikube addons enable heapster
```
OK here it goes:

`.PHONY` This basically tells make to not think of any of those commands as files, long story.

`REPO=site` This is just what I've decided to call the local image repository, makes naming images quicker.

`TIMESTAMP=tmp-$(shell date +%s )` This is used later to make images with an up to date tag, otherwise if you tag any images with the same, Kubernetes won't see a difference, assume nothing's changed and won't implement the changes you've made.

`local:` OK, this function changes the current docker environment to one the cluster can "see" and builds you a docker image tagged with the time, then it tells the cluster to set the "site" deployment to this one, the cluster then thinks there is an update and rolls out the new docker image to the cluster.

`localise:` This was a quick function I put in as in future I plan to have the cluster default to the online repository for all the microservices and then I can tell the cluster to use the local docker images on a container by container basis.

`create:` Now, this is a big one, that does a lot, for starters, it updates the docker environment to the one the cluster can see, then it builds your local docker image into that environment.

From there it will cycle through each folder implementing the configuration files held inside, it's in here the magic happens and your cluster is set up just how you want it, you shouldn't need to run this often, however, if you want to quickly rebuild a broken cluster, then you can with `make create`.

`delete:` Nice and simple one, basically just tells Kubernetes to dump all the configs and drop everything, it's the undo button for `make create`

`secrets:` When you come to install MySQL on the cluster you can hold some configuration settings in secrets, now these are visible through the dashboard, however, there are things you can do for that, so I'm using this in such a way where a developer can find out what the passwords are for MySQL easily.

`mount:` This is a strange one and exclusive to minikube, what this does is makes a folder in `/Users` and symlinks whatever folder you keep the site in to it, the reason for this is minikube shares the `/User` folder by default to the VM (or `/home` for Linux and windows, I have no idea), this gives us a way to have our local site bolted on top of the containers copy so we can live edit stuff.

`deleteCluster:` delete, but with a bit more power, this actually deletes the minikube MV (don't worry, it doesn't uninstall minikube) so should you need a hard reset, this is yer man.

`createCluster` shouldn't need to explain this one, it's just a quick shortcut and a placeholder should you have any special setup requirements.

`enableAddons` These commands don't matter right now, however later on these are going to give you a lot of fun.

### Step 3 - Getting inside the VM

Now that's out of the way, we can actually use it, so for starters we need to have our "web app" visible from inside the VM, so if you type
```
make mount
```
This should sort out your directory and make a folder in `/Users/.minikube-mounts/site` where you should be able to see your site, to double check it is in fact there, you can type `minikube ssh` to get a shell on the VM and just check the folder is there and you can see everything you will need.

Nice and simple, now its ready for a deployment to pick up and use.

### Step 4 - The first of many services

From inside your root project folder, type the following:
```
mkdir -p ./.kubernetes/services
mkdir -p ./.kubernetes/deployments
mkdir -p ./.kubernetes/ingress
```
This will create a basic organisational structure I'll be using throughout this, now in a full microservice system, these should be in their own repo then when your build has finished, you call a hook to trigger a deployment but as for this we only have one "web app" it shouldn't matter to start with.

Now we're ready to get it doing something, something to bear in mind, when deploying to a Kubernetes cluster *CREATE YOUR SERVICES FIRST*, this way your cluster knows how to distribute your deployment's pods across your nodes, if you deploy first, your cluster could put them all on one node and if that node fails, your screwed since all your pods died with it.

In your `.kubernetes/services` folder, go ahead and create a file called `Site.yaml` and fill it with this:

```
apiVersion: v1
kind: Service
metadata:
  labels:
      run: site
  name: site
spec:
  ports:
  - port: 80
    protocol: TCP
    targetPort: 80
  selector:
    run: site
  type: NodePort
```
This is why I've been hesitant to call our web app a service since there needs to be a distinction between this and the site.

This will create a service called Site, you can have as many pods as you like behind this, it doesn't matter, the rest of your infrastructure will just reference this 'Site' service which deals with getting the request to your pods on its own.

The only thing to pay attention to that isn't that obvious is the `selector.run` part, this references a deployment, you will need to change this to whatever you need.

### Step 5 - The first of many Deployments

So, now we have a service referencing a deployment that doesn't exist, next step is to make it, so if you go ahead and make a file in `.kubernetes/deployments/Site.yaml` (I like to keep everything paired up with the same names) with the following:

```
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    run: site
  name: site
spec:
  replicas: 1
  selector:
    matchLabels:
      run: site
  template:
    metadata:
      labels:
        run: site
    spec:
      containers:
      - image: site:create
        name: site
        ports:
        - containerPort: 80
        volumeMounts:
        - mountPath: /var/www/html
          name: site-volume
        resources:
          requests:
            cpu: "100m"
            memory: "100Mi"
          limits:
            cpu: "200m"
            memory: "100Mi"
      volumes:
      - name: site-volume
        hostPath:
          path: /Users/.minikube-mounts/site
```

I'll probably have a follow-up post about what this is all about and how it works, later on, however at the moment, this post is getting long enough already, so let's keep it short.

The only line to pay attention to now is the `HostPath` at the bottom, this references the path we set up with that `make mount` command earlier, what this does is create a volume called `site-volume` which we can mount to anywhere, then in the deployment config (under `volumeMounts`) we tell it to use `site-volume` and mount it on `/var/www/html` (our web files directory), this is how we can live edit files from inside a container, by mapping our repo on top of the container's copy of it.

Now in a later how to (the one where I'll go into more detail about deployments) I will be looking into the deployment retrieving a live image first, then we can overlap our local docker image on top of it and then map our site on that, its incredibly convoluted to think about but its the easiest way to get our local configuration to mimic our production's.

### Step 6 - The first of not so many load balancers

i know, i know, your probably thinking "Biscuit you intelligent and hansom devil you, you should know you don't need to load balance a single deployment like that" (or something to that effect) well, hear me out, i'm not saying this is a crucial component yet, however we need to plan to expand so I'm putting one in for the moment, granted it wont be doing much however later on, believe me, it's going to pull its weight.

Now, for this, I'll be using an NGINX Ingress load balancer, it's simple to set up and powerful in what it can do. So add another file in the ingress folder `.kubernetes/ingress/HTTP-Ingress.yaml` and pop this into it:

```
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: http-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
spec:
  backend:
    serviceName: site
    servicePort: 80
  rules:
  - host: testsite.local
    http:
      paths:
      - path: /test
        backend:
          serviceName: site
          servicePort: 80
      - path: /bar
        backend:
          serviceName: s2
          servicePort: 80
```
_In the bottom part it references a service called `s2`, this doesn't exist yet, however it helps show the example i'm trying to explain_

### Step 7 - Tying it all together

Now Kubernetes has it's own internal DNS service that manages referencing pods, services, deployments etc. inside the cluster (comes in real handy later) however ingress would prefer we have a DNS name to point to the cluster, so in this example i've used `testsite.local`, but you can change this to whatever you like.

To get minikube to tell you what IP it's sitting on type 
```
minikube ip
```
And miniKube should spit out the IP of the VM, looking a little like this:

![Shows the IP]({{"images/local-development/02.png" | absolute_url}})

Now you should add this to your `/etc/hosts` file to ensure all DNS requests for your cluster site go to the right place, an easy way to do this is:

```
echo "$(minikube ip) testsite.local" | sudo tee -a /etc/hosts
```
_If you don't know the [`tee`](https://linux.101hacks.com/unix/tee-command-examples/) command, LEARN IT, it's a real convenient option._

At this point, if you visit http://testsite.local in your browser, the cluster will just reject the request, since you havnt actully deployed anything yet, time to change that! just run

```
make mount
make secrets
make create
make local 
```
_This (in order) makes your mount folder, implements any secrets you may need, creates an initial local docker image (as a fallback) and implements your cluster, then builds a new tagged docker image and tells the cluster to use that instead_

Now when you visit http://testsite.local you should see your lovely PHP info page and since it's all localised, you should be able to edit the `index.php` file and see changes on a page refresh, nice and simple for local development.

Fantastic, all up and running locally, now granted this wouldn't work if you attempted to publish it, however we will get to that, now, the next step is getting a database deployment up and going and get the two chatting.
