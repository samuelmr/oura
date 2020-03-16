const config = require('../config')
const bent = require('bent')

function Client(token) {
  const authHeaders = {'Authorization': `Bearer ${token}`}
  this.request = bent(config.baseUrl, 'GET', 'json', authHeaders)
}

Client.prototype.personalInfo = function () {
  return this.request('/userinfo')
}

Client.prototype.activity = function (start, end) {
  return this.request('/activity?start=' + start + '&end=' + end)
}

Client.prototype.readiness = function (start, end) {
  return this.request('/readiness?start=' + start + '&end=' + end)
}

Client.prototype.sleep = function (start, end) {
  return this.request('/sleep?start=' + start + '&end=' + end)
}

module.exports = Client
