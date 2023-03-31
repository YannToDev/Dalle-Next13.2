// par défault tous les dossiers de composant sont coté server donc on ajoute la propriété suivant
// pour utiliser coté client.
"use client"
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from "axios";

// pour sauvegarder des fichiers
import FileSaver  from "file-saver";

// impor des  composants 
import { UserInputs } from './UserInputs'
import  { ImagePreview } from "./ImagePreview";

// pour typer le state
import { TUserInput } from '@/types'


export const InputPanel = () => {

    const router = useRouter();

    // -- State pour les valeurs entrées dans les inputs par le user
    const [userInputs, setUserInputs] = useState<TUserInput>({
        title:"",
        tag:"",
        description:""
    });

    // pour stocker la valeur des inputs dans le cache avant de les réinitialiser
    const [userInputCache, setUserInputCache] = useState<TUserInput>({
        title:"",
        tag:"",
        description:""
    });

    // state pour stocker l'url de l'image
    const  [imageUrl, setImageUrl] = useState<string>(
        "https://miro.medium.com/v2/resize:fit:512/0*trlKLh5rfkj6St3V.jpeg");

    // state pour le chargement
    const [isLoading, setIsLoading] = useState(false);
    
    // -- méthode passées au composant enfant et exécutée lors de la soumission du form --
    const handleSubmit = async( e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(userInputs.title === "" || userInputs.description === "") return alert("enter all inputs");
        setIsLoading(true);

        try {
            
            const { data } = await axios.post("/api/openai",{
                description : userInputs.description
            },{
               headers: {
                "content-type": "application/json"
               } 
            })
            console.log(data)
            setImageUrl(data.imageUrl)

        } catch (error) {

            let message = "Unknown error"
            if(error instanceof Error) message = error.message
            alert(message)

        } finally {
            setIsLoading(false);
        }

        setUserInputCache({...userInputs});
        setUserInputs({
            title:"",
            tag:"",
            description:""
        })
    }

    // on télécharge l'image à l'aide du package FileSaver
    const handleDownloadImage = () => {
        FileSaver.saveAs(imageUrl, imageUrl)
    };

    // -- méthode qui permet de partager une photo crée dans la galerie --
    // on passe en paramètre à Axios les valeur de userInputCache car on les as réinitialiser
    //  donc sinon lors du partage on crée un nouveau post en BDD avec des champs vide pour title et tag
    const handleShareImage = async()=> {
        setIsLoading(true);

        try {
            
            const { data } = await axios.post("/api/sharepost",
                {
                    title: userInputCache.title,
                    imageUrl: imageUrl,
                    tag: userInputCache.tag
                },{
                    headers :{ "content-type": "application/json"}
                }
            )
        } catch (error) {

            let message = "Unknown error"
            if(error instanceof Error) message = error.message
            alert(message)

        } finally {
            setIsLoading(false);
        }

        console.log(userInputCache)
        router.push("/share")
    };


  return (
    
    <div className='mt-40'>
        {/* User Inputs */}
        <UserInputs 
            userInputs={userInputs}
            setUserInputs ={setUserInputs}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
        />
        {/* Image Preview */}
        <ImagePreview 
            imageUrl={imageUrl}
            isLoading={isLoading}
        />

        {/*  Si on a bien une url saisie pour l'image  */}
        {imageUrl !== "" && (
            <div className='flex gap-2 mt-2'>
                <button
                    onClick={handleShareImage}
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
