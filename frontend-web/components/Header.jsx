'use client'
import Link from 'next/link'
import Image from 'next/image'
import { CustomButton } from '.'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/router'
import { useUser } from './UserContext'
import Cookies from 'js-cookie';
import { useState, useEffect } from 'react'


const Header = () => {

  const { user, setUser } = useUser();
  const pathName = usePathname()
  const isActive = (pathname) => pathname === pathName
  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    const userCookie = Cookies.get('userData');
    if (userCookie) {
      setUser(JSON.parse(userCookie))
    }
    setisLoading(false)
    
  },[])

  if (isLoading) return null

  return (
    <header className='w-full fixed z-10 border-b-2 bg-white '>
      <nav className=" mx-auto flex justify-between items-center px-6  ">
        <div className='flex items-center'>
          <Link href="/" className="flex justify-center items-center ">
            <Image
              src = "/logo.png"
              alt = "logo"
              width={100}
              height={100}
              className=' object-contain'
            />
          </Link>
          <div className='mx-auto mt-5 space-x-8 ml-16 '>
            <Link href="/" className={isActive('/') ? 'text-primary-red font-bold': ' hover:text-primary-red' } >Home</Link>
            {user?.role != "admin" && (<Link href="/about" className={isActive('/about') ? 'text-primary-red font-bold': ' hover:text-primary-red transition duration-300' } >About</Link>)}
            {user?.role === "admin" && (<Link href="/admin" className={isActive('/admin') ? 'text-primary-red font-bold': ' hover:text-primary-red transition duration-300' } >Admin</Link>)}
            
          </div>
        </div>
        
        {pathName !== '/auth/signin' && !user && (<CustomButton
          title ="Sign in"
          containerStles={'mt-5'}
          handleClick={() => window.location.href = '/auth/signin'}
        />) }
        
        {user && (
          <div className='flex items-center'>

            <p className='mt-5'>
              Welcome,{' '}
              <span className='text-primary-red font-bold'>{user.username}</span>
            </p>
            <CustomButton
              title ="Sign out"
              containerStles={'mt-5 ml-5 hover:bg-red-600 transition duration-300'}
              handleClick={() => {
                setUser(null)
                Cookies.remove('userData')}
              }
              
            />
          </div>
        )}

      </nav>

    </header>
  )
}

export default Header