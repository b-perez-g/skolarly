import React from 'react'
import Logo from '@/components/LogoLogin'
import LoginForm from '@/components/LoginForm'

export default function Home() {
    return (
        <div className='w-[80]  justify-center'>
            <nav className="pt-9 pb-2 flex justify-center h-[55px]">
                <Logo />
            </nav>
            <div className="grid grid-cols-1 mt-9 lg:mt-0 lg:grid-cols-3 lg:gap-20 lg:p-5 2xl:w-[80%] 2xl:m-auto height-login">
                <div className="w-[50%] m-auto lg:w-full">
                    <img src="/loginImage.png" alt="imagen login" />
                </div>
                <LoginForm />
            </div>
        </div>
    )
}
