// --- Version qui utilise Hook Form ---

import React,{FC, useEffect} from 'react'
import { z } from "zod";

import { useForm,SubmitHandler  } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from '@tanstack/react-query';

//  -- méthode qui fetch la route de l'api qui permet de créer une image --
import {  createImageRequest } from "@/networks/fetch";

import { TUserInput } from '@/types';


type UserInputsProps = {
    setImageUrl :React.Dispatch<React.SetStateAction<string>>
} 

// schéma de validation des données du formulaire
const UserInputsSchema = z.object({
    title :z.string().min(4,{message:"4 charaters min"}).max(30,{message:"30 characters max"}),
    tag:z.string().min(3,{message:"3 charaters min"}).max(15,{message:"15 characters max"}),
    description : z.string().min(10,{message:"10 charaters min"}).max(50,{message:"50 characters max"})
})

type UserInputsType = z.infer<typeof UserInputsSchema>

export const UserInputs = ({ setImageUrl } :UserInputsProps ) => {

    const { register, handleSubmit, reset, formState:{ errors, isSubmitSuccessful, isSubmitting}} = useForm<UserInputsType>({
        resolver :zodResolver(UserInputsSchema)
    });

    // const { isLoading, isError} = useQuery<TUserInput>({
    //     queryKey:["posts"],
    //     queryFn: fetchPosts
    // })

    // -- Méthode manipulée par le formulaire lors de sa soumission qui utilise le fetch pour créer une image
    const onSubmit:SubmitHandler<UserInputsType>  = async(Inputs) => {
        
        const { imageUrl } = await createImageRequest(Inputs.description);
        setImageUrl(imageUrl)
    }

    // permet de reset le formulaire ave les valeurs par défault, c'est le moye le plus safe, beaucoup plus
    // quand passant le reset dans la méthode de soumission qui est manipulée par le handlesubmit() car on peut avoir des bugs
    useEffect(() => {

        if(isSubmitSuccessful){
            reset();
        }
    },[isSubmitSuccessful, reset])

  return (
    
    <form 
        onSubmit={handleSubmit(onSubmit)}
        className='bg-openAI_Primary p-6 flex flex-col space-y-3 rounded-lg'
    >
        <div className='flex items-center space-x-3'>
            <div className="flex flex-col flex-1">
                <input
                    type="text"
                    className='input'
                    placeholder='Enter Title...'
                    {...register("title")}
                />
                {errors.title && <span className="text-red-500">{errors.title.message}</span>}
            </div>

             <div className="flex flex-col flex-1">
                <input
                    type="text"
                    className='input'
                    placeholder='#AI Open AI'
                    {...register("tag")}
                />
                {errors.tag && <span className="text-red-500">{errors.tag.message}</span>}
            </div>
        </div>  
          <input 
                type="text" 
                className='input'
                placeholder='Enter Description...'
                {...register("description")}
            />
            {errors.description && <span className="text-red-500">{errors.description.message}</span>}

        <button
            disabled={isSubmitting} 
            className='btn flex-1'
        >
            { isSubmitting? "Generating..." : "Generate"}
        </button>
    </form>
  )
}
