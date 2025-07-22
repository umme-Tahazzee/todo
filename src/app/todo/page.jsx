'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { MdOutlineLibraryAdd } from "react-icons/md";
import { MdDelete } from "react-icons/md";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const listRef = useRef([]);

  const addTodo = () => {
    if (input.trim() === '') return;
    const newTodo = { id: Date.now(), text: input, completed: false };
    setTodos((prev) => [...prev, newTodo]);
    setInput('');
  };

  const removeTodo = (id, index) => {
    const el = listRef.current[index];
    if (el) {
      gsap.to(el, {
        x: 200,
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setTodos((prev) => prev.filter((todo) => todo.id !== id));
        },
      });
    }
  };

  const toggleComplete = (index) => {
    const el = listRef.current[index];
    if (el) {
      gsap.fromTo(el, { scale: 0.9 }, { scale: 1, duration: 0.2 });
    }

    setTodos((prev) =>
      prev.map((todo, i) =>
        i === index ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  useEffect(() => {
    todos.forEach((_, index) => {
      const el = listRef.current[index];
      if (el) {
        gsap.fromTo(
          el,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5, delay: 0.1 * index }
        );
      }
    });
  }, [todos]);

  return (
    <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-6 rounded-lg shadow-md w-full max-w-md"
      >
        <h1 className="text-2xl font-bold text-center mb-4">📝 Animated To-Do</h1>

        <div className="flex space-x-2 mb-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-2 outline-none"
            placeholder="Enter task"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            className=" text-blue-600 px-4 py-2 rounded"
            onClick={addTodo}
          >
           <MdOutlineLibraryAdd className='size-8' />
          </motion.button>
        </div>

        <div className="space-y-2">
          {todos.map((todo, index) => (
            <div
              key={todo.id}
              ref={(el) => (listRef.current[index] = el)}
              className="flex justify-between items-center bg-gray-200 p-3 rounded shadow"
            >
              <span
                onClick={() => toggleComplete(index)}
                className={`flex-1 cursor-pointer ${
                  todo.completed ? 'line-through text-green-500 opacity-70' : ''
                }`}
              >
                {todo.text}
              </span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeTodo(todo.id, index)}
                className="text-red-500 font-bold ml-2"
              >
                <MdDelete className="size-8" />
              </motion.button>
            </div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
