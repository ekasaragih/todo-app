import React, { useState, useEffect } from "react"
import TodoItem from "./TodoItem"
import "./index.css"

function App() {
  const [todos, setTodos] = useState([]) //useState itu react hook yang dipake utk nyimpen data (state) dlm komponen || pake useState([]) -> artinya nilai awalnya array kosong
  const [text, setText] = useState("") // text = nilai saat ini (state), setText = fungsi untuk mengubah niai state, useState("") = nilai awalnya adalah string kosong

  // useEffect itu hook yang dipake utk run code ketika sesuatu berubah
  // [todos] -> jalankan fungsi dalam useEffect setiap kali todos berubah
  // kalau returnnya kosong di dependencies nya "[]" berarti cuma jalan sekali saat komponen pertama kali muncul
  // function useEffect yang ini untuk pas pertama kali load, baca atau tarik data dari localStorage nya
  useEffect(() => {
    const raw = localStorage.getItem("todos_v1")
    if (raw) {
      try {
        setTodos(JSON.parse(raw))
      } catch (e) {
        console.error("gagal parse todos:", e)
      }
    }
  }, [])

  // setiap ada perubahan, simpan ke localstorage
  useEffect(() => {
    localStorage.setItem("todos_v1", JSON.stringify(todos))
  }, [todos])

  // function to add todo list
  function createTodo(e) {
    e.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return

    const newTodo = {
      id: Date.now(),
      text: trimmed,
      done: false,
    }

    setTodos([newTodo, ...todos]) // "...todos" = ambil semua isi dari array lama todos -> artinya buat array baru yang isinya newTodo di depan lalu semua todo lama di belakang
    // gak bisa langsung "todos.push(newTodo)" -> krn di react ga boleh ubah state lama langsung (immutable state)
    setText("")
  }

  function toggleDone(id) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, done: !t.done } : t)))
  }

  function editTodo(id, newText) {
    setTodos(todos.map((t) => (t.id === id ? { ...t, text: newText } : t)))
  }

  function deleteTodo(id) {
    setTodos(todos.filter((t) => t.id !== id))
  }

  const remaining = todos.filter((t) => !t.done).length

  return (
    <div className='app'>
      <div className='card'>
        <h1 className='title'>Aplikasi To-Do</h1>

        <form onSubmit={createTodo} className='input-row'>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder='Tambah tugas baru...'
            className='input'
            autoFocus></input>
          <button className='btn' type='submit'>
            Tambah
          </button>
        </form>

        <p className='status'>
          Sisa tugas: {remaining} / {todos.length}
        </p>

        <div className='list'>
          {todos.length === 0 && <p className='empty'>Belum ada tugas. Tambah yang pertama!</p>}
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => toggleDone(todo.id)}
              onDelete={() => deleteTodo(todo.id)}
              onEdit={(newText) => editTodo(todo.id, newText)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
