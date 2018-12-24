# bdsd - mqtt

This module runs a gateway to communicate with the bobaos module using MQTT protocol.

The communication is done through two different topics:

{topic}/knx2mqtt
Topic used by bdsd.mqtt daemon to publish all the bobaos daemon events. 
{topic}/mqtt2knx
Topic used to send messages to the KNX bus. The bdsd.mqtt daemon is subscribed to this topic and forwards all the messages to the KNX bus using using the bobaos daemon.


# Requisites

You must have installed bobaos.sock and the daemon must be running in order to execute the mqtt gateway.

If not, follow instructions on [bobaos repository page](https://github.com/shabunin/bobaos#installation)

## Installation via script

```
$ curl -L https://raw.githubusercontent.com/bobaos/bdsd.sock/master/bdsd_install.sh | bash
```

## Manual installation

**1. Install npm package**

```
$ sudo npm install -g bdsd.mqtt --unsafe-perm
```

Check if it executes correctly:

```
$ bdsd.mqtt
```

See bdsd.mqtt command line arguments:.

```
$ bdsd.mqtt --help
```

**2. Create systemd service folders, create service file**

```
$ cd ~/
$ mkdir ~/.config/systemd
$ mkdir ~/.config/systemd/user
$ touch ~/.config/systemd/user/bdsd.mqtt.service
```

Then add following to this file using your favourite text editor:

```
[Unit]
Description=KNX MQTT Gateway for Bobaos Datapoint Sdk Daemon

[Service]
ExecStart=/usr/bin/env bdsd.mqtt -h 192.168.1.12

[Install]
WantedBy=default.target
```

**3. Enable service, enable automatic start-up**

```
$ systemctl --user daemon-reload
$ systemctl --user enable bdsd.mqtt.service
$ sudo loginctl enable-linger pi
```


**5. Check with mqtt clients**
TODO