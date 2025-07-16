// "use client"
// import { useRouter } from 'next/navigation'
// import React, { FormEvent, useState } from 'react'

// const RegisterPage = () => {
//     const [email,setEmail] =useState("")
//     const [password,setPassword] = useState("")
//     const [confirmPassword,setConfirmPassword] = useState("")
//     const router = useRouter()


//     const handleSubmit =async (e:FormEvent<HTMLFormElement>)=>{
//      e.preventDefault()
     
//      if(!password || !confirmPassword){
//         alert("password does not match")
//         return;

//      }

//      try {
        
//         const res = await fetch("/api/auth/register",{
//         method:"POST",
//         headers:{
//             "Content-Type":"application/json"
//         },
//         body:JSON.stringify(
//             {
//                 email,
//                 password
//             }
//         )
            

//         })

//         const data =await res.json();
      
         
//         if(!res.ok){
//             throw new Error(data.error || "Registratin failed")
//         }


//         router.push("/login")
//      } catch (error) {
//           console.log(error);
              
//      }
//     }
    
//   return (
//     <div>
//     <h1>Register</h1>
//      <form action="submit"  onSubmit={handleSubmit}>
//        <div>
//       <label htmlFor="">Email</label>
//       <input type="email" placeholder='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
//        </div>
       
//          <div>
//       <label htmlFor="">Password</label>
//       <input type="password" placeholder='password' value={password} onChange={(e)=>setPassword(e.target.value)} />
//        </div>

//    <div>
//       <label htmlFor="">Confirm Password</label>
//       <input type="password" placeholder='confim password' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)} />
//        </div>
     
//      <button>Submit</button>

//      </form>


    
//     </div>
//   )
// }

// export default RegisterPage


"use client"


import { useForm } from "react-hook-form"
import {  z } from "zod"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { FcGoogle } from "react-icons/fc";
import { zodResolver } from "@hookform/resolvers/zod"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter

} from "@/components/ui/card"
import Link from "next/link"




const formSchema = z.object({
  email: z.string().email("Invaled email address"),
  password:z.string().min(5,{
    message:"Password must be greater than 8 characters"
  }),
  confirmPassword:z.string().min(5,{
    message:"Password must be greater than 8 characters"
  }),
})

type FormFields = z.infer<typeof formSchema>

const RegisterForm=()=> {


  const router = useRouter()
  
  const form = useForm<FormFields>({
    resolver:zodResolver(formSchema),
    defaultValues:{
      email:"",
      password:"",
      confirmPassword:""
    }
  })
  const {setError,handleSubmit,formState:{errors}} = form


  const onSubmit = async (data: FormFields) => {
   try {
      const { email, password } = data;

     
      form.clearErrors();

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
      },
        body: JSON.stringify({
        email,
        password
      })
      });
    
      const result = await response.json();
        console.log(result);
        
      if (!response.ok) {
          throw new Error(result.error || "Registration failed. Please try again.");
        }
      
      router.push("/login");
    
   } catch (error:any) {
      setError("root.serverError", {
        type: "manual",
        message: error || "An unexpected error occurred. Please try again."
      });
   }
  };

  return (
   <div className="flex  justify-center items-center min-h-screen grid-cols-2 space-x-20">
     <div>
      <Image  className="w-96 h-96 rounded" height={16} width={16} src="/ins.png" alt="picture"/>
     </div>
    <Card className="w-[20rem]">
      <CardHeader>
        <CardTitle className="mb-2 text-center text-3xl font-bold">
        Reels Pro
        </CardTitle>
        <CardDescription className="text-center ">Sign up to watch Ai generated Amazing short videos from the world.</CardDescription>
      </CardHeader>

         <CardContent >
     <Form {...form} >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 flex flex-col" >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
         <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Confirm Password" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

           <div className="flex flex-col space-y-4">

        <Button className="cursor-pointer" type="submit">Submit</Button>

<h2 className="text-center">OR</h2>
<Button className="cursor-pointer">Signup with google <span><FcGoogle /></span></Button>
           </div>
      </form>
    </Form>
     
     </CardContent>
     <CardFooter className="space-x-2 text-center">
     <p className="text-center">Already have an account?</p>
     <Link href={"/login"} className="text-blue-500 hover:underline-offset-2 text-center">login</Link>
     </CardFooter>
     </Card>
    
   </div>
  )
}

export default RegisterForm