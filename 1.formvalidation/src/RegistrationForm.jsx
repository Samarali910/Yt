 import React from 'react'
 import { useState } from 'react'
 const RegistrationForm = () => {
     const [formData, setFormData] = useState({
         firstName: "",
         lastName: "",
         email: "",
         phone: "",
         company: "",
         position: "",
         website: "",
         address: "",
         city: "",
         zipCode: "",
         country: "",
         message: "",
       })
       const[filterFocus,setFilterfocus] = useState(null);

       const handleFilterFocus = (field)=>{
           setFilterfocus(field)
       }

   
   return (
     <div className='bg-black flex min-h-screen justify-center items-center p-8'>
       <div className='w-full max-w-4xl mx-auto border border-gray-500 bg-transparent p-8'>
         <div className='text-center'>
             <h1 className='text-3xl text-white  font-bold mb-3'>Professional Registration Form</h1>
             <p className='text-gray-300'>Please fill out all required fields below

          </p>
         </div>
          <form >
          <div className='grid grid-cols-1 md:grid-cols-2 gap-7'>
             <div>
                <label htmlFor="firstName">
                    first Name
                </label>
                <input 
                type="text" 
                className={`w-full px-4 py-3 border placeholder:text-gray-500 text-white focus:outline-none
                 
                `}
                placeholder='Enter your first name'
                onFocus={()=>handleFilterFocus("firstName")}
                />
             </div>
             <div>
                  <label htmlFor="firstName">
                    last Name
                </label>
                <input 
                type="text" 
                className="w-full px-4 py-3 border placeholder:text-gray-500 text-white focus:outline-none "
                placeholder='Enter your last name'
                />
             </div>
          </div>
       </form>
       </div>

       

     </div>
   )
 }
 
 export default RegistrationForm