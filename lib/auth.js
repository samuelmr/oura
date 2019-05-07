const request = require('request-promise')
const Client = require('./client')
const ClientOAuth2 = require('client-oauth2')
const config = require('../config')

module.exports = function(options) {
  options.accessTokenUri = config.accessTokenUri
  options.authorizationUri = config.authorizationUri
  options.authorizationGrants = config.authorizationGrants
  options.redirectUri = options.redirectUri || config.redirectUri
  options.scopes = options.scopes || config.scopes

  return new ClientOAuth2(options)
}
