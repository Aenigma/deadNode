var YouTube = function(client) {
  client.on('url:youtube.com', function(nick, to, msgUrl, text, message) {
    console.log("Got YouTube: " + msgUrl.href);
  });
}

module.exports = YouTube;
