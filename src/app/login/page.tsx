"use client"
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'

const RegisterPage = () => {
    const [email,setEmail] =useState("")
    const [password,setPassword] = useState("")
    const router = useRouter()


    const handleSubmit =async (e:FormEvent<HTMLFormElement>)=>{
     e.preventDefault()
     
     const result = await signIn("credentials",{
        email,
        password,
        redirect:false,
     })

     if(result?.error){
        console.log({result.error});

     }
    else{
        router.push("/")
    }

    }
    
  return (
    <div>
    <h1>Register</h1>
     <form action="submit"  onSubmit={handleSubmit}>
       <div>
      <label htmlFor="">Email</label>
      <input type="email" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
       </div>
       
         <div>
      <label htmlFor="">Password</label>
      <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
       </div>
     
     <button>Submit</button>

     </form>
     <div>
       Don't have an Account?
       <button onClick={()=>router.push("/register")}>Register</button>
     </div>


    
    </div>
  )
}

export default RegisterPage