// commandline arguments
const argv = require('yargs')
  .option('sockfile', {
    alias: 's',
    describe: `path to bdsd.sock file.`,
    default: `${process.env['XDG_RUNTIME_DIR']}/bdsd.sock`
  })
  .option('host', {
    alias: 'h',
    describe: 'mqtt broker host',
    default: 'localhost'
  })
  .option('port', {
    alias: 'p',
    describe: 'mqtt broker port',
    default: 1883
  })
  .option('topic', {
    alias: 't',
    describe: 'topic to publish/subscribe to. <topic>/mqtt2knx, <topic>/knx2mqtt are used',
    default: 'bobaos'
  })
  .argv;

// using default params
let params = {
  sockfile: argv['sockfile'],
  host: argv['host'],
  port: argv['port'],
  topic: argv['topic']
};

console.log('starting bdsd-mqtt with params: ', params);
require('../index.js')(params);
