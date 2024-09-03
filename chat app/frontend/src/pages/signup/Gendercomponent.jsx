import React from 'react'

export default function Gendercomponent({onCheckboxChange,selectedGender}) {
  return (
    <div className='flex'>
    <div className="form-control">
  <label className={`label cursor-pointer ${selectedGender==="male"?"selected":""} `}>
    <span className="label-text px-1">Male</span>
    <input type="checkbox" checked={selectedGender==="male"} onChange={()=>onCheckboxChange("male")} className="checkbox border-slate-900" />
  </label>
</div>
<div className="form-control">
  <label className={`label cursor-pointer  ${selectedGender === "female"?"selected":""}`}>
    <span className="label-text px-1">Female</span>
    <input type="checkbox"   checked={selectedGender === "female"} onChange={()=>onCheckboxChange("female")} className="checkbox  border-slate-900" />
  </label>
</div>
      
    </div>
  )
}
