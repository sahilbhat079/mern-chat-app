import React from 'react'
import Gendercomponent from './Gendercomponent'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import useSignup from '../../hooks/useSignuphook'
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function Signup() {
    const [inputs, setinputs] = useState({
        fullname: "",
        username: "", 
        password: "", 
        confirmpassword:"",
        gender: "", 
    });
     const [hidden, sethidden] = useState(true);
     const { loading, signup } = useSignup();
     const handlesubmit = async (e) => {
       e.preventDefault();
       // console.log(inputs);
       await signup(inputs);
     };

     const handleCheckboxChange = (gender) => {
       setinputs({ ...inputs, gender });
     };

    return (
        <div className='flex  flex-col items-center justify-center min-w-96 mx-auto'>
            <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter  backdrop-blur-lg bg-opacity-0'>
                <h1 className='text-3xl font-semibold text-center text-gray-300'> Signup <span className='text-blue-300'>Chat__App</span></h1>
                <form onSubmit={handlesubmit}>
                    {/* fullname */}
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Fullname</span>
                        </label>
                        <input type="text" placeholder="fullname " className='w-full input input-bordered h-10' 
                        value={inputs.fullname} onChange={(e)=>{ setinputs({...inputs,fullname:e.target.value})}}>
                        </input>

                    </div>

                    {/* username */}
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">Username</span>
                        </label>
                        <input type="text" placeholder="enter username "
                         className='w-full input input-bordered h-10'
                         value={inputs.username} onChange={(e)=>{ setinputs({...inputs,username:e.target.value})}}
            
                         ></input>

                    </div>
                    {/* email
                    <div>
                        <label className="label p-2">
                            <span className="text-base label-text">email</span>
                        </label>
                        <input type="email" placeholder="enter username " className='w-full input input-bordered h-10'></input>

                    </div> */}

                    {/* password */}



                    <div className='relative'>
                        <label className="label">
                            <span className="text-base label-text">password</span>
                        </label>
                        <input type="text"  placeholder="enter password" className='w-full input input-bordered h-10 pr-10  p-2.5'
                            value={inputs.password} onChange={(e) => { setinputs({ ...inputs, password: e.target.value }) }}
                        ></input>

                        <button
                            type="button"
                            className='absolute right-2.5 bottom-2.5 flex items-center px-2 end-0'
                            onClick={() => sethidden(!hidden)}
                        >
                            {hidden ? <FaEyeSlash /> : <FaEye />} {/* Toggle icon based on `hidden` */}
                        </button>
                    </div>

                    <div>
                        <label className="label ">
                            <span className="text-base label-text">Confirm password</span>
                        </label>
                        <input type="text" placeholder="Confirm password" className='w-full input input-bordered h-10'
                         value={inputs.confirmpassword} onChange={(e)=>{ setinputs({...inputs,confirmpassword:e.target.value})}}></input>

                    </div>

           <Gendercomponent onCheckboxChange={handleCheckboxChange} selectedGender={inputs.gender}/>

           {/* links */}
                    <Link to={'/login'} className='text-sm hover:underline hover:text-blue-500 mt-2 inline-block'>
                        {"Already "}have an accout?
                    </Link>


                    <div>
                        <button className='btn btn-block btn-sml mt-2'>{loading?<span className="loading loading-spinner loading-md"></span>:"Signup"}</button>
                    </div>

                </form>

            </div>
        </div>
    )
}
