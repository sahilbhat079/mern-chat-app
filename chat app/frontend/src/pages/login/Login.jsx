import React from 'react'

export default function login() {
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
                <input type="text" placeholder="enter username " className='w-full input input-bordered h-10'></input>
           
            </div>
            {/* password */}
            <div>
                <label className="label ">
                    <span className="text-base label-text">password</span>
                </label>
                <input type="text" placeholder="enter password" className='w-full input input-bordered h-10'></input>
           
            </div>
            
<a className='text-sm hover:underline hover:text-blue-500 mt-2 inline-block'>
    {"Don't "}have an accout?
</a>


<div>
    <button className='btn btn-block btn-sml mt-2'>login</button>
</div>

        </form>
       
      </div>
    </div>
  )
}
