const bdsdClient = require('bdsd.client');
const mqtt = require('mqtt');

const BdsdMqtt = function (params) {
  let self = {};

  // bdsd.client opts
  self._bdsdClientOpts = {};
  self._bdsdClientOpts.sockfile = null;
  if (Object.prototype.hasOwnProperty.call(params, 'sockfile')) {
    self._bdsdClientOpts.sockfile = params.sockfile;
  }

  // mqtt options
  self._mqttClientOpts = {};
  self._mqttClientOpts.host = params.host;
  self._mqttClientOpts.port = params.port;
  self._mqttClientOpts.topic = params.topic;
  self._mqttClientOpts.authRequired = false;
  // url
  self._mqttClientOpts.url = `mqtt://${params.host}:${params.port}`;
  if (Object.prototype.hasOwnProperty.call(params, 'url')) {
    self._mqttClientOpts.url = params.url;
  }
  // now check if username and password was passed as parameters
  if (Object.prototype.hasOwnProperty.call(params, 'username')) {
    self._mqttClientOpts.username = params.username;
    self._mqttClientOpts.authRequired = true;
    // check if password has been passed as param
    if (Object.prototype.hasOwnProperty.call(params, 'password')) {
      self._mqttClientOpts.password = params.password;
    } else {
      throw new Error(`Please provide username along with password parameter`)
    }
  }
  // now establish connection to knx
  self._bdsdClient = bdsdClient(self._bdsdClientOpts.sockfile);
  self._mqttClient = {};
  // connect and subscribe
  if (self._mqttClientOpts.authRequired) {
    self._mqttClient = mqtt.connect(self._mqttClientOpts.url, {
      username: self._mqttClientOpts.username,
      password: self._mqttClientOpts.password
    });
  } else {
    self._mqttClient = mqtt.connect(self._mqttClientOpts.url);
  }
  self._mqttClient.subscribe(`${self._mqttClientOpts.topic}/mqtt2knx`);

  // now publish
  self._bdsdClient.on('value', payload => {
    let message = {id: payload.id, value: payload.value};
    console.log(`sending data to ${self._mqttClientOpts.topic}/knx2mqtt: ${JSON.stringify(message)}`);
    self._mqttClient.publish(`${self._mqttClientOpts.topic}/knx2mqtt`, JSON.stringify(message));
  });
  // now on incoming data
  self._mqttClient.on('message', (topic, payload) => {
    try {
      let datapoint = JSON.parse(payload.toString());
      self._bdsdClient
        .setValue(datapoint.id, datapoint.value)
        .then(_ => {
          console.log(`set datapoint ${datapoint.id} to ${datapoint.value} success`);
        })
        .catch(e => {
          console.log(`error while trying to set datapoint ${datapoint.id} to ${datapoint.value}`, e);
        });
    } catch (e) {
      console.log(`error on parsing incoming message`, e);
    }
  });
  return self;
};

module.exports = BdsdMqtt;