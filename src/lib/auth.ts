import User from "@/model/Users";
import { NextAuthOptions} from "next-auth";
import  CredentialsProvider  from "next-auth/providers/credentials";
import { ConnectToDb } from "./db";
import bcrypt from "bcryptjs";



export const authOptions:NextAuthOptions = {
      providers:
      [
      CredentialsProvider({
       
        name: 'Credentials',
        
        credentials: {
          email: { label: "Email", type: "email", },
          password: { label: "Password", type: "password" }
        },

        async authorize (credentials) {
            if(!credentials?.email || !credentials?.password){
                throw new Error("Invalid credentials")
            }

               try {
                 await ConnectToDb()
                 const user =await User.findOne({email:credentials.email})
 
                 if(!user){
                     throw new Error("No user found")
                 }

                 const isValid = await bcrypt.compare(credentials?.password,user.password)

                 if(!isValid){
                     throw new Error("Invalid credentials")
                 }

                 return {
                    id:user._id.toString(),
                    email:user.email,
                 }

               } catch (error) {
                console.log("Auth Error",error);
                throw error                  
               }

            }
        
        
      }),

    
    ],

    callbacks:{
        async jwt({ token, user }) {
            if(user){
                token.id = user.id
            }
            return token
          },
          
          async session({ session, token }) {
            if(session.user){
                session.user.id = token.id as string
            }
              return session
            },
    },
    pages:{
        signIn: '/login',
        error: '/login', 
    },
    session:{
        strategy: "jwt",
        maxAge: 30 * 24 * 60 * 60
    },
    secret:process.env.NEXTAUTH_SECRET,
}