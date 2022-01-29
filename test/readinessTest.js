const test = require('ava')
const nock = require('nock')

const config = require('../config')
const Client = require('../lib/client')

test('user', async t => {
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

  let endpoint = nock(config.baseUrl)
    .get('/v1/readiness?start=2016-09-03&end=2016-09-04')
    .reply(200, JSON.stringify(readinessData))

  const client = new Client('token')
	const readiness = await client.readiness('2016-09-03', '2016-09-04')

  t.is(readiness.readiness.score_resting_hr, 98)
  t.is(readiness.readiness.score, 62)

})
