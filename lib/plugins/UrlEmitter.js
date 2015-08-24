var validUrl = require('valid-url');
var url = require('url');

var urlemitter = function(client) {
  client.on('message', function(nick, to, text, message) {
    var wordR = /(\S+)/g;
    var wordM = wordR.exec(text);
    while(wordM) {

      if(validUrl.isUri(wordM[1])) {
        var msgUrl = url.parse(wordM[1]);

        client.emit("url:"+ msgUrl.host, nick, to, msgUrl, text, message);
      }
      wordM = wordR.exec(text);
    }
  });
}

module.exports = urlemitter;
