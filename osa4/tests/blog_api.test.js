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

    let token = await helper.tokenForTest()                           // test_helperissä koodi, joka palauttaa voimassaolevan tokenin käyttäjälle

    await api
      .post('/api/blogs')
      .set('authorization', `bearer ${token}`)
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

describe('likes property', () => {
  test('if the likes property is missing from the request, it will default to the value 0', async () => {
    const newBlog = {
      title: 'New blog',
      author: 'Pekka Puolukka',
      url: 'www.puolukka.net',
    }

    let token = await helper.tokenForTest()

    await api
      .post('/api/blogs')
      .set('authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    // console.log(blogsAtEnd[2])
    expect(blogsAtEnd[2].likes).toEqual(0)                  // beforeEach toiminnon jälkeen on kaksi blogia, joten tämä on kolmas

  })
})

describe('post method bad request', () => {
  test('the backend responds to the request with the status code 400 Bad Request', async () => {

    const newBlog = {
      author: 'Victor Valdes',
      likes: 19,
    }

    let token = await helper.tokenForTest()

    await api
      .post('/api/blogs')
      .set('authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('deleting a single blog', () => {
  test('a blog can be deleted', async () => {

    // luodaan blogi ja poistetaan se samalla käyttäjällä
    const newBlog = {
      title: 'test blog',
      author: 'Maija Mansikka',
      url: 'www.mansikkablogi.net',
      likes: 13,
    }

    let token = await helper.tokenForTest()

    await api
      .post('/api/blogs')
      .set('authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtTheMoment = await helper.blogsInDb()
    const blogToDelete = blogsAtTheMoment[2]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .set('authorization', `bearer ${token}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(
      helper.initialBlogs.length
    )
  })
})

describe('put method', () => {
  test('updating the information of an individual blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    blogToUpdate.likes = 100
    console.log(blogToUpdate.likes)

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(blogToUpdate)
      .expect(200)

    const blogsAtTheMoment = await helper.blogsInDb()
    expect(blogsAtTheMoment[0].likes).toEqual(100)
  })
})

afterAll(() => {
  mongoose.connection.close()
})