"use client"

import axios from 'axios'
import { useState } from 'react'
import { Http_BackendUrl } from '../config'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const AuthPage = ({ isSignin }: { isSignin: boolean }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [name, setFullName] = useState("")

  const router = useRouter();


  const handleSignin = async () => {
    try {
      const response = await axios.post(`${Http_BackendUrl}/signin`, { username, password })
      if (response.data) {
        console.log(response.data)
        localStorage.setItem("token", response.data.token)
        router.push("/dashboard")

      }
    } catch (error) {
      alert("Error signing in: " + error)
      console.error("Error signing in: ", error)
    }
  }

  const handleSignup = async () => {
    try {
      const response = await axios.post(`${Http_BackendUrl}/signup`, { username, password, name })
      if (response.data) {
        console.log(response.data)
        alert("User created successfully")
        router.push("/signin")
      }
    } catch (error) {
      alert("Error signing up: " + error)
      console.error("Error signing up: ", error)
    }
  }

  return (
    <div className="w-screen h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-blue-900/20 flex justify-center items-center">
      <div className="w-full max-w-sm bg-purple-800/20 backdrop-blur-md border border-purple-500/30 text-white rounded-2xl px-6 py-8 shadow-xl">
        <h2 className="text-2xl font-bold text-center mb-6">{isSignin ? "Sign In" : "Sign Up"}</h2>

        {!isSignin && (
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Full Name"
            className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-800/50  border border-purple-500/30 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
          />
        )}

        <input
          type="text"
          required
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          className="w-full px-4 py-2 mb-4 rounded-lg bg-gray-800/50   border border-purple-500/30 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        />

        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-2 mb-6 rounded-lg bg-gray-800/50  border border-purple-500/30 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50"
        />

        <button
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-blue-500 hover:to-purple-600 text-white font-semibold py-2.5 rounded-xl transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
          onClick={() => {
            if (isSignin) {
         handleSignin()
         } else {
        handleSignup()
        }
          }}
        >
          {isSignin ? "Sign In" : "Sign Up"}
        </button>
       {isSignin ? 
  <p className='pt-3 flex justify-center text-center'>
    If you are not signed up?
    <Link href="/signup">
    
    <button className='relative px-2 font-semibold text-emerald-500 group'>
      Sign up
      <span className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-emerald-500 transition-all duration-300 group-hover:w-full" />
    </button>
    </Link>
  </p> 
  :
  <p className='pt-3 flex justify-center text-center'>
    If you are signed in?
    <Link href="/signin">
    
    <button className='relative px-2 font-semibold text-emerald-500 group'>
      Sign in
      <span className="absolute left-0 -bottom-0.5 h-0.5 w-0 bg-emerald-500 transition-all duration-300 group-hover:w-full" />
    </button>
    </Link>
  </p> 

  
}
      </div>
    </div>
  )
}

export default AuthPage
