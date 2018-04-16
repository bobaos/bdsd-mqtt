const bdsdClient = require('bdsd.client');
const mqtt = require('mqtt');

const BdsdMqtt = function (params) {
  let self = {};

  // bdsd.client opts
  self._bdsdClientOpts = {};
  self._bdsdClientOpts.sockfile = null;
  if (Object.prototype.hasOwnProperty.call(params, 'bdsd_sockfile')) {
    self._bdsdClientOpts.sockfile = params.bdsd_sockfile;
  }

  // mqtt options
  self._mqttClientOpts = {};
  self._mqttClientOpts.host = params.host;
  self._mqttClientOpts.port = params.port;
  self._mqttClientOpts.authRequired = false;
  // now check if username and password was passed as parameters
  if (Object.prototype.hasOwnProperty.call(params, 'username')) {
    self._mqttClientOpts.username = params.username;
    self._mqttClientOpts.authRequired = true;
    // check if password has been passed as param
    if (Object.prototype.hasOwnProperty.call(params, 'password')) {
      self._mqttClientOpts.password = params.password;
    } else {
      throw new Error('Please provide username along with password parameter')
    }
  }
  // now establish connection to knx
  self._bdsdClient = bdsdClient(self._bdsdClientOpts.sockfile);
  self._mqttClient = {};
  // TODO: connect
  // TODO: get datapoint descriptions, check for flags R/W.
  // TODO: R expose for publishing, W - for subscribing.
  return self;
};