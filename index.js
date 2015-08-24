var irc = require('irc');
var fs = require('fs');
var path = require('path');
var config = require('./config/config.json');

var PLUGIN_DIR = path.join(__dirname, "lib/plugins/");

var client = new irc.Client(config.server, config.nick,  {
  debug:true,
  channels: config.channels
});

console.log(PLUGIN_DIR);
fs.readdir(PLUGIN_DIR, function(err, files) {
  files
  .filter(function(f){ return f.match(/.*\.js$/); })
  .map(function(file) {
    var plugin = require(path.join(PLUGIN_DIR, file));

    console.log('loading: ' + file);

    plugin(client);
  });
});
client.on('message', function(from, to, message, text) {
  //client.emit('testevent', "this is a test!");
  console.log(from + ' => ' + to + ': ' + message);
  //console.log(text);
});

client.on('testevent', function(arg) {
  console.log(arg);
})

client.on('error', function(message) {
    console.error(message);
});
