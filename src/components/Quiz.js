import React, { useEffect, useState } from 'react'
import Question from './Question'
import '../styles/Quiz.css'
import { nanoid } from 'nanoid'
import { decode } from 'html-entities'

export default function Quiz (props) {
  const { endGame } = props
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState([])
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)

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
        setQuestions(data.results.map((result) => {
          return { question: decode(result.question), id: nanoid() }
        }))

        setAnswers(data.results.map((result) => {
          const incorrectAnswers = result.incorrect_answers.map((answer) => {
            return {
              answer: decode(answer),
              isCorrect: false,
              isSelected: false,
              id: nanoid(),
              style: 'unselected'
            }
          })

          const correctAnswer = {
            answer: decode(result.correct_answer),
            isCorrect: true,
            isSelected: false,
            id: nanoid(),
            style: 'unselected'
          }

          return randomizeArray([...incorrectAnswers, correctAnswer])
        }))
      })
  }, [])

  function selectAnswer (id) {
    setAnswers((prevAnswers) => {
      return prevAnswers.map((answersList) => {
        return answersList.some((answer) => {
          return answer.id === id
        })
          ? answersList.map((answer) => {
            return answer.id === id
              ? { ...answer, isSelected: true, style: 'selected' }
              : { ...answer, isSelected: false, style: 'unselected' }
          })
          : answersList
      })
    })
  }

  function setAnswerStyles () {
    setAnswers((prevAnswers) => {
      return prevAnswers.map((answersList) => {
        return answersList.map((answer) => {
          if (answer.isCorrect) {
            return { ...answer, style: 'correct' }
          } else if (answer.isSelected && !answer.isCorrect) {
            return { ...answer, style: 'incorrect' }
          } else {
            return { ...answer, style: 'faded' }
          }
        })
      })
    })
  }

  function countAnswers () {
    setCorrectAnswers(answers.filter(answersList => {
      return answersList.find((answer) => {
        return answer.isSelected && answer.isCorrect
      }) !== undefined
    }).length)
    setIsGameOver(true)
    setAnswerStyles()
  }

  function restartGame () {
    setIsGameOver(false)
    endGame()
  }

  const questionElements = questions.map((question, index) => {
    return (
      <Question
        question={question.question}
        answers={answers[index]}
        selectAnswer={selectAnswer}
        isGameOver={isGameOver}
        key={question.id}
        id={question.id}
      />
    )
  })

  return (
    <section className='quiz'>
      {questionElements}
      <div className='quiz--check-container'>
        {isGameOver && <p>You answered {correctAnswers}/5 correctly.</p>}
        <button
          className='quiz--button'
          type='button'
          onClick={isGameOver ? restartGame : countAnswers}
        >
          {isGameOver ? 'Play again' : 'Check Answers'}
        </button>
      </div>
    </section>
  )
}
