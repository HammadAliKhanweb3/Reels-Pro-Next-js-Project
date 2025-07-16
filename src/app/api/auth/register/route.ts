import User from "@/model/Users";
import { NextRequest, NextResponse } from "next/server";
import { ConnectToDb } from "@/lib/db";

export async function POST(request:NextRequest){
    
    try {

    const {email,password} = await request.json()
 
   

    if(!email || !password){
        return NextResponse.json({error:"Invalid credentials"},{status:400})
    }
        await ConnectToDb()
        
        
        const existingUser = await User.findOne({email})
    
        if(existingUser){
            return NextResponse.json({error:"User already existed"},{status:400})
        }
         
        const user = await User.create({email,password})
    
        return NextResponse.json(
            {
                message:"User created successfully",
                user
            },{
                status:200
            }
        )
    
    } catch (error) {
        console.log("Registration Error",error);
        return NextResponse.json({error:"Registration failed"},{status:500})
                       
    }






}