'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { MdOutlineLibraryAdd, MdDelete } from "react-icons/md";
import { IoMdArrowBack } from 'react-icons/io';

export default function Home() {
  const router = useRouter();
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');
  const listRef = useRef([]);

  const addTodo = () => {
    if (input.trim() === '') return;
    const newTodo = { 

      id: Date.now(), 
      text: input, 
      completed: false };
      
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
    <main className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">

      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-gray-900 rounded-xl shadow-lg p-5 sm:p-6 md:p-8"
      >
      
        <button
          onClick={() => router.push('/')}
          aria-label="Back to Home"
          className="self-start mb-6 p-2 rounded-md hover:bg-gray-700 transition"
        >
          <IoMdArrowBack className="text-3xl text-violet-400" />
        </button>

        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center mb-6 font-serif tracking-wide">
          📝 My Task
        </h1>

        <div className="flex space-x-2 sm:space-x-3 mb-6">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-gray-800 border border-gray-700 
            rounded-md px-3 py-2 sm:px-4 sm:py-3 text-white placeholder-gray-400
             focus:outline-none focus:ring-2 focus:ring-violet-500 transition text-sm 
             sm:text-base"
            placeholder="Enter a new task..."
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            aria-label="Task input"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="bg-violet-600 hover:bg-violet-700 text-white rounded-md px-3 sm:px-4 py-2 sm:py-3 flex items-center justify-center shadow-md transition"
            onClick={addTodo}
            aria-label="Add task"
          >
            <MdOutlineLibraryAdd className="text-2xl sm:text-2xl" />
          </motion.button>
        </div>

        <div className="space-y-3 max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-violet-600 scrollbar-track-gray-700">
          {todos.length === 0 && (
            <p className="text-center text-gray-400 italic">
              No tasks yet. Add one above!
            </p>
          )}

          {todos.map((todo, index) => (
            <div
              key={todo.id}
              ref={(el) => (listRef.current[index] = el)}
              className="flex justify-between items-center bg-gray-800 rounded-md px-3 py-2 sm:px-4 sm:py-3 shadow hover:bg-gray-700 transition cursor-pointer"
            >
              <span
                onClick={() => toggleComplete(index)}
                className={`flex-1 select-none text-sm sm:text-base ${
                  todo.completed
                    ? 'line-through text-green-400 opacity-80'
                    : 'text-white'
                }`}
              >
                {todo.text}
              </span>

              <motion.button
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => removeTodo(todo.id, index)}
                className="text-red-500 hover:text-red-600 focus:outline-none ml-2"
                aria-label={`Delete task: ${todo.text}`}
              >
                <MdDelete className="text-xl sm:text-2xl" />
              </motion.button>
            </div>
          ))}
        </div>
      </motion.div>
    </main>
  );
}
