/*

A simple Express server that handles auhtorization and displays
readiness data (just a JSON dump)

Uses code authorization flow.

*/

const oura = require('oura')
const moment = require('moment')
const express = require('express')
const url = require('url')

// these must match the info at
// https://api.ouraring.com/oauth/applications
let options = {
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUri: 'http://localhost:6872/authcallback'
}

// Using a simple global value in this example.
// Should be stored somewhere permanently!
let authConfig;

let dateFormat = 'YYYY-MM-DD'
let start = moment().subtract(7, 'days').format(dateFormat)
let end = moment().format(dateFormat)

let redirect = url.parse(options.redirectUri);
let app = express();
let port = process.env.PORT || redirect.port;
let host = redirect.host;
let proto = redirect.protocol;
let startAddress = proto + '//' + host + '/beginAuthorization'
let dataPath = '/getData/' + start + '/' + end

let authClient = oura.Auth(options)
let authUri = authClient.code.getUri()
let server = app.listen(port, function () {
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
  let token = authConfig.access_token
  let client = new oura.Client(token)
  client.readiness(req.param.start, req.param.end).then(function (readiness) {
    res.json(readiness)
  })
})
