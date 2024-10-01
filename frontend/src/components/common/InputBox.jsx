import React, { useState } from 'react'

const InputBox = ({ name,type,id,value,placeholder,icon,onChange}) => {

    const [ passwordVisible,setPasswordVisible ] =useState(false);

  return (
    <div className='relative w-[100%] mb-4'>
        <input type={ type == 'password' ? passwordVisible ? "text" : "password" :type}
           name={name}
           id={id}
           placeholder={placeholder}
           value={value}
           onChange={onChange}
           required
        className='border-none outline-none placeholder:text-gray-500 p-3 rounded-md text-gray-800'
       
        />
        <i className={'fi '+icon+ ' input-icon'}></i>

        {
          type === 'password' ? 

          <i className={'fi fi-rr-eye'+(!passwordVisible ? '-crossed':"")+' input-icon left-auto right-4 cursor-pointer'}
            onClick={()=>setPasswordVisible(currentVal =>
              !currentVal
            )}
          ></i>
        
          :""
        }
    </div>
  )
}

export default InputBox