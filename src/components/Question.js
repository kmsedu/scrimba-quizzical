import React from 'react'
import '../styles/Question.css'
import { decode } from 'html-entities'

export default function Question (props) {
  const {
    question,
    answers,
    selectAnswer,
    isGameOver
  } = props

  function switchStyle (answerStyle) {
    if (!isGameOver && answerStyle === 'selected') {
      return 'question--choice selected'
    } else if (isGameOver && answerStyle === 'correct') {
      return 'question--choice correct'
    } else if (isGameOver && answerStyle === 'incorrect') {
      return 'question--choice incorrect'
    } else if (isGameOver && answerStyle === 'faded') {
      return 'question--choice faded'
    } else {
      return 'question--choice'
    }
  }

  const buttonElements = answers.map((answer, index) => {
    return (
      <button
        className={switchStyle(answer.style)}
        type='button'
        key={index}
        onClick={() => !isGameOver && selectAnswer(answer.id)}
      >
        {answer.answer}
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
