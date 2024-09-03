import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useLogin from '../../hooks/uselogin';

export default function Login() {
const [username,setusername]=useState("");
const [password,setpassword]=useState("");
const {loading,login}=useLogin();

 const handlesubmit=async (e)=>{
e.preventDefault();
await login(username,password);
 }



  return (
    <div className='flex  flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter  backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'> login <span className='text-blue-300'>Chat__App</span></h1>
        <form>
           
            {/* username */}
            <div>
                <label className="label p-2">
                    <span className="text-base label-text">Username</span>
                </label>
                <input type="text" placeholder="enter username " className='w-full input input-bordered h-10' onChange={(e)=>{setusername(e.target.value)}} value={username}></input>
           
            </div>
            {/* password */}
            <div>
                <label className="label ">
                    <span className="text-base label-text">password</span>
                </label>
                <input type="text" placeholder="enter password" className='w-full input input-bordered h-10'  onChange={(e)=>{setpassword(e.target.value)}} value={password} ></input>
           
            </div>
            
<Link to={'/signup'} className='text-sm hover:underline hover:text-blue-500 mt-2 inline-block'>
    {"Don't "}have an accout?
</Link>


<div>
    <button className='btn btn-block btn-sml mt-2' onClick={handlesubmit}>{loading?<span className="loading loading-spinner loading-md"></span>:"login"}</button>
</div>

        </form>
       
      </div>
    </div>
  )
}
