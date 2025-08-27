import React from 'react'
import { useState } from 'react'
import { CrudInterface } from './components/crud-interface'
import  './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <CrudInterface/>
    </>
  )
}

export default App
