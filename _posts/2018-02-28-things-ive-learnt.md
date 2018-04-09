---
layout: post
title: Things ive learnt in the web dev industry
categories: Random
---

- [Introduction](#introduction)

### Introduction
I've been working as part of a company in the web development industry for nearly a year now, I jumped in straight after completing my degree in software engineering, however I've learnt loads more since being here, heres some of the new crap now rattling around in my head.

### GIT add . 
This is your mortal enemy in development, I've lost track the number of times I've accidentally added something I didn't want to, it makes PR's messy and you end up with loads of commits called "Reverting debug" or something similar, its a lot easier just to use `git gui` and just add and commit what you want to, DON'T use `git add .`, its fine for personal projects and hackabouts but not for a working environment.

### PR'ing
Some places prefer you get a PR up as soon as possible, there is no need for this, by all means create your branch and start your work but you DO NOT need to make a PR within the first 30 seconds.

On another side note, have a decent template so your PR's cover what they need to, then you can just paste this in when you get around to making a PR, mine looks similer to this:

```
#### Ticket reference : [#1234](http://link-to-ticket.local/)
#### [ ] Any Database modifications?

#### Purpose
_What's the point of this?_
#### Validation steps 
- [ ] Example 
##### Open Questions and Pre-Merge TODOs
_N/A_
#### Solution
- Example point 

#### Steps to identify problem
- Example step 

#### Links
_N/A_
#### Included individuals
_N/A_

```
This allows the reviewing developer to understand whats going on quickly and easily, it's a massive time saver when reviewing.

### Warm and Fuzzy
Now I use vim as my day to day IDE, its quick and amazing, however the file explorer can be a bit weak, so I use `FZF` for all my fuzzy finding needs, its really fast and quick, really speeds up finding and navigating your repo's, plus it has a vim plugin so thats nice.

### KISS me 
I'm sure you've heard this one before; KISS, Keep It Simple Stupid, sometimes you may come up with an amazing and scalable solution that is elegant and complex, however you've now spent 2 weeks on this where a 5 minute fix would have been more than suitable, effectively time wasted, no matter how good your implementation is, useless, basically don't overcomplicate what you don't need to.

For example you have a customer who wants to rename a form field when you're using a framework like CakePHP, instead of ripping through the whole application and renaming anything, just put a label on the form field, simple.