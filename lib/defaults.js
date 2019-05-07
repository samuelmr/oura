const request = require('request-promise')
const config = require('../config')

module.exports = function (access_token) {
  return request.defaults({
    headers: {Authorization: 'Bearer ' + access_token},
    baseUrl: config.baseUrl,
    transform: function (response) {
      return JSON.parse(response)
    }
  })
}
