import bcrypt from "bcryptjs";
import mongoose,{Schema,model, models} from "mongoose";


export interface IUser {
    _id:string,
    email:string,
    password:string,
    createdAt:Date,
    updatedAt:Date,
}


const UserSchema =new Schema<IUser>({
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true}
},{timestamps:true})


UserSchema.pre("save", async function(next){
    if(this.isModified("password")){
     this.password = await bcrypt.hash(this.password,10)
    }
    next()
})

const User = models.User || model<IUser>("User",UserSchema)

export default User
