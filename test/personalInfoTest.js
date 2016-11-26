require('chai').should()
var nock = require('nock'),
  Client = require('../lib/client')
config = require('../config')

describe('Personal information ', function () {

    var client = new Client('token')
    var userData = {
      "age": 27,
      "weight": 80,
      "gender": "male",
      "email": "john.doe@the.domain"
    }
    beforeEach(function (done) {
      nock(config.baseUrl, {
        reqheaders: {
          'authorization': 'Bearer token'
        }
      })
        .get('/userinfo')
        .reply(200, JSON.stringify(userData))
      done()
    })

    it('should get the user info', function (done) {

      client.personalInfo().then(function (response) {
        should.exist.response
        done()
      })
    })

  }
)
