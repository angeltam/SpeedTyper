var bodyParser = require('body-parser');
var req = require('request');

module.exports.text = function (request, response) {
  // Correct errors in API string output before serving back to client
  var formatString = function (string) {
    var result = ''
    // replace "&quot;" with ""
    var escapedQuotes = string.replace(/&quot;/g, '"');
    // replace out-of-place "?"s with "'"s
    for (var i = 0; i < escapedQuotes.length; i++) {
      if (escapedQuotes[i] === "?") {
        if (escapedQuotes[i-1] === "s" && escapedQuotes[i+1] === "a") {
          // handle one-off typo on API return object id# 283
          result += '... ';   
        } else if (escapedQuotes[i+1] !== " " && escapedQuotes[i+1] !== '"') {
          result += "'";
        } else {
          result += escapedQuotes[i];
        }
      } else {
        result += escapedQuotes[i];
      }
    }

    return result;
  }
  // Hit API for data, correct errors, serve to client
  req('http://api.icndb.com/jokes/random/50', function (error, res, body) {
    var data = {}
    var jokes = [];
    var parsedBody = JSON.parse(body);
    parsedBody.value.forEach(function(jokeObject) {
      jokes.push(jokeObject.joke);
    });
    data.text = jokes.join(' ');
    data.text = formatString(data.text);
    response.send(data);
  });
};



