const defaults = require('./defaults')
const config = require('../config')
function Client(token) {
  this.token = token
  this.request = defaults(token)
}

Client.prototype.personalInfo = function () {
  return this.request.get('/userinfo')
}

Client.prototype.activity = function (start, end) {
  return this.request.get('/activity?start=' + start + '&end=' + end)
}

Client.prototype.readiness = function (start, end) {
  return this.request.get('/readiness?start=' + start + '&end=' + end)
}

Client.prototype.sleep = function (start, end) {
  return this.request.get('/sleep?start=' + start + '&end=' + end)
}

module.exports = Client
