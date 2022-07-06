import React from 'react'
import '../styles/Start.css'

export default function Start (props) {
  const { startGame } = props

  return (
    <section className='start'>
      <h1 className='start--title'>Quizzical</h1>
      <p className='start--description'>Some description if needed</p>
      <button
        className='start--button'
        type='button'
        onClick={startGame}
      >
        Start quiz
      </button>
    </section>
  )
}
