var validUrl = require('valid-url');
var url = require('url');

var urlemitter = function(client) {
  client.on('message', function(nick, to, text, message) {
    var wordR = /(\S+)/g;
    var wordM = wordR.exec(text);
    while(wordM) {

      if(validUrl.isUri(wordM[1])) {
        var msgUrl = url.parse(wordM[1]);

        var eventName = "url:"+ msgUrl.host;
        if(client.listeners(eventName).length > 0) {
          client.emit(eventName, nick, to, msgUrl, text, message);
        } else {
          console.log("Got a URL we don't know what to do with: "
            + msgUrl.href);
        }
      }
      wordM = wordR.exec(text);
    }
  });
}

module.exports = urlemitter;
