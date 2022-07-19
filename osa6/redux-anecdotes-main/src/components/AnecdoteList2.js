import { addVote } from '../reducers/anecdoteReducer'
import { useDispatch, useSelector } from 'react-redux'
import { show, hide } from '../reducers/notificationReducer'


const AnecdoteList = () => {
  const anecdotes = useSelector(state => state.anecdoteReducer)
  const dispatch = useDispatch()
 
  const vote = (id) => {
    // console.log('vote', id)
    const clicked = anecdotes.find(a => a.id === id)
    dispatch(addVote(id))                         // advote on anecdoteReducer.js tiedostossa, joka taas on action, joka lähettää type 'VOTE' reducerille
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