import { useState } from 'react'

const Blog = ({ blog, addLike }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikeClick = (blog) => {   
    addLike({
      id: blog.id,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      user: blog.user.id,
      likes: blog.likes +1
    })
      // setNewUrl('')
   }


  return (
  <div style={blogStyle}>
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
    likes {blog.likes} <button onClick={() => handleLikeClick(blog)}>Like</button>
    <br/>
    {blog.user.name}.
    </>
    }
  </div>  
)}

export default Blog








