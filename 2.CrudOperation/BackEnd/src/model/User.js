import mongoose,{Schema} from "mongoose";

  const UserSchema = new Schema({
       name:{
        type:String,
        required:true
       },
       email:{
        type:String,
        required:true
       },
       role:{
         type:String,
         enum:["User","Admin","Moderator","Manager"]
       },
       status:{
         type:String,
         enum:["Active","Inactive","Pending"],
         default:"Active"
       }
  },{timestamps:true})

  export const User = mongoose.model("User",UserSchema)

