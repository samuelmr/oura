const config = require('../config')
const bent = require('bent')

function Client(token) {
  const authHeaders = {'Authorization': `Bearer ${token}`}
  this.bent = bent(config.baseUrl, 'GET', 'json', authHeaders)
}

Client.prototype.pageRequest = async function(url) {
  let result
  try {
    result = await this.bent(url)
  }
  catch (e) {
    if (e.name == 'StatusError') {
      throw new Error(config.baseUrl + url + ' returned ' + e.statusCode + ' ' + e.message + ' (' + await e.text() + ')')
    }
    else {
      throw e
    }
  }
  return result
}

Client.prototype.request = async function(url) {
  let result = await this.pageRequest(url)
  if (result.data) { // v2, handle possible paging
    let data = []
    data.push(...result.data)
    while (result.next_token) {
      result = await this.pageRequest(url + '&next_token=' + next_token)
      data.push(...result.data)
    }
    result.data = data
  }
  return result
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
  return this.request('/v2/usercollection/heartrate?start_datetime=' + encodeURIComponent(start) + '&end_datetime=' + encodeURIComponent(end))
}

Client.prototype.session = function (start, end) {
  return this.request('/v2/usercollection/session?start_date=' + start + '&end_date=' + end)
}

Client.prototype.tag = function (start, end) {
  return this.request('/v2/usercollection/tag?start_date=' + start + '&end_date=' + end)
}

Client.prototype.workout = function (start, end) {
  return this.request('/v2/usercollection/workout?start_date=' + start + '&end_date=' + end)
}

module.exports = Client
