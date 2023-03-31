//  --- Version qui utlise Hook Form ---

// par défault tous les dossiers de composant sont coté server donc on ajoute la propriété suivant
// pour utiliser coté client.
"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';

import { createPostParams, createPostShare } from '@/networks/fetch';

// pour sauvegarder des fichiers
import FileSaver  from "file-saver";

import { UserInputs } from '../UserForm/UserInputs'
import  { ImagePreview } from "../ImagePreview";


export const InputPanel = () => {

    // Mise en place d'un clien pour invalider la requête
    const queryClient = useQueryClient()

    // mise en place du router pour la redirection
    const router = useRouter();

   const  [imageUrl, setImageUrl] = useState<string>(
        "https://miro.medium.com/v2/resize:fit:512/0*trlKLh5rfkj6St3V.jpeg");

    // state pour le chargement
    const [isLoading, setIsLoading] = useState(false);

    
    // on télécharge l'image à l'aide du package FileSaver
    const handleDownloadImage = () => {
        FileSaver.saveAs(imageUrl, imageUrl)
    };

    // paramètres passées à la mutation sont dans le composant enfant User Inputs donc voir comment faire
    const createPostMutation = useMutation({
        mutationFn: createPostShare,
        onSuccess:() => {
           queryClient.invalidateQueries(["posts"]),
           router.push("/share");
        }
    })

    const handleShareImage = (post: createPostParams) => {
        createPostMutation.mutate({
            title: post.title,
            imageUrl: post.imageUrl,
            tag:post.tag
        })
    }

  return (
    
    <div className='mt-40'>
        <UserInputs setImageUrl={setImageUrl} />            

        <ImagePreview 
            imageUrl={imageUrl}
            isLoading={isLoading}
        />

        {imageUrl !== "" && (
            <div className='flex gap-2 mt-2'>
                <button
                    onClick={() => handleShareImage}
                    disabled={imageUrl === ""}
                    className='btn flex-1 disabled:cursor-not-allowed'
                >
                    {isLoading? "Sharing..." : "Share"}
                </button>
                <button
                    onClick={handleDownloadImage}
                    disabled={imageUrl === ""}
                    className='btn flex-1 disabled:cursor-not-allowed'
                >
                    Dowload
                </button>
            </div>
        )}
    </div>
  )
}
