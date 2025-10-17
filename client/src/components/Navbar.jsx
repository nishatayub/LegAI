import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-[#F5F3F0]'>
      <div className='max-w-7xl mx-auto px-6 lg:px-8 py-4'>
        <div className='bg-[#5C2E2E] rounded-full px-8 py-4 shadow-lg'>
          <div className='flex justify-between items-center'>
            {/* Logo */}
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 bg-white rounded-full flex items-center justify-center'>
                {/* LOGO PLACEHOLDER - Replace with your logo */}
                <span className='text-[#5C2E2E] text-xl font-bold'>L</span>
              </div>
              <span className='text-white text-lg font-semibold hidden sm:block'>LegAI</span>
            </div>

            {/* Navigation Links */}
            <ul className='hidden md:flex gap-8 text-white'>
              <li>
                <a href="#home" className='hover:text-[#E8D5D0] transition-colors'>Home</a>
              </li>
              <li>
                <a href="#about" className='hover:text-[#E8D5D0] transition-colors'>About Us</a>
              </li>
              <li>
                <a href="#help" className='hover:text-[#E8D5D0] transition-colors'>Features</a>
              </li>
              <li>
                <a href="#footer" className='hover:text-[#E8D5D0] transition-colors'>Contact Us</a>
              </li>
            </ul>

            {/* Auth Buttons */}
            <div className='flex items-center gap-3'>
              <Link 
                to="/login"
                className='text-white px-5 py-2 rounded-full font-semibold hover:bg-white/10 transition-all duration-200 border border-white/30'
              >
                Login
              </Link>
              <Link 
                to="/signup"
                className='bg-white text-[#5C2E2E] px-5 py-2 rounded-full font-semibold hover:bg-[#E8D5D0] transition-all duration-200 shadow-md hover:shadow-lg'
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
