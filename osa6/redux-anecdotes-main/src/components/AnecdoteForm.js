import { createAnecdote } from '../reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'
import { show, hide } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
  const dispatch = useDispatch()
 
  const addNew = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value     // content tulee returnin formista nimeltään anecdote
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(show(`You created '${content}'`))
    setTimeout(() => {
      dispatch(hide(''))  
    }, 5000)
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNew}>
        <div><input name="anecdote" /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm