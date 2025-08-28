import api from "../axiosinstance";

 const postData = async(url,data)=>{
       try {
           const response = await api.post(url,data)
           return response
       } catch (error) {
           throw error
       }
}

 const getData = async(url)=>{
       try {
          const response = await api.get(url)
          return response.data
       } catch (error) {
          throw error
       }
}

 const deleteData = async(url)=>{
       try {
          const response = await api.delete(url)
          return response.data
       } catch (error) {
         throw error
       }
}

 const deleteWithformData = async(url,userIds)=>{
       try {
          const response = await api.delete(url,{data:userIds})
          return response.data
       } catch (error) {
         throw error
       }
}


 const editData = async(url,data)=>{
      try {
         const response = await api.put(url,data)
         return response
      } catch (error) {
         throw error
      }
}

// ******************* Create User ******************

 export const createUser = async(formData)=>{
       try {
         const response = await postData('/createuser',formData)
         return response.data
       } catch (error) {
          throw error
       }
 }


 export const getAllUsers = async()=>{
      try {
         const response = await getData('/users')
         return response
      } catch (error) {
         throw error
      }
 }

 export const deleteUser = async(userId)=>{
       try {
         const response = await deleteData(`/deleteuser?userId=${userId}`)
         return response
       } catch (error) {
         throw error
       }
 }

 export const deleteBulkUser = async(userIds)=>{
       try {
         const response = await deleteWithformData("/bulkdelete",{userIds})
         return response
       } catch (error) {
         throw error
       }
 }