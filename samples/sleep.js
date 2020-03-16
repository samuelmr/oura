/*

Fetch your own last week's sleep data.

Starts an Express server to handle authorization flow.
Displays the authorization URL in the console log. (Copy to your browser.)

Dumps the sleep data as JSON into your broser after authorization.

Uses token authorization flow.
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

const dateFormat = 'YYYY-MM-DD'
let start = moment().subtract(7, 'days').format(dateFormat)
let end = moment().format(dateFormat)

const authClient = oura.Auth(options)
const authUri = authClient.token.getUri()

const defaultUrl = url.parse(options.redirectUri)
const app = express()
const port = process.env.PORT || defaultUrl.port

app.get(defaultUrl.pathname, function (req, res) {
  const token = req.query['access_token']
  const client = new oura.Client(token)
  client.sleep(start, end).then(function (sleep) {
    res.send('<pre>' + JSON.stringify(sleep, null, 1) + '</pre>')
    process.exit()
  }).catch(function(error){
    console.error(error)
    process.exit()
  })
})

server = app.listen(port, function () {
  console.log("Please, go to \n" + authUri)
})
