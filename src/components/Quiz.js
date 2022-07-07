import React, { useEffect, useState } from 'react'
import Question from './Question'
import '../styles/Quiz.css'
import { nanoid } from 'nanoid'
import { decode } from 'html-entities'

export default function Quiz (props) {
  const { started } = props
  const [quizData, setQuizData] = useState([])

  console.log(quizData)

  useEffect(() => {
    function randomizeArray (arr) {
      for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
      }
      return arr
    }

    fetch('https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple')
      .then((response) => response.json())
      .then((data) => {
        setQuizData(data.results.map((question) => {
          return {
            ...question,
            all_answers: randomizeArray([
              question.correct_answer,
              ...question.incorrect_answers
            ])
          }
        }))
      })
  }, [started])

  const questionElements = quizData.map((question) => {
    const id = nanoid()
    return (
      <Question
        question={question.question}
        answers={question.all_answers}
        key={id}
        id={id}
      />
    )
  })

  return (
    <section className='quiz'>
      {questionElements}
      <button className='quiz--button' type='button'>Check answers</button>
    </section>
  )
}
