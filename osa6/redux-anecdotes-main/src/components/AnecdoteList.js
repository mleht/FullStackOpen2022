import { voteAnecdote } from '../reducers/anecdoteSliceReducer'
import { useDispatch, useSelector } from 'react-redux'
import { show, hide } from '../reducers/notificationReducer'


const AnecdoteList = () => {
  let anecdotes = useSelector(state => state.anecdoteSliceReducer)
  const filter = useSelector(state => state.filterReducer)   
  const dispatch = useDispatch()
 
  if (filter) {
    let filterSmall = filter.toLowerCase()
    anecdotes = anecdotes.filter((a) => a.content.toLowerCase().includes(filterSmall))
  }

  const vote = (id) => {
    // console.log('vote', id)
    const clicked = anecdotes.find(a => a.id === id)
    dispatch(voteAnecdote(id))                         // voteAnecdote importoitu anecdoteSliceReducer.js tiedostosta
    dispatch(show(`You voted '${clicked.content}'`))
    setTimeout(() => {
      dispatch(hide(''))  
    }, 5000)
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