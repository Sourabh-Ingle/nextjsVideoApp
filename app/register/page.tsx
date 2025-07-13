"use client"
import { useRouter } from 'next/navigation';
import React,{useState} from 'react'

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmedPassword, setconfirmedPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async(e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmedPassword){
            alert("confirmed password and password are not same");
            return;
        }
        try {
            const res = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,password
                })
            })
            const data = await res.json();
            if (!res.ok) {
                throw new Error(data.error || "Registration failed !" )
            }
            console.log(data);
            router.push('/login')
        } catch (error) {
            console.log('Error', error);
        }
    }

  return (
      <div>
          <h2>Registration</h2>
          <form onSubmit={handleSubmit}>
              <input type="text"
                  placeholder='eamil'
                  value={email}
                  onChange={(e)=>setEmail(e.target.value)}
                  required
              />
              <input type="password"
                  placeholder='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
              />
              <input type="password"
                  placeholder='confirmed password'
                  value={confirmedPassword}
                  onChange={(e) => setconfirmedPassword(e.target.value)}
                  required
              />
              <button type="submit">Register</button>
              
          </form>

          <div>
              <p>alredy have account? <a href="/login">login</a></p>
          </div>
      </div>
  )
}

export default RegisterPage