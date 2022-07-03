const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog= require('../models/blog')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})                                 // https://www.mongodb.com/docs/manual/reference/method/db.collection.deleteMany/
  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(helper.initialBlogs[1])             // alustetaan kaksi uutta blogia testitietokantaan
  await blogObject.save()
})

describe('json', () => {
  test('notes are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })
})

describe('returned amount', () => {
  test('returned amount is correct', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })
})

describe('id', () => {
  test('the unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
  })
})


describe('post method', () => {
  test('a blog can be added ', async () => {
    const newBlog = {
      title: 'test blog',
      author: 'Maija Mansikka',
      url: 'www.mansikkablogi.net',
      likes: 13,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(b => b.title)
    expect(titles).toContain(
      'test blog'
    )
  })
})

afterAll(() => {
  mongoose.connection.close()
})