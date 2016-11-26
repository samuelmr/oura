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

var dateFormat = 'YYYY-MM-DD'
var start = moment().subtract(7, 'days').format(dateFormat)
var end = moment().format(dateFormat)

var authClient = oura.Auth(options)
var authUri = authClient.token.getUri()

var defaultUrl = url.parse(options.redirectUri)
var express = require('express')
var app = express()
var port = process.env.PORT || defaultUrl.port
var server

app.get(defaultUrl.pathname, function (req, res) {
  var token = req.query['access_token']
  var client = new oura.Client(token)
  client.sleep(start, end).then(function (sleep) {
    console.log(JSON.stringify(sleep, null, 1))
    res.json(sleep)
    process.exit()
  }).catch(function(error){
    console.error(error)
    process.exit()
  })
})

server = app.listen(port, function () {
  console.log("Please, go to \n" + authUri)
})
