require('chai').should()
var nock = require('nock'),
  config = require('../config'),
  Client = require('../lib/client')

describe('Readiness ', function () {

  it('should get readiness data', function (done) {

    var readinessData = {
      "readiness": {
        "summary_date": "2016-09-03",
        "period_id": 0,
        "score": 62,
        "score_previous_night": 5,
        "score_sleep_balance": 75,
        "score_previous_day": 61,
        "score_activity_balance": 77,
        "score_resting_hr": 98,
        "score_recovery_index": 45,
        "score_temperature": 86
      }
    }
    var endpoint = defaultNockEndpoint()
      .get('/readiness?start=2016-09-03&end=2016-09-04')
      .reply(200, JSON.stringify(readinessData))

    var client = new Client('token')

    client.readiness('2016-09-03', '2016-09-04').then(function (response) {
      should.exist.response
      endpoint.done()
      done()
    })
  })
})

function defaultNockEndpoint(){
  return nock(config.baseUrl, {
    reqheaders: {
      'authorization': 'Bearer token'
    }
  })
}
