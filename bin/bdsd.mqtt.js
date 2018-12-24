#!/usr/bin/env node

const program = require('commander');

program
  .option(
    '-s --sockfile <path>',
    `path to socket file. Default: ${process.env['XDG_RUNTIME_DIR']}/bdsd.sock`
  )
  .option(
    '-h --host <value>',
    `mqtt broker host. Default: localhost`
  )
  .option(
    '-p --port [value]',
    `mqtt broker port. Default: 1883`
  )
  .option(
    '-t --topic [value]',
    `topic to publish/subscribe to. <topic>/mqtt2knx, <topic>/knx2mqtt are used. Default: bobaos`
  )
  .parse(process.argv);

// using default params
let params = {
  sockFile: `${process.env['XDG_RUNTIME_DIR']}/bdsd.sock`,
  host: `localhost`,
  port: `1883`,
  topic: `bobaos`
};


if (program['sockfile']) {
  params.sockFile = program['sockfile'];
}
if (program['host']) {
  params.host = program['host'];
}
if (program['port']) {
  params.port = program['port'];
}
if (program['topic']) {
  params.topic = program['topic'];
}

console.log('starting bdsd.mqtt with params:'+ params);

require('../index.js')(params);
