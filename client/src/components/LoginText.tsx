import React from 'react';

export interface Props {
  name: string;
  label: string;
  value: string;
  placeholder: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LoginText: React.FC<Props> = ({ name, label, value, placeholder }) => {
  return (
    <div className='mb-6'>
      <label htmlFor={name} className='block mb-2 text-left text-gray-500 font-semibold'>
        {label}
      </label>
      <input
        type='text'
        name={name}
        value={value}
        placeholder={placeholder}
        className={
          'w-full p-3 placeholder-graay-300 border border-gray-200 rounded-md shadow-md focus:outline-none focus:ring focus:ring-opacity-50'
        }
      />
    </div>
  );
};

export const PasswordText: React.FC<Props> = ({ name, label, value, placeholder }) => {
  return (
    <div className='mb-6'>
      <label htmlFor={name} className='block mb-2 text-left text-gray-500 font-semibold'>
        {label}
      </label>
      <input
        type='password'
        name={name}
        value={value}
        placeholder={placeholder}
        className={
          'w-full p-3 placeholder-graay-300 border border-gray-200 rounded-md shadow-md focus:outline-none focus:ring focus:ring-opacity-50'
        }
      />
    </div>
  );
};
