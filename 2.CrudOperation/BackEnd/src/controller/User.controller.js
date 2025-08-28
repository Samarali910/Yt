import mongoose from "mongoose";
import { User } from "../model/User.js";


export const CreateUser = async(req,res)=>{
      try {
         const {name,email,role,status} = req.body

         const requiredfilled = ["name","email","role","status"]

          const missingFilled = requiredfilled.find((field)=> !req.body[field])

            if(missingFilled){
                 return res.status(400).json({
                    error:`${missingFilled} is required`,
                    success:false
                 })
            }
        
            
           const existUser = await User.findOne({email:email})
           if(existUser){
               return res.status(400).json({
                  messege:"User already created",
                  success:false
               })
           }
           
            const createUser = await User.create({name,email,role,status})

           return res.status(201).json({
            messege:"User created Successfully",
             CreateUser:createUser,
             Success:true
           })

      } catch (error) {
           return res.status(500).json({
             success:false,
             error:error.message || "Internal server Error"
           })
      }
}

export const getAllUser = async(req,res)=>{
       try {
          const allUsers = await User.find({})
          return res.status(201).json({
            messege:"All Users get Sussessfully",
            users:allUsers
          })
       } catch (error) {
           return res.status(500).json({
             success:false,
             error:error.message || "Internal Server Error"
           })
       }
}


export const deleteUser = async(req,res)=>{
      try {
         const {userId} = req.query;
         if(!mongoose.isValidObjectId(userId)){
             return res.status(400).json({
                 success:false,
                 messege:"Invalid UserId"
             })
         } 

          const findUser = await User.findById(userId)
          if(!findUser){
             return res.status(400).json({
                success:false,
                messege:"User not found"
             })
          }

          const createDeleteUser = await User.deleteOne({_id:userId})
            
          return res.status(201).json(({
             success:true,
             messege:"User Deleted Successfully",
             DeleteUser:createDeleteUser
          }))

      } catch (error) {
         return res.status(500).json({
            success:false,
            messege:error.message || "Internal server error"
         })
      }
}


export const updateUser = async(req,res)=>{
       try {
          const {userId} = req.query;
          const{name,email,role,status} = req.body

          if(!mongoose.isValidObjectId(userId)){
             return res.status(400).json({
                success:false,
                messege:"userId is not Valid"
             })
          }

          const findUser = await User.findOne({_id:userId})
          if(!findUser){
             return res.status(400).json({
                success:false,
                messege:"User not found"
             })
          }

          const updateUser = await User.findByIdAndUpdate(userId,{name,email,role,status},{new:true})

          return res.status(201).json({
            success:true,
            messege:"User Updated Successfully",
            updatedUser:updateUser
          })
       } catch (error) {
          return res.status(500).json({
            success:false,
            error:error.message || "Internal Server Error"
          })
       }
}


export const bulkDelete = async(req,res)=>{
      try {
         const {userIds} = req.body;
         console.log("userIds",userIds)
         if(!Array.isArray(userIds) || userIds.length == 0){
             return res.status(400).json({
                success:false,
                messege:"userId not be an empty array"
             })
         }
        
         const validateIds = userIds.filter((id)=> !mongoose.isValidObjectId(id))
         if(validateIds.length > 0){
              return res.status(400).json({
                 messege:"UserIds invalid",
                 success:false,
                 validateIds:validateIds
              })
         }

          const deleteBulkUsers = await User.deleteMany({_id:{$in:userIds}})
          
           return res.status(201).json({
             messege:"Users deleted Successfully",
             success:true,
             deleteBulkUsers:deleteBulkUsers,
             deleteCounting:deleteBulkUsers.deletedCount
           })

      } catch (error) {
         return res.status(500).json({
             success:false,
             error:error.message || "Internal server Error"
         })
      }
}