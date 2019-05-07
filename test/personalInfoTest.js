const chai = require('chai')
const nock = require('nock')
const config = require('../config')
const Client = require('../lib/client')
const should = chai.should()

describe('Personal information ', () => {

    let client = new Client('token')
    let userData = {
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

    it('should get the user info', (done) => {

      client.personalInfo().then((response) => {
        should.exist.response
        done()
      })
    })

  }
)
