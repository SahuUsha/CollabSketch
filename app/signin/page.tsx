"use client"

import { useRouter } from "next/navigation";
import AuthPage from "../Componenets/AuthPage"
import { useEffect } from "react";


const Siginin = () => {

  
     const router = useRouter();
  
    useEffect(() => {
      const token = localStorage.getItem('token');
  
      if (token) {
        // Redirect to dashboard or home if already logged in
        router.replace('/dashboard');
      }
    }, []);

  return <AuthPage isSignin={true} />
}

export default Siginin
