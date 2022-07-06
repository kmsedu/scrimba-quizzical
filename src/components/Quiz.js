import React, { useEffect, useState } from 'react'
import Question from './Question'
import '../styles/Quiz.css'
import { nanoid } from 'nanoid'

export default function Quiz (props) {
  const { started } = props
  const [quizData, setQuizData] = useState([])

  useEffect(() => {
    async function getQuizData () {
      const response = await fetch('https://opentdb.com/api.php?amount=4&difficulty=easy&type=multiple')
      const fetchedQuizData = await response.json()
      setQuizData(fetchedQuizData.results)
    }

    getQuizData()
  }, [started])

  const questionElements = quizData.map((question) => {
    const id = nanoid()
    return (
      <Question
        question={question.question}
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
