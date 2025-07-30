'use client'

import { useRouter } from 'next/navigation'
import { FaArrowsTurnToDots } from "react-icons/fa6"
import { IoMdAdd } from "react-icons/io"
import Subtext from './subtext/page';
import Time from '@/app/time/page'

export default function Home() {
  
  
  //routing
  const router = useRouter()
  const handleClick = () => {
    router.push('/todo')
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center
     justify-center px-6 py-12 sm:px-10">
    
    <div className='w-full max-w-5xl' >
     
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="cursive-text text-3xl sm:text-4xl md:text-5xl font-bold text-red-700 font-serif">
          FocusFlow
        </h1>
        <div className="p-2 rounded blink-bg">
          <FaArrowsTurnToDots className="text-white text-2xl sm:text-3xl" />
        </div>
      </div>

      {/* greeting  */}
       <Time/>
      {/* Subtext */}
      <Subtext/>

      {/* Message */}
      <div className="bg-gray-800 rounded-lg p-6 text-center shadow-lg mb-12">
        <p className="text-lg sm:text-xl">
          You do not have any tasks yet. <br />
          Click on the <span className="text-violet-400 font-bold">+</span> button to add one.
        </p>
      </div>


      {/* Floating Add Button */}
      <div className="flex justify-center">
        <button
          onClick={handleClick}
          className="bg-violet-600 hover:bg-violet-700 text-white rounded-full p-4 shadow-lg transition duration-300"
          aria-label="Add Task"
        >
          <IoMdAdd className="text-2xl sm:text-3xl" />
        </button>
      </div>
      </div>
    
    </div>
  
   
  )
}
