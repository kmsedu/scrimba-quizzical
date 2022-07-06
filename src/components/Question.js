import React from 'react'
import '../styles/Question.css'
import { decode } from 'html-entities'

export default function Question (props) {
  const { question } = props
  return (
    <div className='question'>
      <h3 className='question--text'>{decode(question)}</h3>
      <div className='question--button-wrapper'>
        <button className='question--choice selected' type='button'>Adios</button>
        <button className='question--choice correct' type='button'>Hola</button>
        <button className='question--choice incorrect' type='button'>Au Revoir</button>
        <button className='question--choice' type='button'>Salir</button>
      </div>
      <hr />
    </div>
  )
}
