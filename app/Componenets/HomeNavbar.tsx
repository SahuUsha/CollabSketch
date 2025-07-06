"use client"


import Link from 'next/link'
import  {useEffect, useState} from 'react'

const HomeNavbar = () => {
    const [token, settoken] = useState("")

    useEffect(()=>{

        const storedToken = localStorage.getItem("token")
        if(storedToken){
            settoken(storedToken)
        }else{
            settoken("")
        }

    },[])

    const handleSignOut =()=>{
        localStorage.removeItem("token")
        settoken("")
        window.location.href = "/"

    }

  return (
 <div className="mx-auto  w-[90%] lg:w-[97%]  max-w-7xl bg-purple-800/20 backdrop-blur-md border border-purple-500/30 rounded-2xl py-4 px-6 text-white shadow-md">
      <div className="flex items-center justify-between">
          <button className="text-xl font-semibold cursor-pointer">
        <Link href="/" >
            🎨 CollabSketch
        </Link>
            </button>
   
        <div className="space-x-6 text-md font-medium text-slate-200">
         {
            token ?
            
    
        <button onClick={()=>handleSignOut()} className="relative group">
          Sign out
          <span className="absolute left-0 -bottom-1.5 w-0 h-0.5  bg-white transition-all duration-300 group-hover:w-full"></span>
        </button>
   
     : 
     <div className="space-x-6 text-md font-medium text-slate-200">
        <Link href="/signin">
        <button className="relative group">
          Sign in
          <span className="absolute left-0 -bottom-1.5 w-0 h-0.5  bg-white transition-all duration-300 group-hover:w-full"></span>
        </button>
      </Link>

      <Link href="/signup">
        <button className="relative group">
          Sign up
          <span className="absolute left-0 -bottom-1.5 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full"></span>
        </button>
      </Link>
     </div>
      
         }

            


        </div>
      </div>
    </div>
  )
}

export default HomeNavbar
