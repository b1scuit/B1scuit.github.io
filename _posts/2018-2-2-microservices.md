---
layout: post
title: What are Microservices?
categories: Random
---

The premise is simple, you have a thing, big thing but its unmanageable and unwieldy (by thing I mean web application) and the thing can only be one thing, microservices change that.

![Example]({{"images/microservices.png" | absolute_url}})

For example, I can have an application that's built in PHP and manages a company, do all there warehouse stuff and reports, etc.

Every time I make a change (through GIT) and push it up the whole app has to be CI checked and pushed out, this is ok for your little blog but for anything larger, this presents an issue, especially if you have a lot of testing steps and procedures.

A microservice is a tiny, tiny application to do one task or manage one thing only, for example, I would have a microservice called stock, this service would be RESTful and allow me to CRUD stock items ONLY, nothing else, possibly using something like [lumen](https://lumen.laravel.com/) I can then test, deploy and manage this separately from the rest of the application.

An example of where this is useful is, for example, the big evil boss man says "I've heard of this machine learning thing, do that for the reports" now [weka](https://www.cs.waikato.ac.nz/ml/weka/) would be awesome at this, unfortunately, this is a Java thing where your application is a PHP thing, with microservices, you can have your app call a Java "reports" microservice that will RESTfully get its data from the stock microservice and RESTfully send the results back to the caller after, tada, you now open your application up to all programming languages that can handle REST stuff.

![many many things](http://mherman.org/assets/img/blog/docker-microservices.png)

Now you may be thinking "Well if I break down everything to microservices, that's going to be a lot of servers and deploying that would be mental", true, however as SOA (Service Orientated Architecture) has taken off in recent years, there are tools that can help, personally I prefer the docker everything up method and use something like a [kubernetes](https://kubernetes.io/) cluster to manage it all, that way you can get your CI/CD system to automatically build the images and push them out.

Overall, microservices allow for small, isolated applications that can be independently maintained, tested and deployed allowing for a more scalable system, instead of one monolithic thing.

This came off of this blog post, that I found quite funny [https://circleci.com/blog/its-the-future/](https://circleci.com/blog/its-the-future/)
