import { useState } from 'react'

const BlogForm = ({ addBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')


  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog2 = (event) => {
    event.preventDefault()
    addBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={addBlog2}>
        <div>title: <input value={newTitle} onChange={handleTitleChange} placeholder='title'/></div>
        <div>author: <input value={newAuthor} onChange={handleAuthorChange} placeholder='author'/></div>
        <div>url: <input value={newUrl} onChange={handleUrlChange} placeholder='url'/></div>
        <button type="submit" id='create-button'>Create</button>
      </form>
    </div>
  )
}

export default BlogForm