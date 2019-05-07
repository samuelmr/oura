const chai = require('chai')
const nock = require('nock')
const config = require('../config')
const Client = require('../lib/client')
const should = chai.should()

describe('Sleep ', () => {

  it('should get sleep data', (done) => {

    let sleepData = {
      "sleep": {
        "summary_date": "2016-09-03",
        "period_id": 0,
        "is_longest": 1,
        "bedtime_start": "2016-09-03T23:50:09+03:00",
        "bedtime_end": "2016-09-04T08:06:09+03:00",
        "timezone": 180,
        "duration": 29760,
        "score": 53,
        "total": 19950,
        "awake": 9810,
        "rem": 7110,
        "light": 10470,
        "deep": 2370,
        "efficiency": 67,
        "hr_low_duration": 16770,
        "hr_lowest": 51,
        "wake_up_count": 2,
        "onset_latency": 4110,
        "hr_average": 57.375,
        "midpoint_time": 10,
        "restless": 50,
        "got_up_count": 2,
        "score_total": 58,
        "score_deep": 47,
        "score_rem": 96,
        "score_efficiency": 41,
        "score_latency": 17,
        "score_disturbances": 49,
        "score_alignment": 56,
        "hypnogram_5min":"4444444444444433333444444444444422222111111133323322222222222242233322222222222222221333334443333344",
        "hr_10min": [ 255, 78, 65, 69, 65, 65, 68, 64, 62, 63, 65, 63, 75, 75, 85, 85, 80, 55, 55, 55, 55, 55, 58, 63, 63, 59, 57, 56, 54, 54, 53, 59, 60, 60, 58, 57, 55, 55, 55, 52, 51, 53, 54, 61, 62, 62, 68, 67, 67, 255, 255, 255, 255, 255, 255, 255 ]
      }
    }
    let endpoint = defaultNockEndpoint()
      .get('/sleep?start=2016-09-03&end=2016-09-04')
      .reply(200, JSON.stringify(sleepData))

    let client = new Client('token')

    client.sleep('2016-09-03', '2016-09-04').then((response) => {
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
