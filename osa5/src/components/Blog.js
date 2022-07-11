import { useState } from 'react'

const Blog = ({ blog }) => {
  const [showDetails, setShowDetails] = useState(false);

  const blogStyle = {
    padding: 5,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
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
    likes {blog.likes} <button>Like</button>
    <br/>
    {blog.user.name}
    </>
    }
  </div>  
)}

export default Blog








