---
layout: post
title: Kubernetes, a development guide
categories: Kubernetes
---
Well, this is a thing, I have a simple set up I want to achieve, what I want to be able to do is deploy the application I work on as a dockerized application, that way I can replicate and load balance multiple instances of the application and have a bit better delivery assurance about how the application is going to work in a production environment as well as helping to microservice everything later on.

Now to let you know the tools which I'll be using to achieve this, I have a production [Kubernetes](https://kubernetes.io/) cluster with [Google cloud](https://cloud.google.com), however at some point, this may be moved to a custom server setup, I use [gitlab](https://about.gitlab.com/) for all the GIT repo stuff and ticket tracking, PRs etc.  I use [vim]({{ site.baseurl }}{% post_url 2018-2-2-Why-Vim %})
 as my day to day IDE and [minikube](https://github.com/kubernetes/minikube), to get a development environment as close to a production environment as I can manage.

![Kubernetes](https://d33wubrfki0l68.cloudfront.net/1567471e7c58dc9b7d9c65dcd54e60cbf5870daa/a2249/images/flower.png)

The advantage of using Kubernetes for this application is (when set up right) it gives me a simple way to manage loads of instances so should I lose a server or whatever, then the application won't go down, as this is in the medical industry, downtime is not really an option.

I'm also incredibly impatient and I tend to work with a skeleton crew for most of the time, I prefer an infrastructure that can take care of its self, ultimately, I want an environment that once I've clicked on the big green "Merge PR request" button, everything from there to it being live on the servers is an automated process, this includes the docker container builds, any scripts or database changes that need doing, any code checks that are needed and any deployment tasks.

That way myself and the other developers on the project can get code and changes out faster and easier, with fewer screwups, I also want a development environment that's easy to manage and mimics the production environment as closely as possible.

The way I plan to actually get this done is dockerize and contain the existing monolith application and build all the scripts needed to get it to work with this new infrastructure, that way, I can get round to breaking the monolith down and microservice it over time.

![LOC]({{"images/loc.png" | absolute_url}})
_One part of quite a substantial app for a small dev team._

Now the application needs some other servers to run correctly, it needs a [Redis](https://redis.io/) cache cluster, a [RabbitMQ](https://www.rabbitmq.com/) cluster, a [MySQL](https://www.mysql.com/) database cluster, a [CouchDB](http://couchdb.apache.org/) server, a load balancer, a file server and a couple of web servers (which at the time are [NGINX](https://www.nginx.com/) and PHP 7.1).

So a lot of pieces to this puzzle, I think for starters I'll build up a basic PHP NGINX docker, just pushing out a `<? phpinfo(); ?>` and a MySQL connection example then get a MySQL server sitting on it. probably will adopt something like [this](https://semaphoreci.com/community/tutorials/dockerizing-a-php-application).

From there get a couple of MySQL servers talking with each other and get the PHP docker to use a shared folder (Will be crucial later since I want to ditch the file server and use a shared persistent storage). I've found a good example setup for WordPress [here](https://kubernetes.io/docs/tutorials/stateful-application/mysql-wordpress-persistent-volume/).

After having a LAMP stack on the go (or LNMP I guess technically) I'll be able to just add in the Redis, RabbitMQ and CouchDB stuff and finish off with getting the monolith docker'd.

Now there are some complications I can see straight away, for example, the monolith uses a dynamic host to determine which user is connected and where they should go, for example, company1.app.com will have a different database and visual look to company2.app.com even though they are the same base application.

![URL Layout]({{"images/url-layout.png" | absolute_url}})
_Current layout for staging sites, really need to change this_

What happens is the web server passes the first part of the domain name to the app and the app looks up a configuration entry in the CouchDB database e.g. a document called company1 that contains all the configuration information for that instance, this saves having to deploy an application out for each and every client of the site, I currently have no idea what I`m going to do to solve that one.

Either way, stick around, should be a fun road ahead, Dorothy.

[Dockerizing a PHP web app](2018-2-5-Dockerizing-Basic-web-app)
