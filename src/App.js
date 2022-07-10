import React, { useState } from 'react'
import Start from './components/Start'
import Quiz from './components/Quiz'

export default function App () {
  const [started, setStarted] = useState(false)

  function startGame () {
    setStarted(true)
  }

  function endGame () {
    setStarted(false)
  }

  return (
    <main>
      {started
        ? <Quiz
            endGame={endGame}
          />
        : <Start startGame={startGame} />}
    </main>
  )
}
