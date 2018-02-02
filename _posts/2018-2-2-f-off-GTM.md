---
layout: post
title: "F-off GTM"
categories: Rants
---

To whoever finds this message, 

I hate with all my heart and soul GTM (Google Tag Manager), its been 2 days now and the layout of this GTM configuration is insane.
After debugging for ages, i've conme to the incredible conclusion that EVERYTHING IS FINE, except it dosnt work :/ .

Still, managed to get GTM preview working in a local vagrant enviroment which is a plus, at least I can see what i'm doing now.

Since I use a vagrant setup in the PHP site, theres blocks of front end stuff (trackers, page elements etc.) that are wrapped in detectors so these arnt seen locally and i can't be bothered to change them around.
So I made a local GTM account with my work email and copied the head and body code into the frame, i'll just remove it when I push live ^_^ same thing for stuff like hotjar, just make sure that when you copy over live configs to remove any id's or key's.

also learnt about some fancy stuff with jQuery, if you were to type the following:

```javascript
$._data('.container', "events")
```

You get a pretty little readout of all the events attached to that object

![GTM-01]({{ "/images/GTM-01.png" | absolute_url }})

Handy when you have some knuckle pull things like this:

```javascript
$('.post').each(function(){
    $(this).on('change', function(){
        console.log('Do a thing');
    })
})
```
or something to that effect, cant remember if this is correct or not + dont care, you get the idea.

