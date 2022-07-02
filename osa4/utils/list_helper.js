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

const favoriteBlog = (blogs) => {
  const likes = blogs.map((b) => Number(b.likes))
  const highest = Math.max.apply(null, likes)
  const favorite = blogs.find((b) => b.likes === highest)

  return favorite
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

const mostLikes = (blogs) => {
  const arr1 = blogs.map(({ author, likes:likes_ })  => ({ author, likes_ }))

  let obj = {}

  // eslint-disable-next-line no-unused-vars
  arr1.forEach((blog, index) => {
    let { author, likes_ } = blog

    if (!obj[author]) {                  // onko sama kuin vuorossa oleva author
      obj[author] = {                    // jos ei niin luodaan olio
        author,
        likes: likes_
      }
    } else {                             // jos löytyy jo niin lisätään tykkäykset vanhoihin
      let { likes } = obj[author]
      obj[author].likes = likes + likes_
    }
  })

  let result = Object.values(obj)

  const likes = result.map((b) => Number(b.likes))
  const highest = Math.max.apply(null, likes)
  const favorite = result.find((b) => b.likes === highest)

  return favorite
}


module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}