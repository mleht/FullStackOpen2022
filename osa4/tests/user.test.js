const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
  await User.deleteMany({})                                 // https://www.mongodb.com/docs/manual/reference/method/db.collection.deleteMany/
  let userObject = new User(helper.initialUsers[0])
  await userObject.save()
  userObject = new User(helper.initialUsers[1])             // alustetaan kaksi uutta käyttäjää testitietokantaan
  await userObject.save()
})

describe('Post method bad request', () => {
  test('Too short username', async () => {
    const newUser = {
      username: 'US',
      name: 'Hessu Hopo',
      passwordHash: 'password'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })

  test('No password', async () => {
    const newUser = {
      username: 'USER12',
      name: 'Mikki Hiiri',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })

  test('Username already in use', async () => {
    const newUser = {
      username: 'testUser1',
      name: 'Aku Ankka',
      passwordHash: 'password123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(helper.initialUsers.length)
  })

})

afterAll(() => {
  mongoose.connection.close()
})