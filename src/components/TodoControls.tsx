// ====================================================================
// TODO CONTROLS COMPONENT
// ====================================================================

type FilterType = 'all' | 'active' | 'completed'

type TodoControlsProps = {
  itemsLeft: number
  filter: FilterType
  setFilter: (filter: FilterType) => void
  clearCompleted: () => void
  className?: string
}

const TodoControls = ({ itemsLeft, filter, setFilter, clearCompleted, className }: TodoControlsProps) => {
  return (
    <div className={`p-4 flex justify-between items-center text-sm text-gray-500 dark:text-gray-400 ${className}`}>
      <span>{itemsLeft} items left</span>
      <div className="hidden sm:flex space-x-4 fw-bold">
        <button
          onClick={() => setFilter('all')}
          className={`${filter === 'all' ? 'text-blue-500' : 'hove:text-blue-500'}`}
        >
          All
        </button>
        <button
          onClick={() => setFilter('active')}
          className={`${filter === 'active' ? 'text-blue-500' : 'hove:text-blue-500'}`}
        >
          Active
        </button>
        <button
          onClick={() => setFilter('completed')}
          className={`${filter === 'completed' ? 'text-blue-500' : 'hove:text-blue-500'}`}
        >
          Completed
        </button>
      </div>
      <button onClick={clearCompleted} className="hover:text-blue-500">Clear Completed</button>
    </div>
  )
}

export default TodoControls
