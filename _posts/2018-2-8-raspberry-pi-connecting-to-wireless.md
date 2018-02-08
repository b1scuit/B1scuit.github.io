---
layout: post
title: Raspberry PI connecting to wireless via CLI
categories: Embedded
---

- [Introduction](#introduction)
- [TL;DR](#tldr)

### Introduction
Connecting a raspberry PI to wireless is easier than you think, you can use

```
sudo iwlist wlan0 scan | grep ESSID
```

To get a nice and easy list of all the wireless networks the pi can see, then 

```
wpa_passphrase "your_essid" "your_password" | sudo tee -a /etc/wpa_supplicant/wpa_supplicant.conf
```

Then run 
```
wpa_cli -i wlan0 reconfigure
```
To get you all connected, from there just use `ifconfig wlan0` to see if you have an IP.

Thats it, all there is to it.

### TL;DR
- `sudo iwlist wlan0 scan | grep ESSID`
- `wpa_passphrase "your_essid" "your_password" | sudo tee -a /etc/wpa_supplicant/wpa_supplicant.conf`
- `wpa_cli -i wlan0 reconfigure`
-  Profit

