"use client"
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();
    const handleSubmit =async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
       const result= await signIn("credentials", {
            email,
            password,
            redirect:true
       })
        if (result?.error) {
            console.log(result.error)
        } else {
            router.push('/')
        }
    }

  return (
      <div>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
              <input type="text"
                  placeholder='eamil'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
              />
              <input type="password"
                  placeholder='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
              <button type="submit">Login</button>
          </form>

          <div>
              <p>Don't have an account ?</p>
              <button onClick={()=>{router.push("/register")}}>Register</button>
          </div>
    </div>
  )
}

export default Login