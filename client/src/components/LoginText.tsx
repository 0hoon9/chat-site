import React from 'react';

export interface Props {
  name: string;
  label: string;
  value: string;
  placeholder: string;
  error?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}

export const LoginText: React.FC<Props> = ({ name, label, value, placeholder, error, onChange, onBlur }) => {
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
        onChange={onChange}
        onBlur={onBlur}
        className={
          'w-full p-3 placeholder-graay-300 border border-gray-200 rounded-md shadow-md focus:outline-none focus:ring focus:ring-opacity-50' +
          (!!error ? ' border-red-300 ring-red-300' : '')
        }
      />
      {!!error && <div className='my-2 text-left text-red-400 text-sm'>{error}</div>}
    </div>
  );
};
