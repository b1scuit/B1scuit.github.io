---
layout: post
title: Poker 01 - Solving a problem
categories: Pojects
---

Recently at work, I was playing poker with my colleagues when the unthinkable happened.
LifePoker when down...

Now, just to clarify some stuff, this wasn't the exciting, lose all my money poker, it was the less but still exciting [sprint poker](https://www.mountaingoatsoftware.com/agile/planning-poker), a way in agile development to get better predictions on the amount of effort a task will take.

Whilst in the call with the client planning the next sprint my sprint master offered the idea one of us build a new one (We are a web development company after all) and I decided to rise to the challenge.

I needed to find a way for multiple clients to communicate with each other in real time and needed to keep things simple, after all, I didn't want this to take up too much time.

After looking around at what was able to accomplish this, I settled on a NodeJS implementation using the [ws](https://www.npmjs.com/package/ws) package, I was planning to use WebSockets but I just don't click on the library, it annoys me and I cant work with it, there's nothing wrong with it, I just don't work with it.

Anyway, with all of this played out, I opened a blank NPM project and make a basic HTTP server to serve the applications only webpage, a page designed to mimic the old life poker interface as much as possible, this is why I chose to use bootstrap, it's simple and what LifePoker was using anyway, so I spent not very long making a simple interface with 2 modals, one for the users name and one for the poker results.
And yes, of course it dosn't have the black box there, have to protect the clients ya know ;-).

![image]({{"images/poker-interface.png" | absolute_url}})

(btw the batman is the idk of sprint poker)


From this I set up a small was a server using nodeJS and basically made a bouncer, whatever message it received, it bounced it to all attached clients.

This created some problems, for example, if someone joined halfway through, clients would be missing, or if they left, everyone would be stuck with them and you would never see the results, this wouldn't do.

Currently, I'm in the process of storing a table of client messages on the server in an [SQLite database](https://www.sqlite.org/) and this can then catch up anyone new and remove anyone old, however, I currently have an issue where it won't send out the client messages after pulling them from the DB.
```
    console.log('[SERVER] Letting everyone know');
    db.all('SELECT * FROM clients', function(err, rows){
        var res = JSON.stringify(rows);

        console.log(wss);
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.message(res);
            }
        })
    })

```

Still, it is a work in progress, and I'll be sure to add an update when I figure it all out, the answer is probably at the bottom of a can of red bull or cup of coffee somewhere.
