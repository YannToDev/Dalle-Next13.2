// --- Composant Header qui est utilisé sur toutes les pages via la page Layout ---

import React from 'react'
import Image from 'next/image'

import Logo from '../public/assets/logo.png'
import Link from 'next/link'

export const Header = () => {
  
    return (
        <header className='absolute top-0 w-full bg-openAI_Primary p-8 text-white'>
            <div className='flex justify-between items-center'>
                {/* logo */}
                <Link href="/">
                    <div className='flex items-center space-x-2'>
                        <Image
                            src={Logo}
                            alt="Logo"
                            className='object-contain rounded-full h-16 w-16'
                        />
                        <h1 className='font-bold text-2xl'>DALL-E</h1>
                    </div>
                </Link> 

                {/* tag line */}
                <p className=' text-gray-500 text-md hidden xl:block mt-2'>
                    &quot; I tried drawing a perfect circle, but it ended up looking likea pottato, 
                    so i decided to ket the AI to the artwork instead &quot;
                </p>

                <Link 
                    href="/share" 
                    className='btn'
                >
                     Gallery
                </Link>
            </div>
        </header>
    )
}
