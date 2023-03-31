// -- composant qui contient la gallerie de posts à afficher ---

import React, {FC} from 'react'

import { CommunityPost } from './communityPost'

// pour typer les props reçues par ce commposant
import { GalleryProps }  from '@/types'



export const Gallery:FC<GalleryProps> = ({ posts }) => {

    return <section className='mt-40'>
            <h1 className='text-white text-2xl md:text-4xl lg:text-5xl text-center my-5 underline'>Community showcase</h1>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
               {posts.map(post =>(
                    <CommunityPost 
                        key={post.id}
                        {...post}
                    />
               ))}
            </div>
        </section>

}