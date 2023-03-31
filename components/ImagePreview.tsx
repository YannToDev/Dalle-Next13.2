// --- Composant qui permet d'afficher l'image ---

import React, {FC} from 'react';;
import Image from "next/image"
// import de l'image preview
import  preview  from "../public/assets/defImage.png";

import { Loader } from './Loader';

// pour typer les données reçues par ce composant
import { ImagePreviewProps } from '@/types'


export const ImagePreview:FC<ImagePreviewProps> = ({ imageUrl, isLoading }) => {

  return (

    <div className='mt-4'>
        <div className='relative w-full flex items-center justify-center'>
            {/* Pour que  l'image fonctionnne avec tailwind il faut passer "fill" au composant image et la "w" et "h" à la div
            qui englobe l'image */}
            {imageUrl === "" ? (
                <div className='w-[312px] h-[312px] lg:w-[512px] lg:h-[512px]'>
                    <Image
                        fill
                        src ={preview}
                        alt=""
                        className='object-contain'
                    />
                </div>
            ) :
            (
                <div className='w-[312px] h-[312px] lg:w-[512px] lg:h-[512px]'>
                    <Image
                        fill
                        src ={imageUrl}
                        alt=""
                        className='object-contain'
                    />
                </div>
            )}
        
            {/* Si l'image est en cours de chargement on affiche le Loader et un overlay */}
            { isLoading && (
                <div className='absolute inset-0 flex items-center justify-center bg-black/30'>
                    <Loader />
                </div>
            )}

        </div>
    </div>
  )
}
