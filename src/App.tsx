import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [tasks, setTasks] = useState<any>([])

  useEffect(() => {
    (async () => {
      const URL = import.meta.env.VITE_API_URL
      const response = await fetch(`${URL}/tasks`)
      const result: any[] = await response.json()
      setTasks(result)
    })()
  }, [])

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      {tasks?.map((item: any) => (

        <p key={item.id} className="read-the-docs">
          {item.title}
        </p>
      ))}
    </>
  )
}

export default App
