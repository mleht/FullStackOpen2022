const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'HTML is easyx',
    author: 'Kari Kirjoittaja',
    url: 'www.jotain.fi',
    likes: 13,
  },
  {
    title: 'React is not easy',
    author: 'Jorma Jylli',
    url: 'www.react.fi',
    likes: 34,
  },
]

const blogsInDb = async () => {
  const blogs= await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, blogsInDb
}