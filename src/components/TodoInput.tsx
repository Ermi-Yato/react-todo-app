// ====================================================================
// TODO ITEM COMPONENT
// ====================================================================

import React, { useState } from "react";

// TYPE DEFINITION
type TodoInputProps = {
  addTodo: (text: string) => void
}

const TodoInput = ({ addTodo }: TodoInputProps) => {

  const [text, setText] = useState('')

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {

    if (event.key === 'Enter' && text.trim() !== '') {
      addTodo(text.trim())
      setText('')
    }
  }

  return (
    <div className="mb-6 p-5 bg-[var(--bg-input)] rounded-[10px] flex items-center transition-colors duration-300">
      <div className="w-6 h-6 rounded-full border border-gray-300 dark:border-gray-600 mr-4"></div>
      <input
        type="text"
        placeholder="Create a new todo..."
        className="w-full bg-transparent focus:outline-none text-[var(--input-color)] fw-bold"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={handleKeyPress}
      />
    </div>
  )

}

export default TodoInput
