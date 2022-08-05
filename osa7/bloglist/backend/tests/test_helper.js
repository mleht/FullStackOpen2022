const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'Kari Kirjoittaja',
    url: 'www.jotain.fi',
    likes: 13,
  },
  {
    title: 'React & Redux',
    author: 'Simo Silli',
    url: 'www.react.fi',
    likes: 34,
  },
]

const initialUsers = [
  {
    username: 'testUser1',
    name: 'Keijo Käyttäjä',
    password: '12345'
  },
  {
    username: 'testUser2',
    name: 'Harri Hiiri',
    password: 'passwords'
  },
]

const blogsInDb = async () => {
  const blogs= await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

const tokenForTest = async () => {
  await User.deleteMany({})
  let token = '1234'
  const password = 'salasana'                           // mallia users.js uuden käyttäjän luomisesta
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)
  const username = 'testiUser'
  const name = 'testi'
  const testuser = new User({
    username,
    name,
    passwordHash,
  })
  const savedUser = await testuser.save()

  const userForToken = {                      // mallia login.js tokenin luomisesta käyttäjälle
    username: savedUser.username,
    id: savedUser._id,
  }

  token = jwt.sign(userForToken, process.env.SECRET)
  return token
}

module.exports = {
  initialBlogs, blogsInDb, initialUsers, usersInDb, tokenForTest
}