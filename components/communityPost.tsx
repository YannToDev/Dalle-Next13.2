// --- Composant qui permer d'afficher un post donné dans la gallerie ---

import React, { FC } from 'react'
import Image  from "next/image"
import { DownloadButton } from './DownloadButton';

import type { Post } from '@prisma/client';


export const CommunityPost:FC<Post> = (post) => {
  

    return (
    <article className='bg-openAI_Primary flex flex-col p-5 rounded-lg'>
        <div className='relative h-[512px] w-auto rounded-lg'>
            <Image
                src={post.imageUrl}
                alt={post.title}
                fill
                className='object-contain'
            />
        </div>

        <h1 className='text-2xl text-white uppercase font-bold tracking-widest sm:mt-2' >{post.title}</h1>
        <p className='text-yellow-500 mt-2'>{post.tag}</p>

        <DownloadButton 
            imageUrl={post.imageUrl}
        />

    </article>
  )
}