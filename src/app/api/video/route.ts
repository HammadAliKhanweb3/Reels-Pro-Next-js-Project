import { ConnectToDb } from "@/lib/db";
import { Video } from "@imagekit/next";
import { NextRequest, NextResponse } from "next/server";
import { IVideos } from "@/model/Videos";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {

    try {
         
        await ConnectToDb()

        const videos = await Video.find({}).sort({createdAt:-1}).lean()
        
        if(!videos || videos.length==0){
           return NextResponse.json(
            {error:"Videos not found"},
            {status:500}
           )
        }

        return NextResponse.json(
               { videos}
        ,{status:200})

    } catch (error) {
        console.log(error,"Error in getting Videos");
        return NextResponse.json(
            {error:"Videos not found"},
            {status:500}
           )
        
    }
    
}

async function POST(req:NextRequest){
   try {
    
     const session = getServerSession(authOptions)
     

     if(!session){
        return NextResponse.json({error:"Unathuroized"},{status:401})
     }

     const body:IVideos  = await req.json()
 
     if(
         !body.title ||
         !body.description ||
         !body.videoUrl ||
         !body.thumbnailUrl
     ){
         return NextResponse.json(
             {error:"All fields are required to upload video"},
             {status:500}
            )
     }
 
     const videoData= {
     ...body,
     constrols:body?.controls ?? true,
     transformation:{
         height:1920,
         width:1080,
         quality:body?.transformations.quality ?? true,
 
     }
 
     }
 
     const video =await Video.create(videoData);
 
 
     return NextResponse.json({video},{status:200})
   } catch (error) {
    return NextResponse.json(
        {error:"Error in uploading Video"},
        {status:500}
       )
    
   }
}