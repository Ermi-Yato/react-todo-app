// ===================================================================
// TODO ITEM COMPONENT
// ===================================================================

const CheckIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="11" height="9"><path fill="none" stroke="#FFF" stroke-width="2" d="M1 4.304L3.696 7l6-6" /></svg>
const CrossIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"><path fill="#494C6B" fill-rule="evenodd" d="M16.97 0l.708.707L9.546 8.84l8.132 8.132-.707.707-8.132-8.132-8.132 8.132L0 16.97l8.132-8.132L0 .707.707 0 8.84 8.132 16.971 0z" /></svg>

// type of a single todo object
type Todo = {
  id: number
  text: string
  completed: boolean
}

type TodoItemProps = {
  todo: Todo
  toggleComplete: (id: number) => void
  onDelete: (id: number) => void
}

const TodoItem = ({ todo, toggleComplete, onDelete }: TodoItemProps) => {
  if (!todo) {
    return null
  }

  return (
    // 'group' allows us to show the delete button when hovering over the whole div
    <div className="group p-4 flex items-center border-b border-gray-200 dark:border-gray-700">

      {/* Checkbox */}
      <div
        onClick={() => {
          toggleComplete(todo.id)
        }}
        className={`w-6 h-6 flex-shrink-0 rounded-full mr-4 flex items-center justify-center cursor-pointer 
                   ${todo.completed ? 'bg-[image:var(--bg-checkbox)]' : 'border border-gray-300 dark:border-gray-600 hover:border-purple-500'
          }`}
      >
        {/* Only show the check icon if the todo is completed */}
        {todo.completed && <CheckIcon />}
      </div>

      {/* Todo Text */}
      <span className={`flex-grow text-[var(--text-color)] transition-all
      ${todo.completed ? 'line-through text-gray-800 dark:text-gray-500' : ''}`}>
        {todo.text}
      </span>

      {/* Delete Button (only appears on hover) */}
      <button onClick={() => {
        onDelete(todo.id)
      }} className="ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <CrossIcon />
      </button>
    </div>
  )

}

export default TodoItem
