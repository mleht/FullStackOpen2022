const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteReducer = (state = initialState, action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type){
    case 'VOTE':
      const id = action.data.id
      const anecdotToChange = state.find(a => a.id === id)   // etsitään olio, jonka äänimäärää lisätään
      const changedAnecdote = {                               // Luodaan  uusi olio, joka on muuten kopio muuttuvasta oliosta, mutta kentän äänimäärä kasvaa yhdellä
        ...anecdotToChange, 
        votes: anecdotToChange.votes + 1
      }
      return state.map(anecdote =>                            // Palautetaan uusi tila, joka saadaan ottamalla kaikki vanhan tilan anekdootit paitsi uusi juuri luotu muuttunut olio 
        anecdote.id !== id ? anecdote : changedAnecdote 
      )
    case 'NEW':                           // NEW-tyyppisen actionin seurauksena tilaan lisätään uusi actionin seurauksena tilaan lisätään uusi anekdoottihyödyntämällä JavaScriptin array spread -syntaksia
      return [...state, action.data]

  default:
    return state
  }

}

export const addVote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}

const generateId = () =>
  Number((Math.random() * 1000000).toFixed(0))

export const createAnecdote = (content) => {
  return {
    type: 'NEW',
    data: {
      content,
      votes: 0,
      id: generateId()
    }
  }
}

export default anecdoteReducer