import React from 'react'
import { prisma } from "@/prisma/prisma";

import {Gallery}  from "@/components/Gallery"

// C'est un serveur component donc on peut accéder directement au backend via Prisma
// -- Méthode qui permet de récupérer tous les posts et de les renvoyer --
async function getPosts(){

    const posts = await prisma.post.findMany();
    return posts;
}


export default async function Share() {

    // on récupère les posts  en appelant la méthode précédente
    const posts = await getPosts();

  return (
    <main className='max-w-5xl mx-auto'>
      <Gallery 
        posts={posts}
      />
    </main>
  )
}