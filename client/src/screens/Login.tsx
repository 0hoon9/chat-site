import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import logo from '../assets/neco.png';
import { validateEmail, validateUsername } from '../utilities/validation';
import { LoginText } from '../components/LoginText';
import { login } from '../store/auth.slice';

export interface FormFields {
  email: string;
  username: string;
}

export interface FormErrors {
  email?: string;
  username?: string;
}

export const Login: React.FC = () => {
  const [user, setUser] = useState<FormFields>({ email: '', username: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const dispatch = useDispatch();

  const validate = (name: string, value: string) => {
    switch (name) {
      case 'email':
        setErrors({ ...errors, [name]: validateEmail(value) });
        break;
      case 'username':
        setErrors({ ...errors, [name]: validateUsername(value) });
        break;
    }
  };

  const loginButtonDisabled = () => {
    if (!user.email || !user.username) return true;
    if (!!errors.email || errors.username) return true;
    return false;
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setUser({
      ...user,
      [name]: value,
    });

    if (errors[name as keyof FormErrors]) {
      validate(name, value);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    validate(name, value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(login(user));

    // localStorage에 user정보 저장
    localStorage.setItem('user', JSON.stringify(user));
  };

  return (
    <div className='flex justify-center items-center h-screen bg-blue-dark'>
      <div className='container bg-white m-4 p-12 w-500 text-center rounded-md shadow-2xl max-w-full mx-auto'>
        <img src={logo} className='block mx-auto mb-3 text-center w-24' alt='Neco' />
        <h1 className='text-3xl mb-8 font-bold text-gray-700'>로그인</h1>
        <form onSubmit={handleSubmit}>
          <LoginText
            label='이메일'
            name='email'
            value={user.email}
            placeholder='doge@example.com'
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.email}
          />
          <LoginText
            label='닉네임'
            name='username'
            value={user.username}
            placeholder='Neco'
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.username}
          />
          <div className='mb-3'>
            <button
              className='w-full px-3 py-4 text-white bg-blue font-medium rounded-md shadow-md hover:bg-blue-dark disabled:opacity-50 focus:outline-none'
              disabled={loginButtonDisabled()}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
