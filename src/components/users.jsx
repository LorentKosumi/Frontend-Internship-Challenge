import { createSlice } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addUser, deleteUser, setUsers, editUser } from "./userSlice";

import { IoPersonAddOutline } from "react-icons/io5";
import { MdOutlineDelete, MdOutlineEdit  } from "react-icons/md";
import { FiEdit } from "react-icons/fi";
import { CgProfile } from "react-icons/cg";

import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function Users(){
    
    const {id} = useParams()

    const dispatch = useDispatch()
    const users = useSelector(state => state.users.value)
    const [search, setSearch]  = useState("")

    const [selectedUser, setSelectedUser] = useState(null)
    const [IsAddOpen , setIsAddOpen] = useState(false)
    const [isEditOpen, setIsEditOpen] = useState(false)

    const [formData, setFormData] = useState({
        name: "",
        email: "", 
        company: ""
    })

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
    .then(res => res.json())
    .then(data => dispatch(setUsers(data)))
    

  }, [dispatch])

  // add user

  const handleChange = (e) => {
    setFormData({
        ...formData,
        [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const newUser = {
        id: users.length + 1,
        name: formData.name,
        email: formData.email,
        company: {name: formData.company}
    }

    dispatch(addUser(newUser))
    setFormData({name: "", email: "", company: ""})
    setIsAddOpen(false)
  }


  // edit

  const handleEdit = e => {
    e.preventDefault()

    const updatedUser = {
        ...formData,
        id:selectedUser.id,
        company: { name:formData.company}
    }
    dispatch(editUser(updatedUser))
    setSelectedUser(null)
    setFormData({name: "", email: "", company: ""})
    setIsEditOpen(false)
  }

  const openEditModal = user => {
    setSelectedUser(user)
    setFormData({name: user.name, email: user.email, company: user.company.name})
    setIsEditOpen(true)
  }


  // search

  const searchedUsers = users.filter(user => {
    const query = search.toLowerCase()
    return(
        user.name.toLowerCase().includes(query) || user.email.toLowerCase().includes(query) 
    )
    
  })






    return(
        <div className="w-1/2 flex flex-col justify-center items-center">
        
        <div className="flex justify-between py-2 w-full">
            <input type="text" placeholder="Search by name or email..." value={search} onChange={e => setSearch(e.target.value)}  className="border border-gray-200 rounded-md w-sm p-2"/>
            <button className="w-30 bg-blue-500 rounded-md p-2 text-white font-semibold flex items-center justify-center gap-2 transition-all hover:bg-blue-900" onClick={() => setIsAddOpen(true)}> <IoPersonAddOutline/>Add user</button>
        </div>

        {/* add user modal */}

        {IsAddOpen && ( 
            <div className="fixed inset-0 bg-black/20 flex justify-center items-center">
            <div className=" bg-white px-10 rounded-lg shadow-lg w-150 h-100 flex justify-center items-center">
                <form onSubmit={handleSubmit} className="flex flex-col gap-10 w-full ">
                
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="border border-gray-300 shadow-sm px-3 py-2 rounded" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border  border-gray-300 shadow-sm px-3 py-2 rounded" />
                <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company" className="border  border-gray-300 shadow-sm px-3 py-2 rounded" />

                <div className="flex justify-end gap-3">
                    <button type="button" className="bg-gray-500 rounded-md px-4 py-2 text-white font-semibold transition-all hover:bg-gray-900" onClick={() => setIsAddOpen (false)}>Cancel</button>
                    <button type="submit" className="bg-blue-500 rounded-md px-4 py-2 text-white font-semibold transition-all hover:bg-blue-900">Add User</button>
                </div>
            </form>
            </div>

        </div> ) }



        {/* Edit user modal   */}

        {isEditOpen && (
            <div className="fixed inset-0 bg-black/20 flex justify-center items-center">
                <div className="bg-white px-10 rounded-lg shadow-lg w-150 h-100 flex justify-center items-center">
                <form onSubmit={handleEdit} className="flex flex-col gap-10 w-full ">
                
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" className="border border-gray-300 shadow-sm px-3 py-2 rounded" />
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" className="border  border-gray-300 shadow-sm px-3 py-2 rounded" />
                    <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Company" className="border  border-gray-300 shadow-sm px-3 py-2 rounded" />

                    <div className="flex justify-end gap-3">
                        <button type="button" className="bg-gray-500 rounded-md px-4 py-2 text-white font-semibold transition-all hover:bg-gray-900" onClick={() => setIsEditOpen(false)}>Cancel</button>
                        <button type="submit" className="bg-blue-500 rounded-md px-4 py-2 text-white font-semibold transition-all hover:bg-blue-900">Edit User</button>
                    </div>
            </form>
                 </div>   
            </div>
        )}

        <table className='table-auto border-collapse border border-blue-200 w-full text-left '>
      <thead>
        <tr className='bg-blue-500 text-white'>
        <th className='border border-white px-4 py-2'>ID</th>
        <th className='border border-white px-4 py-2'>Name</th>
        <th className='border border-white px-4 py-2'>Email</th>
        <th className='border border-white px-4 py-2'>Company</th>
        <th className='border border-white px-4 py-2'>Actions</th>
        </tr>
      </thead>
      <tbody>
        {searchedUsers.map(user => (
          <tr key={user.id} className='hover:bg-gray-100'>
          
            <td className='border border-gray-300 px-4 py-2'>{user.id}</td>
            <td className='border border-gray-300 px-4 py-2'>{user.name}</td>
            <td className='border border-gray-300 px-4 py-2'>{user.email}</td>
            <td className='border border-gray-300 px-4 py-2'>{user.company.name}</td>
            <td className='border border-gray-300 px-4 py-2'>
                <div className="flex justify-evenly">
                    <MdOutlineDelete className="text-red-500 text-2xl" onClick={() => dispatch(deleteUser(user.id))}/>
                    <MdOutlineEdit  className="text-blue-500 text-2xl" onClick={() => openEditModal(user)}/>
                    <Link to={`/profile/${user.id}`}>
                        <CgProfile className="text-2xl text-gray-500"/>
                    </Link>
                </div>
            </td>
        </tr>
           
        ))}
      </tbody>
    </table>
    </div>
    )
}

export default Users