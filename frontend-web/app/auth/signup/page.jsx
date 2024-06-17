'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import config from '@/constants/apiconfig';
import { useUser } from '@/components/UserContext';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import useUpdateView from '@/components/useUpdateView';

const SignUp = () => {
    
    useUpdateView()
    const router = useRouter()
    const { user, setUser } = useUser();

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isError, setisError] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const userData = {
        username: username,
        password: password,
        email: email,
        role: 'user'
    };

    try {
        const response = await fetch(`${config.apiBaseUrl}/auth/signup`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });
  
        if (!response.ok) {
            setisError(true);
          throw new Error('Failed to sign up');
          
        }
        const responseData = await response.json();
        setisError(false);
        console.log('Sign up successful', responseData);
        Cookies.set('userData', JSON.stringify(responseData.data), { expires: 7 })
        setUser(responseData.data);
        router.push('/')

      } catch (error) {
        console.error('Error signing up:', error.message);
        setisError(true);
      }

  };

  return (
    <div className='pt-[100px] flex justify-center items-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-sm'>
        <h2 className='text-2xl font-bold mb-6 text-center'>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label htmlFor='username' className='block text-gray-700 mb-2'>
              Username
            </label>
            <input
              type='text'
              id='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-red-400'
              required
            />
          </div>
          <div className='mb-4'>
            <label htmlFor='email' className='block text-gray-700 mb-2'>
              Email
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-red-400'
              required
            />
          </div>
          <div className='mb-6'>
            <label htmlFor='password' className='block text-gray-700 mb-2'>
              Password
            </label>
            <input
              type='password'
              id='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-primary-red-400'
              required
            />
          </div>
            {isError && (
                <p className='text-red-500 text-sm mb-4'>
                Failed to sign up. Please try again.
                </p>
            )}
          <button
            type='submit'
            className='w-full bg-primary-red text-white py-2 px-4 rounded hover:bg-primary-red-700 transition duration-200'
          >
            Sign Up
          </button>
        </form>
        <p className='mt-4 text-center text-gray-600'>
          Already have an account?{' '}
          <Link href='/auth/signin' className='text-primary-red hover:underline'>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
