import { useState } from 'react'

const Blog = ({ blog, addLike, removeBlog, loggedUser }) => {
  const [showDetails, setShowDetails] = useState(false)

  const blogStyle = {
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikeClick = () => {
    const blogObject = {
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user.id,
      likes: blog.likes +1
    }
    addLike(blogObject)
  }

  /*  handleLikeClick koodia muutettu hieman Jest testin takia
   const handleLikeClick = (blog) => {
    addLike({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user.id,
      likes: blog.likes +1
    })
  }
  */

  const deleteButton = () => {
    // console.log("logged " + loggedUser + " bloguser " + blog.user.username)
    if (loggedUser === blog.user.username) {
      return <button onClick={() => removeBlog(blog.id)}>Delete</button>
    }
    else {
      return null
    }
  }

  return (
    <div style={blogStyle} className='blog'>
      {!showDetails &&
    <>
      {blog.title} {blog.author} <button onClick={() => setShowDetails(!showDetails)}>View details</button>
    </>
      }

      {showDetails &&
    <>
      {blog.title} {blog.author} <button onClick={() => setShowDetails(!showDetails)}>Hide details</button>
      <br/>
      {blog.url}
      <br/>
      {/* likes {blog.likes} <button onClick={() => handleLikeClick(blog)}>Like</button> */}
      likes {blog.likes} <button onClick={handleLikeClick}>Like</button>
      <br/>
      {blog.user.name}
      <br/>
      {deleteButton()}
    </>
      }
    </div>
  )}

export default Blog








