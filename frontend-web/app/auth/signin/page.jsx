'use client'
import React from 'react'
import { useState } from 'react';
import Link from 'next/link';
import { useUser } from '@/components/UserContext';
import config from '@/constants/apiconfig';
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie';
import useUpdateView from '@/components/useUpdateView';

const SignIn = () => {

    useUpdateView()
    const router = useRouter()

    const { user, setUser } = useUser();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isError, setisError] = useState(false)

    const handleSubmit = async (e) => {
      e.preventDefault();
      const userData = {
        username: username,
        password: password,
    };

      try {
          const response = await fetch(`${config.apiBaseUrl}/auth/signin`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
          });
    
          if (!response.ok) {
              setisError(true);
            throw new Error('Failed to sign in');
            
          }

          const responseData = await response.json();
          setisError(false);
          console.log('Sign in successful', responseData);
          console.log(responseData.data)
          Cookies.set('userData', JSON.stringify(responseData.data), { expires: 7 })
          setUser(responseData.data);

          router.push('/')

        } catch (error) {
          console.error('Error signing in:', error.message);
          setisError(true);
        }
    };

    return (
        <div className='pt-[100px] flex justify-center items-center min-h-screen bg-gray-100'>
            <div className='bg-white p-8 rounded shadow-md w-full max-w-sm'>
            <h2 className='text-2xl font-bold mb-6 text-center'>Sign In</h2>
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
                Failed to sign in. Please try again.
                </p>
            )}
                <button
                type='submit'
                className='w-full bg-primary-red text-white py-2 px-4 rounded hover:bg-primary-red-700 transition duration-200'
                >
                Sign In
                </button>
            </form>
            <p className='mt-4 text-center text-gray-600'>
                Don't have an account yet?{' '}
                <Link href='/auth/signup' className='text-primary-red hover:underline'>
                Sign up
                </Link>
            </p>
            </div>
        </div>
    )
}

export default SignIn