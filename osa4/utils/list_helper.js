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



module.exports = {
  dummy,
  totalLikes,
  mostLikes
}