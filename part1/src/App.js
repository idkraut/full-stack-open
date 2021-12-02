import React, { useState } from 'react'

const Button = (props) => {
  return(
    <>
    <button onClick={props.handleClick}>{props.name}</button>
    </>
  )
}

const Stat = (props) => {
  return (
    <tr>
      <td>{props.name}</td>
      <td>{props.stat}</td>
    </tr>

  )
}

const Statistics = ({good, bad, neutral, all}) => {
  if (all === 0) {
    return (
      <p>No feedback given</p>
    )
  }

  return (
    <table>
      <tbody>
      <Stat name="good" stat={good}></Stat>
      <Stat name="neutral" stat={neutral}></Stat>
      <Stat name="bad" stat={bad}></Stat>
      <Stat name="all" stat={all}></Stat>
      <Stat name="average" stat={((good - bad) / all).toFixed(2)}></Stat>
      <Stat name="positive" stat={(good / all).toFixed(2) + "%"}></Stat>
      </tbody>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState(0)

  const incrementer = (handler, state) => () => {
    handler(state + 1);
    setAll(all + 1);
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button name="good" handleClick={incrementer(setGood, good)}></Button>
      <Button name="neutral" handleClick={incrementer(setNeutral, neutral)}></Button>
      <Button name="bad" handleClick={incrementer(setBad, bad)}></Button>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all}></Statistics>
    </div>
  )
}

// const App = () => {
//   const [value, setValue] = useState(10)

//   const setToValue = (newValue) => () => {
//     setValue(newValue)
//   }

//   return (
//     <div>
//       {value}
//       <button onClick={setToValue(1000)}>thousand</button>
//       <button onClick={setToValue(0)}>reset</button>
//       <button onClick={setToValue(value + 1)}>increment</button>
//     </div>
//   )
// }


// const History = (props) => {
//   if (props.allClicks.length === 0) {
//     return (
//       <div>
//         the app is used by pressing the buttons
//       </div>
//     )
//   }
//   return (
//     <div>
//       button press history: {props.allClicks.join(' ')}
//     </div>
//   )
// }

// const Button = ({ handleClick, text }) => (
//   <button onClick={handleClick}>
//     {text}
//   </button>
// )

// const App = () => {
//   const [left, setLeft] = useState(0)
//   const [right, setRight] = useState(0)
//   const [allClicks, setAll] = useState([])

//   const handleLeftClick = () => {
//     setAll(allClicks.concat('L'))
//     setLeft(left + 1)
//   }

//   const handleRightClick = () => {
//     setAll(allClicks.concat('R'))
//     setRight(right + 1)
//   }

//   return (

//     <div>
//       {left}
//       <Button handleClick={handleLeftClick} text="left"/>
//       <Button handleClick={handleRightClick} text="right"/>
//       {right}
//       <History allClicks={allClicks} />
//     </div>
//   )
// }



// const App = () => {
//   const [ counter, setCounter ] = useState(0)

//   const increaseByOne = () => setCounter(counter + 1)
//   const decreaseByOne = () => setCounter(counter - 1)
//   const setToZero = () => setCounter(0)

//   return (
//     <div>
//       <Display counter={counter} />
//       <Button onClick={increaseByOne} text="plus"/>
//       <Button onClick={decreaseByOne} text="minus"/>
//       <Button onClick={setToZero} text="zero"/>
//     </div>
//   )
// }

// const Display = ({counter}) => <div>{counter}</div>

// const Button = ({onClick, text}) =>
//     <button onClick={onClick}>
//       {text}
//     </button>


// const Hello = ({name, age}) => {
//   const bornYear = () => {
//     const yearNow = new Date().getFullYear()
//     return yearNow - age
//   }

//   return (
//     <div>
//       <p>
//         Hello {name}, you are {age} years old
//       </p>
//       <p>So you were probably born in {bornYear()}</p>
//     </div>
//   )
// }

// const App = () => {
//   const name = 'Peter'
//   const age = 10

//   return (
//     <div>
//       <h1>Greetings</h1>
//       <Hello name="Maya" age={26 + 10} />
//       <Hello name={name} age={age} />
//     </div>
//   )
// }

// const Header = (props) => {
//   return (
//     <>
//       <h1>{props.name}</h1>
//     </>
//   )
// }

// const Content = (props) => {
//   console.log(props);
//   return (
//     <>
//       <Part part={props.parts[0]}/>
//       <Part part={props.parts[1]}/>
//       <Part part={props.parts[2]}/>
//     </>
//   )
// }

// const Part = (props) => {
//   return (
//     <>
//       <p>
//         {props.part.name} {props.part.exercises}
//       </p>
//     </>
//   )
// }

// const Total = (props) => {
//   const total = props.parts.reduce((acc, {exercises}) => exercises + acc, 0)
//   console.log(total);
//   return (
//     <>
//       <p>Number of exercises {total}</p>
//     </>
//   )
// }



// const App = () => {
//   const course = {
//     name: 'Half Stack application development',
//     parts: [
//       {
//         name: 'Fundamentals of React',
//         exercises: 10
//       },
//       {
//         name: 'Using props to pass data',
//         exercises: 7
//       },
//       {
//         name: 'State of a component',
//         exercises: 14
//       }
//     ]
//   }

//   return (
//     <div>
//       <Header name={course.name}/>
//       <Content parts={course.parts} />
//       <Total parts={course.parts} />
//     </div>
//   )
// }

export default App