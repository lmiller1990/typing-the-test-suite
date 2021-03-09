import React from 'react'
import axios from 'axios'

export interface Todo {
  id: number
  userId: number
  title: string
  completed: boolean
}

export const App: React.FC = () => {
  const [text, setText] = React.useState(
    'Hello world!'
  )
  const [todos, setTodos] = React.useState<Todo[]>([])
  const [showCompleted, setShowCompleted] = 
    React.useState(false)

  const fetchData = async () => {
    console.log('Fetching')
    const res = await axios.get<Todo[]>(
      'https://jsonplaceholder.typicode.com/todos')
    setTodos(res.data.filter(todo => {
      return todo.userId === 1
    }))
  }

  React.useEffect(() => {
    fetchData()
  }, [])

  const filtered = showCompleted
    ? todos.filter(todo => todo.completed)
    : todos

  return (
    <div>
      <ul>
        {filtered.map(todo => 
          <li
            key={todo.id}
            data-testid='todo'
          >{todo.title}</li>
        )}
      </ul>
      {text}
      <button onClick={() => 
        setShowCompleted(!showCompleted)
      }>
        Toggle
      </button>
    </div>
  )
}
