import { prisma } from "@/prisma/prisma";
import { NextResponse } from "next/server";
import { Configuration, OpenAIApi} from "openai"

//  mise en place de la configuration pour open api
const configuration = new Configuration({
	apiKey: process.env.OPENAI_API_KEY,
});

// création d'un nouveau client openApi
const openai = new OpenAIApi(configuration)

// --- Méthode qui permet de récupérer tous les posts stocké en BDD ---
export async function GET(Request: Request){

    const posts = await prisma.post.findMany();
	return NextResponse.json( {posts} , { status: 200 });
};


// --- Méthode qui permet de créer une nouvelle image à partir d'une description donnée par le user --
// 1. on récupère la description passée dans le corps de la requeête/
// 2. on créer une l'image à partir de la desxription et on spécifie le format attendu en retour
export async function POST(request: Request) {
	const { description } = await request.json();

	const openAiResponse = await openai.createImage({
		prompt: description,
		n: 1,
		size: "512x512",
	});

	const imageUrl = openAiResponse.data.data[0].url;

	return NextResponse.json({imageUrl,},{ status: 200 });
}

// return NextResponse.json({imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoejbUsZG0JWpTUPIcmtd6MLHFUP43LsJZLUNBzM4M1Q&s"}, { status: 200,})