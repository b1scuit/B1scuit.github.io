---
layout: post
title: Raspberry PI over USB
categories: Embedded
---

- [Introduction](#introduction)
- [Step 1 - Make a Rasperian image](#step-1---make-a-rasperian-image)
- [Step 2 - Enable UART on boot](#step-2---enable-uart-on-boot)
- [Step 3 - Getting connected](#step-3---getting-connected)
- [Step 5 - Getting in](#step-5---getting-in)
- [TL;DR](#tldr)

### Introduction
I love the Raspberry PI, I think it's the best thing in electronics since the invention of the transistor, but I have a gripe with it, whenever I want to set one up, play about with one or debug some issues, half the time is spent hunting for HTML cables, power cables, keyboards OTG cables (For the PI zero's) and whatever else, its really annoying and a big roadblock for PI fun.

However, recently I found a really simple solution. just grab a [USB over TTY cable](https://thepihut.com/collections/cables-leads/products/adafruit-usb-to-ttl-serial-cable) (Its actually CMOS but whatever) and follow a really awesome tutorial by [Adafruit](https://learn.adafruit.com/adafruits-raspberry-pi-lesson-5-using-a-console-cable) that can be boiled down to a simple set of instructions.

![The cable]({{ "/images/pi-usb/01.jpg" | absolute_url }})
_Cred: [Pi Hut](https://thepihut.com/collections/cables-leads/products/adafruit-usb-to-ttl-serial-cable)._

>Sidenote:
>I don't recommend powering anything but a PI zero through the USB cable, you can but the PI can draw more than the 500 milliamp serial chip can handle and cause damage in the long term, just don't.

Now, getting this going is nice and simple, I personally use Linux to do all my development on these, since Linux to Linux is just easier and its an OS I know well and what i'll be using for this, for other OS's check out that Adafruit tutorial.

### Step 1 - Make a Rasperian image

Theres loads of ways to do this but the easiest i've found is from a Linux OS, download a copy of Rasperian (Probably spelt wrong, don't care), **NOT NOOBS** from the [official download page](https://www.raspberrypi.org/downloads/raspbian/), I tend to float towards the lite version as I don't often use the graphical desktop and it saves space then plug in a microSD card and write it.

Some handy stuff: 

If you want to see all of the disks attached to your system, use:

```
sudo fdisk -l 
```

From there, you can use `dd` to write the microSD card, I also use `pv` to get a nice little progress bar.

```
sudo apt-get install pv # Install PS
ls -alh # so you can get the size of the image (for PV (the 1500M bit))
dd if=your_image.img | pv --size 1500M | sudo dd of=/dev/sdx
```
Or if you can't be arsed with pv, run:
```
sudo dd if=your_image.img of=/dev/sdx
```
_in short (incase you were wondering) `if` means input file and `of` means output file_

*REMEMEBER: with writing images, refer to the disk (e.g. `/dev/sda`) NOT the partition (e.g. `/dev/sda1`)*

After thats completed, move onto enabling UART on boot

### Step 2 - Enable UART on boot

Right, you now have an image, you should know the device `/dev` entry, so go ahead and mount it somewhere so you can modify stuff, you want to mount the biggest partition (found again with `sudo fdisk-l`).
```
mount /dev/sda1 /mnt
```
_There's a lot of stuff with mount, but it will automatically detect most things, all you need to worry about is the 1st param is the device, 2nd is the location you want it._

Once your mounted, run this:
```

echo "enable_uart=1" | sudo tee -a /mnt/config.txt
sudo umount /mnt
```
_All this does is pops `enable_uart=1` into the bottom of the config.txt file and unmount's it._

From there your all set up software wise as far as the PI is concerned, time for the cable and host.

### Step 3 - Getting connected

Right, even before we begin, heres a quote form Adafruit about this:

>If you do decide to power the Pi from the console cable, **DO NOT** attach the Pi's USB power adapter. If you would rather power the Pi from your USB power adapter then leave the Red lead from the Serial lead un attached.

_source: the guys who know what they're talking about._

Simply, connect the cable so it looks like this (On PI zero, remember don't connect red wire if powering externally or if not Zero etc..)

![The cable]({{ "/images/pi-usb/02.jpg" | absolute_url }})
_Cred: [simonmonk](https://learn.adafruit.com/users/simonmonk) Adafruit._


Now either power on the PI (If powering externally) or plug in the USB and if everything went well, the PI should start booting up, if not, you got a free smoke detector check, you're welcome.

### Step 5 - Getting in

Now for this bit, I use `screen` since its dead simple, so you want to have a look int the `/dev` folder for something with `ttyUSBx` (x being a number) in the name, thats your device.

All you need to remember is one number `115200`, I remember it as `115-200` this is your serial speed, once thats down, you can login simply with:

```
sudo screen /dev/ttyUSBx 115200
```
_You may need to hit enter a few times if its already booted by the time you connect._

And your in and good to go.

### TL;DR
- Make rasperian image on a MicroSD and mount it in `/mnt`,
- `echo "enable_uart=1" | sudo tee -a /mnt/config.txt`,
- Unmount and plug in MicroSD card to PI,
- Plug in TTY cable as in picture and/or power PI,
- `sudo screen /dev/ttyUSBx 115200`,
- Profit.




