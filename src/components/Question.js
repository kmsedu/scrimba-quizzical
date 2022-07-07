import React from 'react'
import '../styles/Question.css'
import { decode } from 'html-entities'

export default function Question (props) {
  const { question, answers } = props

  const buttonElements = answers.map((answer, index) => {
    return (
      <button
        className='question--choice'
        type='button'
        key={index}
      >
        {answer}
      </button>
    )
  })

  return (
    <div className='question'>
      <h3 className='question--text'>{decode(question)}</h3>
      <div className='question--button-wrapper'>
        {buttonElements}
      </div>
      <hr />
    </div>
  )
}
