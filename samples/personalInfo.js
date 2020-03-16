const oura = require('oura')
const moment = require('moment')

// assume you have already gotten an access token
const accessToken = 'YOUR_ACCESS_TOKEN'

const client = new oura.Client(accessToken)
client.personalInfo().then(function (user) {
  console.log(JSON.stringify(user, null, 1))
}).catch(function(error){
  console.error(error)
})
