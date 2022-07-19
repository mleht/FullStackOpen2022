import { addAnecdote } from '../reducers/anecdoteSliceReducer'
import { useDispatch } from 'react-redux'
import { show, hide } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'


const AnecdoteForm = () => {
  const dispatch = useDispatch()
 
  const addNew = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value     // content tulee returnin formista nimeltään anecdote
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(addAnecdote(newAnecdote))
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