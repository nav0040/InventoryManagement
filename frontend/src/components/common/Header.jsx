import React from 'react'

const Header = ({title}) => {
  return (
    <header className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700">
        <div className='max-w-7xl mx-auto px-4 py-5 sm:px-6 lg:px-8'>
            <h1 className='text-2xl font-semibold'>{title}</h1>
        </div>
        
    </header>
  )
}

export default Header