import { newVote } from '../reducers/anecdoteSliceReducer'
import { useDispatch, useSelector } from 'react-redux'
import { notification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
  let anecdotes = useSelector(state => state.anecdoteSliceReducer)
  const filter = useSelector(state => state.filterReducer)   
  const dispatch = useDispatch()
 
  if (filter) {
    let filterSmall = filter.toLowerCase()
    anecdotes = anecdotes.filter((a) => a.content.toLowerCase().includes(filterSmall))
  }

  const vote = (id) => {
    const clicked = anecdotes.find(a => a.id === id)
    dispatch(newVote(clicked))
    dispatch(notification(`You voted '${clicked.content}'`, 5))
  }


  return (
    <div>
      {[...anecdotes].sort((a, b) => b.votes - a.votes).map(anecdote =>         // {anecdotes.sort((a, b) jne. muutti alkuperäistä taulukkoa, josta välillä virhe konsoliin. Siksi vaihto tähän tyyliin. Orderby olisi toinen vaihtoehto.
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList