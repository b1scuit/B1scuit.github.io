---
layout: post
title: Dockerizing a basic PHP/NGINX web app
categories: Kubernetes
---
- [Introduction](#introduction)
- [Step 1 - A place to stay](#step-one---a-place-to-stay)
- [Step 2 - the web app](#step-2---the-web-app)
- [Step 3 - Dockerizing](#step-3---dockerizing)
- [Step 4 - Moment of truth](#step-4---moment-of-truth)
- [Step 5 - Automation](#step-5---automation)

### Introduction
So I guess this is step one in the whole Kubernetes series (if you can call it that), now I'm no pro when it comes to dockers, like friends, my other half and a social life, I don't really understand it so it scares and confuses me, however in an effort to get this thing up and going I need to be able to manage a PHP app with GIT and have it docker it's self so I can push  it out later on, now I've found [this tutorial](https://bitpress.io/simple-approach-using-docker-with-php/) and [this one](https://kubecloud.io/minikube-workflows-d7166e1da290) and it will be the base I base this off of (with some modification).

For this, you will need a gitlab account set up with GIT and docker installed on your system, also I'm assuming some basic knowledge of GIT, terminal and the web dev basics.

### Step one - A place to stay
First I need a place to host everything while I'm doing this, so I'm using [gitlab]() to host it, its free and comes with a CI/CD thing which helps a lot. So firstly, create a new repository, just calling it "test" or something like that, for this demo, a private repo is fine.

![Test repo creation]({{"images/docker-web-app/01.png" | absolute_url}})

Now, when you go to the repo's homepage, you will see a ton of different commands to get things going, you don't need to do any of them if you have an SSH key on your profile (which you should do because you're a good developer), all you need to are these commands in a terminal.

```
git clone SSH_REPO_URL.git
cd FOLDER
```
You'll get a warning about cloning a blank repo but that can be ignored, I normally create a quick README just to shut it up and check that everything's pushing to the right place.

```
echo "New project" > README.md
git add .
git commit -m "README"
git push
```

![Shows readme in root of project]({{"images/docker-web-app/02.png" | absolute_url}})

Fantastic, we now have a working blank project, time for step 2.

### Step 2 - The web app

Now the repo is sorted, we need something to dockerize, for the moment, I'll just create a very basic PHP info thing, I can always expand on this later, that is the point after all.

So (if your following along) create an `index.php` with the following:
```
<?php phpinfo(); ?>
```

That's all for the file, I'd push that up for the moment, as any PHP dev will know, should this be working, it will just spit out a load of information on the current versions of everything.

Now we have a repo with a "web app" sitting in it, time to get it doing something!

### Step 3 - Dockerizing
Now, docker's going to need its own files to do its thing, so for this ill put them in a `.docker` folder, it's out of the way and I can always get to it later.

```
mkdir .docker
mkdir -p .docker/root/etc/nginx/sites-enabled
touch .docker/Dockerfile
touch .docker/root/etc/nginx/sites-enabled/default
```

Quick rundown about what this just did, `mkdir` makes the `.docker` directory, so everything's in the right place, `touch` just means "create an empty file", `Dockerfile`, is the file docker will use for its instructions, the whole root folder thing is for a handy way to manage config files I'll cover in a bit.

NGINX is simple to manage, just copy this into the `root/etc/nginx/sites-enabled/default` file:

```
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    root /var/www/html;
    index index.php;

    server_name _;

    location / {
        try_files $uri $uri/ =404;
    }

    location ~ \.php$ {
        include snippets/fastcgi-php.conf;
        fastcgi_pass unix:/run/php/php7.1-fpm.sock;
    }

    location ~ /\.ht {
        deny all;
    }
}
```

For the docker file I had a look about and found [this](https://hub.docker.com/r/webdevops/php-nginx/~/dockerfile/) so with a bit of tweaking, I'll be able to use this to direct my own, don't get me wrong there are [others](https://hub.docker.com/r/richarvey/nginx-php-fpm/~/dockerfile/) but it's got way too much crap in for what I'm trying to do and I'm bordering confused already, I don't need a docker file pushing me over the fence, I'm sure it's great, just not for me.

So I'm basing my docker file off of the basic ubuntu image (to keep things clean), so all I need to do is set up what I want and change the settings about.

```
# Base image to start from
FROM ubuntu:latest

# Stops tones of errors in console
ENV DEBIAN_FRONTEND noninteractive

# Replace any config files with out own 
COPY .docker/root /

# Standard install of stuff
RUN apt-get update
RUN apt-get install -y software-properties-common python-software-properties
RUN apt-get install -y nginx curl
RUN LC_ALL=C.UTF-8 add-apt-repository -y -u ppa:ondrej/php
RUN apt-get update
RUN apt-get install -y php7.1-fpm
RUN apt-get install -y php7.1-cli php7.1-common php7.1-json php7.1-opcache php7.1-mysql php7.1-mbstring php7.1-mcrypt php7.1-zip php7.1-fpm php7.1-ldap php7.1-tidy php7.1-recode php7.1-curl

# Patch in composer
RUN mkdir /tmp/composer/ && \
    cd /tmp/composer && \
    curl -sS https://getcomposer.org/installer | php && \
    mv composer.phar /usr/local/bin/composer && \
    chmod a+x /usr/local/bin/composer && \
    cd / && \
    rm -rf /tmp/composer
RUN apt-get autoremove -y
RUN chmod 666 -R /etc/nginx/sites-enabled
RUN rm -Rv /var/www/html/

# Patch in our site code
COPY . /var/www/html

# start PHP FPM and NGINX
CMD /etc/init.d/php7.1-fpm start && /usr/sbin/nginx -g "daemon off;"

# Tell Docker what ports to show off
EXPOSE 80 443
```

Nice and simple docker, the `FROM` tell's it where to start off, the `COPY` just tells it where to copy the local stuff to inside the container and the `RUN` just runs a Linux command.

> SideNote:
> THING TO BARE IN MIND, docker only stores a recordable software state, not running services, if you start or run any services, these DO NOT get preserved, hence the weird `CMD /etc/init.d/php7.1-fpm start && /usr/sbin/nginx -g "daemon off;"` stuff, 

Now, that root folder, this is a way where you can replicate filesystem locations for config files, a really simple method for doing this and the `COPY .docker/root /` sorts it all out, just make sure you set whatever needed permissions in the `RUN` command.

Now I know this allows for all the docker files and stuff you may not want in your web folder to be seen by NGINX, but with a small tweak to the paths, you can have it showing and hiding what you like, just for this example, that doesn't really matter, this is only a proof of concept demo after all.

Now its time to see if it all works, you can build the image if you run:
```
docker build --file .docker/Dockerfile -t test .
```
This basically tells Docker to build a container using our docker file, name it "test" and the `.` at the end means from a local context, please make sure you're in the root folder of your repo for this.

![Shows docker output on a successful build]({{"images/docker-web-app/03.png" | absolute_url}})
_If the result looks something similar to this, you did everything right, have a celebratory coffee!_

> Sidenote: 
> Should you want to delete the local docker image, you can just use `docker rmi test` or whatever you called it.

Now your app is dockerized, time to check if it all works, on to step 4

### Step 4 - Moment of truth

Running the container you just built is easy, just open a new terminal and type:
```
docker run --rm -it -p 8080:80 test
```
_Quick command rundown: `docker run` runs a docker (surprisingly), `--rm` means run it until I exit, then remove it, `-it` means give me a shell, `-p 8080:80` means to map the host's port 8080 to the container's port 80 and finally `test` is the image name_

Now if you visit `http://localhost:8080` you should have a running docker (that is until you press CTL-C) and it should look like this: 

![The result of our hard work]({{"images/docker-web-app/04.png" | absolute_url}})

Sweet, all up and running, now to make Gitlab do the last bit for us.

### Step 5 - Automation
Now, for this we need to make a personal access token the CI/CD pipeline can use to build our image, so if you navigate to `https://gitlab.com/profile/personal_access_tokens` and make one with just everything for the time being.

![Creating an access token]({{"images/docker-web-app/05.png" | absolute_url}})

Now we need to make the CI/CD stuff see it, so if you go to your project, then go settings > CI/CD Settings and expand secret variable and add your token as the value and just call it something sensible, in this example I've used `-` but gitlab made me change it to `_` because reasons.

![adding an access token]({{"images/docker-web-app/06.png" | absolute_url}})

Now to start building the `.gitlab-ci.yml` file, this is the file it looks to do all of its CI/CD stuff.

So from the project root make a new file called `.gitlab-ci.yml` and open it in a text editor, then add this:

```
image: docker

stages:
  - publish

publish image:
  stage: publish
  services:
   - docker:dind
  script:
    - echo $Docker_Access_Token | docker login -u gitlab-ci-token --password-stdin registry.gitlab.com
    - docker build --file .docker/Dockerfile -t registry.gitlab.com/chickenbiscuit/test-docker .
    - docker push registry.gitlab.com/chickenbiscuit/test-docker
```
_Obviously change the `registry.gitlab.com` links to your own, these are normally available on the project's registry page_

The reason we echo the token is it prevents the possibility of the token being seen on the CLI output of the pipeline.

Once you git add/commit/push with the`.gitlab-ci.yml` file included, it will kick start a CI/CD pipeline, (yes it took a couple of attempts to get this working) you can see this in your project's pipelines

![When a pipeling passes]({{"images/docker-web-app/07.png" | absolute_url}})

And now in your registry, you should see a brand new docker image available, happy days!

![oh jesus yes]({{"images/docker-web-app/08.png" | absolute_url}})

Sweet! we now have a docker image where each time we push up to the repo, it will automatically build and publish the new image, and we have a system in place to run it locally for development, yes this is a bit cumbersome at present, however, I have plans to streamline that.

[Local development with Kubernetes and Docker]({{ site.baseurl }}{% post_url 2018-2-6-Local-development-with-Kubernetes-and-Docker %}).
