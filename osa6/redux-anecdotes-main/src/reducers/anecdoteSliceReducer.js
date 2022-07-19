import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const initialState = []   // anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'notification',                                      
  initialState,
  reducers: {                                               
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdotToChange = state.find(a => a.id === id)
      const changedAnecdote = {                               // Luodaan  uusi olio, joka on muuten kopio muuttuvasta oliosta, mutta kentän äänimäärä kasvaa yhdellä
        ...anecdotToChange, 
        votes: anecdotToChange.votes + 1
      }
      return state.map(anecdote =>                            // Palautetaan uusi tila, joka saadaan ottamalla kaikki vanhan tilan anekdootit paitsi uusi juuri luotu muuttunut olio 
        anecdote.id !== id ? anecdote : changedAnecdote 
      )
    },
    addAnecdote(state, action) {
      state.push(action.payload)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const { voteAnecdote, addAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer