import { createAnecdote } from '../reducers/anecdoteSliceReducer'
import { notification } from '../reducers/notificationReducer'
import { connect } from 'react-redux' 

const AnecdoteForm = (props) => {
  const addNew = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value     // content tulee returnin formista nimeltään anecdote
    event.target.anecdote.value = ''
    props.createAnecdote(content)
    props.notification(`You created '${content}'`, 5)
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

const mapDispatchToProps = {                          
  createAnecdote,
  notification
}

const ConnectedAnecdoteForm = connect(        // connect-funktion toisena parametrina voidaan määritellä mapDispatchToProps eli joukko action creator -funktioita, jotka välitetään yhdistetylle komponentille propseina
  null,                                       // Koska komponentti ei tarvitse storen tilasta mitään, on connect-funktion ensimmäinen parametri null.
  mapDispatchToProps
)(AnecdoteForm)

export default ConnectedAnecdoteForm


/*

Alla Redux-storea käytetään  useDispatch-hookin avulla. Yllä taas connect-funktionlla

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

*/