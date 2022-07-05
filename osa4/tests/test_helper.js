const Blog = require('../models/blog')
const User = require('../models/user')

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

module.exports = {
  initialBlogs, blogsInDb, initialUsers, usersInDb
}