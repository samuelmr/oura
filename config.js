module.exports = {
  baseUrl: 'https://api.ouraring.com',
  accessTokenUri: 'https://api.ouraring.com/oauth/token',
  authorizationUri: 'https://cloud.ouraring.com/oauth/authorize',
  authorizationGrants: ['credentials'],
  scopes: ['email', 'personal', 'daily', 'heartrate', 'workout', 'tag', 'session', 'spo2']
}
