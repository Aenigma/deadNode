var prettygood = function(client) {
  client.on('?prettygood', function(nick, to, cmdArgs, text, message) {
    var stringBuilder = [];
    if(cmdArgs[0]) {
      stringBuilder.push(cmdArgs[0]);
      stringBuilder.push(": ");
    }

    stringBuilder.push("You're pretty good");

    client.say(to, stringBuilder.join(""));
  });
}

module.exports = prettygood;
