var commandPrefixEscaped = '\\?';

var commandEventEmitter = function(eventemitter) {

  eventemitter.on('message', function(nick, to, text, message) {
    // JS Regexes are stateful; these need to created here
    var commandRegex = new RegExp(
      '^(' + commandPrefixEscaped + '\\S+)'
      + "(.*)"
    );

    // is the message a command?
    var cmdMatcher = commandRegex.exec(text);
    if(cmdMatcher) {
      // it is; let's parse arguments
      var argRegex = /\s+(\S+)/g;
      // the argument string
      var argsStr = cmdMatcher[2];

      var argsMatcher = argRegex.exec(argsStr);

      var cmdArgs = [];

      while(argsMatcher) {
        cmdArgs.push(argsMatcher[1]);

        argsMatcher = argRegex.exec(argsStr);
      }

      // we will now emit the event as ?command
      eventemitter.emit(cmdMatcher[1], nick, to, cmdArgs, text, message);
    }
  });
}

module.exports = commandEventEmitter;
