var authUrl = 'https://api.ouraring.com/oauth'
var baseUrl = 'https://api.ouraring.com/v1'
module.exports = {
  authUrl: authUrl,
  baseUrl: baseUrl,
  accessTokenUri: authUrl + '/token',
  authorizationUri: authUrl + '/authorize',
  authorizationGrants: ['credentials'],
  scopes: ['personal', 'daily']
}
