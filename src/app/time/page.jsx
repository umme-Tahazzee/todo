'use client'

import { useEffect, useState } from "react"

const page = () => {
   const [time, setTime] = useState(new Date());

   useEffect(()=>{
        const timer = setTimeout(()=>new Date(), 1000);
        return clearTimeout(timer)
   },[])

   const getGreeting = (hour) => {
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    if (hour >= 17 && hour < 21) return "Good Evening";
    return "Good Night";

  }

  return (

      <div className=' text-5xl sm:text-xl mb-10 text-gray-300' >
        {/* <h1>{time.toLocaleTimeString()}</h1> */}
        <h2>{getGreeting(time.getHours())}</h2>
      </div>
   
  )
}

export default page