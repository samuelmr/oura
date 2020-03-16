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
const options = {
  clientId: 'YOUR_CLIENT_ID',
  clientSecret: 'YOUR_CLIENT_SECRET',
  redirectUri: 'https://host.yourdomain.example/authcallback'
}

// Using a simple global value in this example.
// Should be stored somewhere permanently!
let authConfig

const dateFormat = 'YYYY-MM-DD'
let start = moment().subtract(7, 'days').format(dateFormat)
let end = moment().format(dateFormat)

const redirect = url.parse(options.redirectUri)
const app = express()
const port = process.env.PORT || redirect.port
const host = redirect.host
const proto = redirect.protocol
const startAddress = proto + '//' + host + '/beginAuthorization'
const dataPath = '/getData/' + start + '/' + end

const authClient = oura.Auth(options)
const authUri = authClient.code.getUri()
const server = app.listen(port, function () {
  console.log('Server running on port ' + port)
  console.log('Start from ' + startAddress)
})

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
  const token = authConfig.access_token
  const client = new oura.Client(token)
  client.readiness(req.param.start, req.param.end).then(function (readiness) {
    res.json(readiness)
  })
})
