import React, { useState, useEffect } from "react"

export default function TodoItem({ todo, onToggle, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draft, setDraft] = useState(todo.text)

  function saveEdit(e) {
    e.preventDefault()
    const t = draft.trim()
    if (!t) return

    onEdit(t)
    setIsEditing(true)
  }

  return (
    <div className={`todo-item ${todo.done ? "done" : ""}`}>
      <input type='checkbox' checked={todo.done} onChange={onToggle} />
      {isEditing ? (
        <form onSubmit={saveEdit} className='edit-form'>
          <input
            className='edit-input'
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onBlur={() => setIsEditing(false)}
            autoFocus
          />
        </form>
      ) : (
        <span className='text' onDoubleClick={() => setIsEditing(true)}>
          {todo.text}
        </span>
      )}

      <div className='actions'>
        <button className='small' onClick={() => setIsEditing(true)}>
          Ubah
        </button>
        <button className='small danger' onClick={onDelete}>
          Hapus
        </button>
      </div>
    </div>
  )
}
