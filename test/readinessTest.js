const test = require('ava')
const nock = require('nock')

const config = require('../config')
const Client = require('../lib/client')

test('readiness', async t => {
  let readinessData = {
    "data": [
      {
        "id": 0,
        "contributors": {
          "activity_balance": 77,
          "body_temperature": 86,
          "hrv_balance": 75,
          "previous_day_activity": 61,
          "previous_night": 5,
          "recovery_index": 45,
          "sleep_balance": 75,
          "resting_heart_rate": 98
        },
        "day": "2016-09-03",
        "score": 62,
        "temperature_deviation": 1,
        "temperature_trend_deviation": 0,
        "timestamp": "2016-09-04T04:00:00-08:00"
      }
    ],
    "next_token": null
  }

  let endpoint = nock(config.baseUrl)
    .get('/v2/usercollection/daily_readiness?start_date=2016-09-03&end_date=2016-09-04')
    .reply(200, JSON.stringify(readinessData))

  const client = new Client('token')
  const readiness = await client.dailyReadiness('2016-09-03', '2016-09-04')

  t.is(readiness.data[0].contributors.resting_heart_rate, 98)
  t.is(readiness.data[0].score, 62)

})
