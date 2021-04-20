import React, { useState } from 'react';
import logo from '../assets/neco.png';
import { LoginText, PasswordText } from '../components/LoginText';

export interface FormFields {
  email: string;
  password: string;
}

export const Login: React.FC = () => {
  const [user, setUser] = useState<FormFields>({ email: '', password: '' });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <div className='flex justify-center items-center h-screen bg-blue-dark'>
      <div className='container bg-white m-4 p-12 w-500 text-center rounded-md shadow-2xl max-w-full mx-auto'>
        <img src={logo} className='block mx-auto mb-3 text-center w-24' alt='Neco' />
        <h1 className='text-3xl mb-8 font-bold text-gray-700'>로그인</h1>
        <form onSubmit={handleSubmit}>
          <LoginText label='이메일' name='email' value={user.email} placeholder='neco@example.com' onChange={handleChange} />
          <PasswordText label='비밀번호' name='password' value={user.password} placeholder='비밀번호 입력' onChange={handleChange} />
          <div className='mb-3'>
            <button className='w-full px-3 py-4 text-white bg-blue font-medium rounded-md shadow-md hover:bg-blue-dark disabled:opacity-50 focus:outline-none'>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
