import React from 'react';
import logo from '../assets/neco.png';

export interface Props {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export const Navbar: React.FC<Props> = ({ onClick }) => {
  return (
    <div className='bg-dark fixed w-full top-0 left-0 z-10 flex items-center justify-between shadow-2xl py-4 px-6 nav'>
      <div className='flex items-center'>
        <img src={logo} alt='Neco Chat' className='h-12 w-12' />
        <h1 className='text-blue-reallight ml-4 text-2xl font-semibold'>Neco chat</h1>
      </div>
      <button
        type='button'
        className='px-3 py-2 text-blue-reallight text-sm bg-blue-dark font-medium rounded-full py-3 px-6 shadow-md hover:bg-gray-800 disabled:opacity-50 focus:outline-none'
        onClick={onClick}
      >
        로그아웃
      </button>
    </div>
  );
};
