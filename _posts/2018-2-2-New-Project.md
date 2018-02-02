---
layout: post
title: Tester 01 - Starting a new project 
categories: Pojects
---

Testing, the pain in the ass word for any developer, we've all been there, waiting forever for a CI setup to test our code only to have it rejected because the 200 lines of new functionality you've added is missing a dockblock or has a trailing space, leading 
to loads of commits along the lines "PHPCI", "Something", "CI", "another bloody space" etc...

Anyway, another side to testing is functionality, now I havnt really come across many testing tools with what I have in mind.

I would like to have an online interface to manage everything and pull out some reports however I would like the tests themselves as accessable as possible,

So Away things go, I've planned out a MySQL schema:

![Schema]({{ "/images/tester-schema.png" | absolute_url }})

Fairly simple schema, nothing fancy, however the magic comes with the live preview.


![Demo]({{ "/images/tester-little-demo.png" | absolute_url }})

This timy popup will be a tooltip with all the testing information and a pass/fail button, that way anything a user has assigned a test for and given a page element, will show with these tooltips, allowing for much faster testing :-).

I might build the base with [CakePHP](https://cakephp.org/) Its something I know well and have been working with for a long time.

I'll be able to create the schema and then just bake out most of the admin panel, it is simple CRUD after all.
