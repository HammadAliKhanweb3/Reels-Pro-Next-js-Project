"use client" 
import {
    upload,
} from "@imagekit/next";

import { ChangeEvent, useState } from "react";

type FileInputProps={
    onSuccess:(res:any) => void
    onProgress:(res:number) => void
    fileType?:"image" | "video";

}
const FileUpload =({onSuccess,onProgress,fileType}:FileInputProps)=>{
    const [uploading,setUploading] = useState(false)
    const [error,setError] = useState<string | null>(null)

    const validateFile = (file:File) =>{

        if(fileType === "video"){
            if(!file.type.startsWith("video/")){
                setError("Upload valid video file ")
                return false
            }

        }

        if(file.size > 100 * 1024 * 1024){
            setError("File size must be less than 100 mb")
            return false
        }
        return true
           
    }
        const handleUpload = async(e:ChangeEvent<HTMLInputElement>)=>{
      
        const file = e.target.files?.[0]
        if(!file || !validateFile(file)) return;
        
        setUploading(true)
        setError(null)

        const authRes = await fetch("api/auth/imagekit-auth")
        const auth = await authRes.json()
   try {
         const res =await upload({
             file,
         fileName: file.name,
         publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY!,
         signature: auth.signature,
         expire: auth.expire,
         token: auth.token,
         onProgress:(event)=>{
             if(event.lengthComputable && onProgress){
                const percent = (event.loaded / event.total) * 100;
                 onProgress(Math.round(percent))
             }
            
         }
     })
     onSuccess(res)
   } catch (error) {
    console.log("upload failed",error);
    
   } finally {
    setUploading(false)
   }
    }
   
    return (
        <>

            <input type="file"  onChange={handleUpload}/>
            {uploading && <span>Loading....</span>}
            {error && <span className="text-red-500">{error}</span>}

           
        </>
    );
};

export default FileUpload;
