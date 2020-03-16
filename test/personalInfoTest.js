const test = require('ava')
const nock = require('nock')

const config = require('../config')
const Client = require('../lib/client')

test('user', async t => {
  let userData = {
    "age": 27,
    "weight": 80,
    "gender": "male",
    "email": "john.doe@the.domain"
  }

  let endpoint = nock(config.baseUrl)
    .get('/userinfo')
    .reply(200, JSON.stringify(userData))

  const client = new Client('token')
	const user = await client.personalInfo()

  t.is(user.age, 27)
  t.is(user.gender, "male")

})
