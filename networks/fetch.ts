
import axios from 'axios';
import { z } from "zod"

const createImageResponse = z.object({
    imageUrl : z.string()
})

//  --- Méthode qui appelle la route de notre api pour créer une image ---
export const createImageRequest = async(description:string) => {

    return await axios.post('/api/openai',{
        description : description
    })
    .then(res  => createImageResponse.parse(res.data))
}

const createPostShareParams = z.object({
    title: z.string(),
    imageUrl: z.string(),
    tag: z.string()
});

export type createPostParams = z.infer<typeof createPostShareParams>

// -- Méthode qui appelle la route de notre api permettant de créer un post qui sera partagé dans la gallerie ---
export const createPostShare = async({ title, imageUrl, tag }: createPostParams)  => {

    return await axios.post("/api/sharepost",{
        title,
        imageUrl,
        tag
   })
   .then(res => res.data)
}