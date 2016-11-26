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

### Personal info

```js

var oura = require('oura'),
  moment = require('moment')

// assume you have already gotten an OAuth2 access token
var accessToken = 'YOUR_ACCESS_TOKEN'

var client = new oura.Client(accessToken)
client.personalInfo().then(function (user) {
  console.log(JSON.stringify(user, null, 1))
}).catch(function(error){
  console.error(error)
})

```

Checkout the rest of the [samples](/samples)
