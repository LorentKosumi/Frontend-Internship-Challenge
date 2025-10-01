import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import avatar from "/avatar-default.svg"
import { FaLongArrowAltLeft } from "react-icons/fa";

import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from "react-redux";

import { editUser } from "./userSlice";

function UserPage(){

    const { id } = useParams()
    const [user, setUser] = useState()
    const dispatch = useDispatch()

     const [formData, setFormData] = useState({
            name: "",
            email: "", 
            company: "",
            address: "",
            phone: "",
            website: ""
        })

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(res => res.json())
        .then(data => {
            setUser(data)
            setFormData({
                name: data.name,
                email: data.email,
                company: data.company.name,
                address: `${data.address.street}, ${data.address.city}`,
                phone: data.phone,
                website: data.website,
            })
        })
    }, [id])

      // edit

      const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
  }
    
      const handleEdit = e => {
        e.preventDefault()
    
        const updatedUser = {
            ...formData,
            id:user.id,
            company: { name:formData.company}
        }
        dispatch(editUser(updatedUser))
        
        toast.success("User updated succesfully")
      }
    
      

    return(
        <div className="w-full flex flex-col justify-between items-center">
            
            <span className="absolute  left-10 top-5">
                <Link to='/' className="flex items-center gap-2 text-blue-500 hover:text-blue-900"><FaLongArrowAltLeft/> Back to main</Link>    
            </span>
            {/* <div className="w-1/2 h-100 bg-gray-100 rounded-2xl text-center">
                {user ? (
                <div className="w-full h-full flex flex-col justify-evenly items-center">
                    <h3>{user.name}</h3>
                    <p>{user.username}</p>
                    <p>{user.email}</p>
                    <p>{user.address.street}, {user.address.city}</p>
                    <p>{user.phone}</p>
                    <p>{user.website}</p>
                    

                </div>
            ) : (<p>Loading</p>)}
            </div> */}


            {user ? ( 



            <div className=" flex justify-center items-center">
                <div className="bg-white px-10 rounded-lg shadow-lg  w-screen h-screen flex justify-center items-center ">

                 <div className="flex flex-col items-center w-1/3">
                 <img src={avatar} alt="avatar" className="w-70 border rounded-full"/>   
                   <h3 className="mt-4 text-lg font-semibold">@{user?.username}</h3> 
                 </div>
                <form onSubmit={handleEdit} className="grid grid-cols-2 gap-6">
                
                    <div className="flex flex-col gap-4">

                        <label className="text-sm font-semibold">Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="border border-gray-300 shadow-sm px-3 py-2 rounded w-sm" />
                        <label className="text-sm font-semibold">Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border  border-gray-300 shadow-sm px-3 py-2 rounded w-sm" />
                        <label className="text-sm font-semibold">Company</label>
                        <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company" className="border  border-gray-300 shadow-sm px-3 py-2 rounded w-sm" />
                    </div>
                    
                    
                    <div className="flex flex-col gap-4">
                        <label className="text-sm font-semibold">Address</label>
                        <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" className="border  border-gray-300 shadow-sm px-3 py-2 rounded w-sm" />
                        <label className="text-sm font-semibold">Phone</label>
                        <input type="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone" className="border  border-gray-300 shadow-sm px-3 py-2 rounded w-sm" />
                        <label className="text-sm font-semibold">Website    </label>
                        <input type="text" name="website" value={formData.website} onChange={handleChange} placeholder="Website" className="border  border-gray-300 shadow-sm px-3 py-2 rounded w-sm" />
                    </div>

                    <div className="col-span-2 flex justify-end gap-3 mt-6">
                        
                        <button type="submit" className="bg-blue-500 rounded-md px-4 py-2 text-white font-semibold transition hover:bg-blue-900">Save Changes</button>
                    </div>
            </form>
             </div>   
            </div>

    ) : null }
        <ToastContainer position="top-right"/>
        </div>
    )
}
export default UserPage