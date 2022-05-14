import { useState } from 'react'


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
  const most = Math.max(...votes);
  const index = votes.indexOf(most);

  const randomAnecdote = () => {
    let number = Math.floor(Math.random() * anecdotes.length)
    return number
  };

  const handleClickRandom = () => {
    const randomAn = randomAnecdote();
    setSelected(randomAn);
  };

  const handleClickVote = () => {
    const copy = [...votes]  //  Tilan muutos tulee aina tehdä asettamalla uudeksi tilaksi vanhan perusteella tehty kopio
    copy[selected] += 1 
    setVotes(copy)
  };

  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]} <br/>
      has {votes[selected]} votes <br/>
      <button onClick={handleClickVote}>vote</button>
      <button onClick={handleClickRandom}>next anecdote</button> <br/>
      <h2>Anecdote with most votes</h2>
      {most>0 && 
      <>
      {anecdotes[index]} <br/>
      has {most} votes
      </>}
    </div>
  )
}

export default App