import { useState } from 'react'

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const StatisticsLine = (props) => (
<>
{props.text} {props.stat}
</>
)

const Statistics = (props) => {
  if (props.all === 0) {
    return (
      <>
      <h2>statistics</h2>
      <p>No feedpack given</p>
      </>
    )
  }
  else {
    return (
      <>
      <table>
        <thead>
          <tr>
            <td colSpan="2"><h2>statistics</h2></td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><StatisticsLine text={props.text} /></td>
            <td><StatisticsLine stat={props.stat} /></td>
          </tr>
          <tr>
            <td><StatisticsLine text={props.text2} /></td>
            <td><StatisticsLine stat={props.stat2} /></td>
          </tr>
          <tr>
            <td><StatisticsLine text={props.text3} /></td>
            <td><StatisticsLine stat={props.stat3} /></td>
          </tr>
          <tr>
            <td><StatisticsLine text={props.text4} /></td>
            <td><StatisticsLine stat={props.stat4} /></td>
          </tr>
          <tr>
            <td><StatisticsLine text={props.text5} /></td>
            <td><StatisticsLine stat={props.stat5} /></td>
          </tr>
          <tr>
            <td><StatisticsLine text={props.text6} /></td>
            <td><StatisticsLine stat={props.stat6} /></td>
          </tr>
        </tbody>
      </table>
      </>
      )
  }
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)
  const average = (good-bad)/all
  const positive = good/all*100 + " %"


  const handleClickgood = () => {
    setGood(good+1)
    setAll(all+1)
  }

  const handleClickneutral = () => {
    setNeutral(neutral+1)
    setAll(all+1)
  }

  const handleClickbad = () => {
    setBad(bad+1)
    setAll(all+1)
  }
 

  return (
    <div>
      <h2>give feedpack</h2>
      <Button text='good' handleClick={handleClickgood} />
      <Button text='neutral' handleClick={handleClickneutral} />
      <Button text='bad' handleClick={handleClickbad} />
      <Statistics all={all} stat={good} text='good ' stat2={neutral} text2='neutral ' stat3={bad} text3='bad ' stat4={all} text4='all ' stat5={average} text5='average ' stat6={positive} text6='positive ' /><br/>
    </div>
  )
}

export default App