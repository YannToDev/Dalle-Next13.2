// -- Bouton pour DL une image utilisé dans le composant Community post  de la vue /share --
// Note: on a créer un composant spécifique car au click il exécute une méthode donc il doit être de type "client"
// et pour éviter d'avoir tout le composant communityPost qui soit de type client on isole le bouton

"use client"

import React, {FC} from 'react'
import FileSaver from 'file-saver';

type ButtonProps = {
    imageUrl: string
}

export const DownloadButton:FC<ButtonProps> = ( { imageUrl }) => {

    // on télécharge l'image à l'aide du package FileSaver
    const handleDownloadImage = (imageUrl:string) => {
        FileSaver.saveAs(imageUrl, imageUrl)
    };


  return (
      <button
            onClick={() =>handleDownloadImage(imageUrl)}
            className='btn mt-2 flex-1'    
        >
            Dowload
        </button>

  )
}