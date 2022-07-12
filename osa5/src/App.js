/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [isPositive, setIsPositive] = useState(true)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      setUser(user)
      blogService.setToken(user.token)

      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )

      setUsername('')
      setPassword('')
    } catch (exception) {
      setIsPositive(false)
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 2000)
    }
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        setErrorMessage('a new blog added: ' + blogObject.title)
        setIsPositive(true)

        setTimeout(() => {
          setErrorMessage(null)
        }, 2000)
      })
  }

  const addLike = (blogObject) => {
    blogService
      .update(blogObject)
      .then(returnedBlog => {
        setErrorMessage('a new like added for: ' + blogObject.title)
        setIsPositive(true)
        blogService.getAll().then(blogs => setBlogs( blogs ))
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000)
      })
  }

  const removeBlog = (id) => {
    const remove = blogs.find((b) => b.id === id)
    const confirm = window.confirm(
      `Are you sure you want to permanently remove: ${remove.title}`
    )

    if (confirm) {
      blogService
        .remove(id)
        .then((response) => {
          setBlogs(blogs.filter((filtered) => filtered.id !== id))   // Blogs tilan päivitys -> Blogeista tulee filtered nimisiä. Ne joiden id on eri kuin poistettavan saavat jäädä.
          setErrorMessage(`${remove.title} deleted!`)
          setIsPositive(true)
          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)
        })
    }
  }



  const blogFormRef = useRef()

  const logout = () => {
    localStorage.clear()
    setUser(null)
    setIsPositive(true)
    setErrorMessage('You have been successfully logged out')

    setTimeout(() => {
      setErrorMessage(null)
    }, 2000)
  }


  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification message={errorMessage} positive={isPositive} />

        <form onSubmit={handleLogin}>
          <div>
          username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
          password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Notification message={errorMessage} positive={isPositive} />
      <p>{user.name} logged in <button onClick={logout}>Logout</button></p>
      <Togglable buttonLabel='New blog' ref={blogFormRef}>
        <BlogForm addBlog={addBlog}/>
      </Togglable>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map(blog =>
          <Blog key={blog.id} blog={blog} addLike={addLike} removeBlog={removeBlog} loggedUser={user.username}/>
        )}
    </div>
  )
}

export default App
