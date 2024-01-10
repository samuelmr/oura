const test = require('ava')
const nock = require('nock')

const config = require('../config')
const Client = require('../lib/client')

test('sleep', async t => {
  let sleepData = {
    "data": [
      {
        "id": "1",
        "average_breath": 0,
        "average_heart_rate": 0,
        "average_hrv": 0,
        "awake_time": 0,
        "bedtime_end": "2019-08-24T14:15:22Z",
        "bedtime_start": "2019-08-24T14:15:22Z",
        "day": "2019-08-24",
        "deep_sleep_duration": 0,
        "efficiency": 0,
        "heart_rate": {
          "interval": 0,
          "items": [
            0
          ],
          "timestamp": "2019-08-24T14:15:22Z"
        },
        "hrv": {
          "interval": 0,
          "items": [
            0
          ],
          "timestamp": "2019-08-24T14:15:22Z"
        },
        "latency": 0,
        "light_sleep_duration": 0,
        "low_battery_alert": true,
        "lowest_heart_rate": 0,
        "movement_30_sec": "1143222134",
        "period": 0,
        "readiness": {
          "contributors": {
            "activity_balance": 75,
            "body_temperature": 89,
            "hrv_balance": 23,
            "previous_day_activity": 45,
            "previous_night": 62,
            "recovery_index": 17,
            "resting_heart_rate": 82,
            "sleep_balance": 46
          },
          "score": 67,
          "temperature_deviation": 2,
          "temperature_trend_deviation": 1
        },
        "readiness_score_delta": 10,
        "rem_sleep_duration": 0,
        "restless_periods": 0,
        "sleep_phase_5_min": "444423323441114",
        "sleep_score_delta": 0,
        "sleep_algorithm_version": "v2",
        "time_in_bed": 0,
        "total_sleep_duration": 0,
        "type": "deleted"
      }
    ],
    "next_token": null
  }

  let endpoint = nock(config.baseUrl)
    .get('/v2/usercollection/session?sleep=2019-08-24&end_date=2019-08-25')
    .reply(200, JSON.stringify(sleepData))

  const client = new Client('token')
    const sleep = await client.sleep('2019-08-24', '2019-08-25')

  t.is(sleep.data[0].bedtime_end, "2019-08-24T14:15:22Z")
  t.is(sleep.data[0].readiness.score, 67)

})
