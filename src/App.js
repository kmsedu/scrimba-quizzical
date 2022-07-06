import React from 'react'
import Start from './components/Start'

export default function App () {
  const renderStart = true

  return (
    <main>
      {renderStart && <Start />}
    </main>
  )
}
