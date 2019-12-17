const authUrl = 'https://api.ouraring.com/oauth'
const baseUrl = 'https://api.ouraring.com/v1'
const authorizeUrl = 'https://cloud.ouraring.com/oauth'
module.exports = {
  authUrl: authUrl,
  baseUrl: baseUrl,
  accessTokenUri: authUrl + '/token',
  authorizationUri: authorizeUrl + '/authorize',
  authorizationGrants: ['credentials'],
  scopes: ['personal', 'daily']
}
