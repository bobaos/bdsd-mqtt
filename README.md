# bdsd - mqtt

This module runs a gateway to communicate with a KNX bus using MQTT protocol. It uses bdsd.sock to send and receive messages from the KNX bus, so the bdsd.sock daemon must be installed and running. Please see https://github.com/bobaos/bdsd.sock for more information.

See the communication diagram:

![alt text](https://raw.githubusercontent.com/serbande/bdsd-mqtt/master/bdsd.mqtt.diagra.png) 

As it is shown in the diagram there are two different mqtt opics:

* **{topic}/knx2mqtt**
  * Topic used by bdsd.mqtt daemon to publish all the bobaos daemon events. 
* **{topic}/mqtt2knx**
  * Topic used to send messages to the KNX bus. The bdsd.mqtt daemon is subscribed to this topic and forwards all the messages to the KNX bus using using the bobaos daemon.

## Manual installation

**1. Install npm package**

```
$ sudo npm install -g bdsd.mqtt --unsafe-perm
```

Check if it executes correctly:

```
$ bdsd.mqtt
{ sockFile: '/run/user/1000/bdsd.sock',
  host: 'localhost',
  port: '1883',
  topic: 'bobaos' }
```

See bdsd.mqtt command line arguments:.

```
$ bdsd.mqtt --help
Usage: bdsd.mqtt [options]

Options:
  -s --sockfile <path>  path to socket file. Default: /run/user/1000/bdsd.sock
  -h --host <value>     mqtt broker host. Default: localhost
  -p --port [value]     mqtt broker port. Default: 1883
  -t --topic [value]    topic to publish/subscribe to. <topic>/mqtt2knx, <topic>/knx2mqtt are used. Default: bobaos
  -h, --help            output usage information

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
