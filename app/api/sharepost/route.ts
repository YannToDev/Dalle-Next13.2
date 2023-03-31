import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";

type CreatePost ={
    data: {
    title: string,
    imageUrl: string,
    tag:string,
    }
}

//  ---Permet de créer le post en base de donnée au moment du partage  ---
export async function POST(request: Request) {
	const { title, imageUrl, tag } = await request.json();

	const data = await prisma.post.create<CreatePost>({
        data: {
            title,
            imageUrl,
            tag,        
        }
    })

	return NextResponse.json({
       data
    },{ status : 200,});
}