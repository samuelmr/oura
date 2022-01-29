const config = require('../config')
const bent = require('bent')

function Client(token) {
  const authHeaders = {'Authorization': `Bearer ${token}`}
  this.request = bent(config.baseUrl, 'GET', 'json', authHeaders)
}

Client.prototype.personalInfo = function () {
  return this.request('/v2/usercollection/personal_info')
}

Client.prototype.activity = function (start, end) {
  return this.request('/v2/usercollection/daily_activity?start_date=' + start + '&end_date=' + end)
}

Client.prototype.readiness = function (start, end) {
  return this.request('/v1/readiness?start=' + start + '&end=' + end)
}

Client.prototype.sleep = function (start, end) {
  return this.request('/v1/sleep?start=' + start + '&end=' + end)
}

Client.prototype.heartrate = function (start, end) {
  return this.request('/v2/usercollection/heartrate?start_datetime=' + start + '&end_datetime=' + end)
}

Client.prototype.sessions = function (start, end) {
  return this.request('/v2/usercollection/sessions?start_date=' + start + '&end_date=' + end)
}

Client.prototype.tags = function (start, end) {
  return this.request('/v2/usercollection/tags?start_date=' + start + '&end_date=' + end)
}

Client.prototype.workouts = function (start, end) {
  return this.request('/v2/usercollection/workouts?start_date=' + start + '&end_date=' + end)
}

module.exports = Client
