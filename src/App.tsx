// =================================================================
// THE ROOT COMPONENT
// =================================================================

import { useState, useEffect } from "react"
import Header from "./components/Header"
import TodoInput from "./components/TodoInput"
import TodoItem from "./components/TodoItem"
import TodoControls from "./components/TodoControls"


// =================================================================
// TODO TYPE DEFINITION
// =================================================================
type Todo = {
  id: number
  text: string
  completed: boolean
}

type FilterType = 'all' | 'active' | 'completed'


// INITIAL DUMMY DATA FOR STYLE PURPOSE
const initodos: Todo[] = [
  { id: 1, text: 'Fix localStorage', completed: false },
]


//NOTE: THE MAIN APP FUNCTION
function App() {

  // handles the theme and saved to localStorage
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedTheme = localStorage.getItem('theme')

    if (savedTheme) {
      return JSON.parse(savedTheme)
    }
    else {
      return true
    }
  })


  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos')

    if (savedTodos) {
      return JSON.parse(savedTodos)
    }
    else {
      return initodos
    }
  })
  const [filter, setFilter] = useState<FilterType>('all')


  // ====================================================================
  // LOCAL STORAGE PERSISTENCE FOR TODOS AND THEME
  // ====================================================================
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }

    localStorage.setItem('theme', JSON.stringify(isDarkMode))
    localStorage.setItem('todos', JSON.stringify(todos))
  }, [isDarkMode, todos])

  // Controls the theme of the application
  const toggleTheme = () => {
    setIsDarkMode(prevTheme => !prevTheme)
  }

  // Add new tasks/todos to the container
  const handleNewTodo = (text: string) => {

    const newTodo: Todo = {
      id: Date.now(),
      text: text,
      completed: false,
    }
    // setTodos([newTodo, ...todos])
    setTodos(prevTodos => [newTodo, ...prevTodos])
  }

  const handleToggleComplete = (id: number) => {

    setTodos(prevTodos =>
      prevTodos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo)
    )

  }

  const handleDeleteTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }

  const handleClearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed))
  }

  // for the todo input controls
  let filteredTodos = todos
  if (filter === 'active') {
    filteredTodos = todos.filter(todo => !todo.completed)
  }
  if (filter === 'completed') {
    filteredTodos = todos.filter(todo => todo.completed)
  }

  // Number of remaining todos
  const itemsLeft = todos.filter(todo => !todo.completed).length

  return (
    <div className="font-josefin min-h-screen bg-[var(--bg-body)] transition-colors duration-300">

      {/* Background image container */}
      <div className="w-full h-52 sm:h-72 bg-cover bg-center bg-[image:var(--bg-image)]"></div>

      <main className="max-w-xl mx-auto px-6 -mt-36 sm:-mt-52">

        {/* Header */}
        <Header isDarkMode={isDarkMode} toggleTheme={toggleTheme} />

        {/* New todo Input Field */}
        <TodoInput addTodo={handleNewTodo} />

        {/* Todo List */}
        <div className="bg-[var(--bg-input)] rounded-[10px] shadow-[0_35px_75px_rgba(0,0,0,0.25)] transition-colors duration-300">

          {filteredTodos.map(todo => (
            <TodoItem todo={todo} toggleComplete={handleToggleComplete} onDelete={handleDeleteTodo} key={todo.id} />
          ))}

          {/* Todo controls */}
          <TodoControls
            itemsLeft={itemsLeft}
            filter={filter}
            setFilter={setFilter}
            clearCompleted={handleClearCompleted}
          />

        </div>


        {/* Mobile-only controls */}
        <div className="mt-6 p-4 sm:hidden bg-[var(--bg-input)] rounded-[10px] flex justify-center space-x-4 text-[var(--text-color)]">
          <button onClick={() => setFilter('all')} className={`${filter === 'all' ? 'text-blue-500 font-bold' : 'hover:text-blue-500'}`}>All</button>
          <button onClick={() => setFilter('active')} className={`${filter === 'active' ? 'text-blue-500 font-bold' : 'hover:text-blue-500'}`}>Active</button>
          <button onClick={() => setFilter('completed')} className={`${filter === 'completed' ? 'text-blue-500 font-bold' : 'hover:text-blue-500'}`}>Completed</button>
        </div>
      </main>
    </div>
  )

}

export default App
