import React from 'react';
import logo from '../assets/neco.png';

const Navbar = () => {
  return (
    <div className='bg-blue-dark fixed w-full top-0 left-0 z-10 flex items-center justify-between shadow-sm py-3 px-6 nav'>
      <div className='flex items-center'>
        <img src={logo} alt='Chat Site' className='h-12 w-12' />
        <h1 className='ml-3 text-2xl font-semibold'>Neco chat</h1>
      </div>
      <button
        type='button'
        className='px-4 py-2 text-white bg-blue font-medium rounded-md shadow-md hover:bg-blue-dark disabled:opacity-50 focus:outline-none'
        // onClick={onClick}
      >
        로그아웃
      </button>
    </div>
  );
};

export default Navbar;
