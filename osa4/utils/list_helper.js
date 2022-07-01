let _ = require('lodash')

const dummy = (blogs) => {
  blogs = 1
  return blogs
}

const totalLikes = (blogs) => {
  const initialValue = 0
  const likes = blogs.reduce((previousValue, currentValue) =>
    previousValue + currentValue.likes
  , initialValue)
  return likes
}

const mostLikes = (blogs) => {
  const likes = blogs.map((b) => Number(b.likes))
  const highest = Math.max.apply(null, likes)
  const mostLikes = blogs.find((b) => b.likes === highest)

  return mostLikes
}

const mostBlogs = (blogs) => {                                // I found some help from here: https://www.w3resource.com/javascript-exercises/javascript-array-exercise-8.php
  const arr1 = _.map(blogs, 'author')

  let mf = 1
  let m = 0
  let item
  for (let i=0; i<arr1.length; i++)
  {
    for (let j=i; j<arr1.length; j++)
    {
      if (arr1[i] === arr1[j])
        m++
      if (mf<m)
      {
        mf=m
        item = arr1[i]
      }
    }
    m=0
  }

  let author = item
  let qty = mf
  let person = { author: author, blogs: qty }
  return person
}


module.exports = {
  dummy,
  totalLikes,
  mostLikes,
  mostBlogs
}