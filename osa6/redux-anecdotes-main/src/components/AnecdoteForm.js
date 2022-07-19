import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteSliceReducer'
import { notification } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
 
  const addNew = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value     // content tulee returnin formista nimeltään anecdote
    event.target.anecdote.value = ''
    dispatch(createAnecdote(content))
    dispatch(notification(`You created '${content}'`, 5))
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