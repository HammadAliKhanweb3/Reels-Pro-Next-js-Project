import mongoose from "mongoose";

declare global {
    var mongoose: {
      conn: typeof mongoose | null;
      promise: Promise<typeof mongoose> | null;
    };
  }
const MONGODB_URI = process.env.MONGODB_URI!;


if(!MONGODB_URI){
    throw new Error("Please provide MONGODB_URI in the environment variables")
}

let cached  = global.mongoose;

if(!cached){
    cached =  global.mongoose ={conn:null, promise: null}
}



export async function ConnectToDb () {
    
    
    if(cached.conn){
        return cached.conn
    }

    if(!cached.promise) {
        const opts = {
            bufferCommands:true,
            maxPoolSize:10
        }

         await mongoose.connect(MONGODB_URI,opts).then(()=> mongoose.connection)
        
    }


    try {
        cached.conn = await cached.promise
         
    } catch (error) {
        cached.promise = null
        throw error
    }

    return cached.conn

} 



