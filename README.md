# ŌURA Cloud API client

[![Build Status](https://travis-ci.org/samuelmr/oura.svg?branch=master)](https://travis-ci.org/samuelmr/oura)

Unofficial [ŌURA](https://ouraring.com/) cloud [API](https://api.ouraring.com/docs/) client for node.js

## Features

- [Authentication](https://api.ouraring.com/docs/authentication)
- [Personal info](https://api.ouraring.com/docs/personal-info)
- [Daily Summaries](https://api.ouraring.com/docs/daily-summaries)
- [Sleep](https://api.ouraring.com/docs/sleep)
- [Activity](https://api.ouraring.com/docs/activity)
- [Readiness](https://api.ouraring.com/docs/readiness)


## Usage

### Install

```
npm install oura
```

### Daily sleep summary

```js

var auth = require('oura').Auth
moment = require('moment')

var clientId = 'YOUR_CLIENT_ID'
var clientSecret = 'YOUR_CLIENT_SECRET'

var dateFormat = 'YYYY-DD-MM'
var start = moment().subtract(1, 'days').format(dateFormat)
var end = moment().format(dateFormat)

auth.authenticate(clientId, clientSecret, scopes).then(function (client) {
  client.sleep(start, end).then(function (sleep) {
    console.log(sleep)
  })
})

```

Checkout the rest of the [samples](/samples)
