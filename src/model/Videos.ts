import {Schema,model,models} from "mongoose"

export const videoDimensions = {
    width:1080,
    height:1920
} as const


export interface IVideos {
    _id:string,
    title:string,
    description:string,
    videoUrl:string,
    thumbnailUrl:string,
    controls?:number,
    transformations:{
        height:number,
        width:number,
        quality?:number
    }    

    createdAt:Date,
    updatedAt:Date,
}


 const videoSchema  = new Schema<IVideos>({
    title:{type:String,required:true,},
    description:{type:String,required:true,},
    videoUrl:{type:String,required:true,},
    thumbnailUrl:{type:String,required:true,},
    controls:{type:Boolean,required:true,},
    transformations:{
        height:{type:Number,default:videoDimensions.height},
        width:{type:Number,default:videoDimensions.width,},
        quality:{type:Number,min:1,max:100}

    }
 },{timestamps:true})

 const Video= models?.Video || model<IVideos>("Video",videoSchema)
 
 
 export default Video