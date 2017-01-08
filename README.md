# My Home Automation

This is Felippe Nardi's home automation script. Currently it interacts with
[Complice.co](http://complice.co) to add intentions with the press of an [Amazon Dash Button](https://www.amazon.com/Dash-Buttons/b?node=10667898011).

You are welcome to fork and modify it to make your own home automation system.

## OSX Pre-setup
* Make sure you downloaded Node, which inculdes NPM
* Make sure you have Homebrew
* Install libpcap using home brew: `brew install homebrew/dupes/libpcap`

The libpcap is a library that will watch your network for Amazon Dash Buttons
attempt to connect to Amazon. It is by intercepting these attempts that you
are going to repurpose the button action.

## Linux Pre-setup

```bash
$ sudo apt-get install libpcap-dev
$ sudo apt-get install npm
```

## Setup

* Duplicate `config/default.sample.json` and rename it to `config/default.json`
* Run `sudo node node_modules/node-dash-button/bin/findbutton` to find your amazon dash buttons
* Add your Complice Auth Key and Amazon Button Mac Addresses to `config/default.json`
* Change the `index.js` code so that it matches your button names and the intentions you want to send to Complice

## Running it
Listening for Dash buttons requires root. So you need to launch Dasher with sudo.
```bash
$ sudo npm start
```
