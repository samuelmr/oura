const chai = require('chai')
const nock = require('nock')
const config = require('../config')
const Client = require('../lib/client')
const should = chai.should()

describe('Readiness ', () => {

  it('should get readiness data', (done) => {

    let readinessData = {
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
    let endpoint = defaultNockEndpoint()
      .get('/readiness?start=2016-09-03&end=2016-09-04')
      .reply(200, JSON.stringify(readinessData))

    let client = new Client('token')

    client.readiness('2016-09-03', '2016-09-04').then((response) => {
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
