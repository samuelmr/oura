/*

A simple Express server that handles auhtorization and displays
readiness data (just a JSON dump)

Uses code authorization flow.

*/

var oura = require('oura'),
  moment = require('moment'),
  express = require('express'),
  url = require('url')

// these must match the info at
// https://api.ouraring.com/oauth/applications
var options = {
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUri: 'http://localhost:6872/authcallback'
}

// Using a simple global value in this example.
// Should be stored somewhere permanently!
var authConfig;

var dateFormat = 'YYYY-MM-DD'
var start = moment().subtract(7, 'days').format(dateFormat)
var end = moment().format(dateFormat)

var redirect = url.parse(options.redirectUri);
var app = express();
var port = process.env.PORT || redirect.port;
var host = redirect.host;
var proto = redirect.protocol;
var startAddress = proto + '//' + host + '/beginAuthorization'
var dataPath = '/getData/' + start + '/' + end

var authClient = oura.Auth(options)
var authUri = authClient.code.getUri()
var server = app.listen(port, function () {
  console.log('Server running on port ' + port)
  console.log('Start from ' + startAddress)
});

// begin authorization flow
app.get(url.parse(startAddress).pathname, function (req, res) {
  res.send('<a href="' + authUri + '">Authorize</a>')
})

// handle authorization (user returns), store auth code
app.get(redirect.pathname, function (req, res) {
  return authClient.code.getToken(req.originalUrl).then(function(auth) {
    return auth.refresh().then(function(refreshed) {
      authConfig = refreshed.data
      // you should store authConfig somewhere
    })
  }).then(function(){
    res.send('Authorization OK. <a href="' + dataPath + '">Last week\'s data</a>')
  }).catch(function(){
    res.send('Authorization FAILED!')
  })
})

// get access token, refres if needed,
app.get('/getData/:start/:end', function (req, res) {
  var token = authConfig.access_token
  var client = new oura.Client(token)
  client.readiness(req.param.start, req.param.end).then(function (readiness) {
    res.json(readiness)
  })
})
