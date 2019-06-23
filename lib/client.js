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

Client.prototype.refreshToken = function(refresh_token, client_id, client_secret) {

	var options = {
            method: 'POST',
            url: 'https://api.ouraring.com/oauth/token',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            form: { 
                grant_type: 'refresh_token',
                client_id: client_id,
                client_secret: client_secret,
                refresh_token: refresh_token 
	        } 
	    };

    return this.request.post(options)
	
}

module.exports = Client
