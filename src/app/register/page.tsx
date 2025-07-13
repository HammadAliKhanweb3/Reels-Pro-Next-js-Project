"use client"
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'

const RegisterPage = () => {
    const [email,setEmail] =useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const router = useRouter()


    const handleSubmit =async (e:FormEvent<HTMLFormElement>)=>{
     e.preventDefault()
     
     if(!password || !confirmPassword){
        alert("password does not match")
        return;

     }

     try {
        
        const res = await fetch("/api/auth/register",{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(
            {
                email,
                password
            }
        )
            

        })

        const data = res.json();

        if(!res.ok){
            throw new Error(data.error || "Registratin failed")
        }


        router.push("/login")
     } catch (error) {
          console.log(error);
              
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

   <div>
      <label htmlFor="">Confirm Password</label>
      <input type="password" placeholder='confim password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
       </div>
     
     <button>Submit</button>

     </form>


    
    </div>
  )
}

export default RegisterPage