import React from 'react'

const Navbar = () => {
  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-white shadow-md'>
        <div className='max-w-7xl mx-auto px-14 sm:px-6 lg:px-8'>
            <div className='flex justify-between items-center h-16'>
                <span className='text-white text-xl font-bold'>Logo</span>
            </div>
        </div>
    </nav>
  )
}

export default Navbar
