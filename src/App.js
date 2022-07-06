import React, { useState } from 'react'
import Start from './components/Start'
import Quiz from './components/Quiz'

export default function App () {
  const [started, setStarted] = useState(false)

  function startGame () {
    setStarted((prevStarted) => !prevStarted)
  }

  return (
    <main>
      {started ? <Quiz started={started} /> : <Start startGame={startGame} />}
    </main>
  )
}
