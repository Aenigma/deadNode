var irc = require('irc');
var fs = require('fs');
var path = require('path');
var config = require('./config/config.json');

var PLUGIN_DIR = path.join(__dirname, "lib/plugins/");

var client = new irc.Client(config.server, config.nick, config.options);

console.log(PLUGIN_DIR);
fs.readdir(PLUGIN_DIR, function(err, files) {
  files
  .filter(function(f){ return f.match(/.*\.js$/); })
  .map(function(file) {
    var plugin = require(path.join(PLUGIN_DIR, file));

    plugin(client);
  });
});

client.on('message', function(from, to, message, text) {
  console.log(from + ' => ' + to + ': ' + message);
});

client.on('error', function(message) {
    console.error(message);
});
