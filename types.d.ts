import { ReactComponentElement } from "react";
import { Post } from "@prisma/client"

type TUserInput ={
    title:string;
    tag:string;
    description:string;
}

// typer les props reçues par le composant UserInputs
type UserInputsProps = {
    handleSubmit : (e :React.FormEvent<HTMLFormElement>) =>void
    userInputs :TUserInput;
    setUserInputs :React.Dispatch<React.SetStateAction<TUserInput>>
    isLoading :boolean
}

// export type Post = {
//     id:number,
//     title: string,
//     imageUrl:string
//     tag:string;
//     createdt: string
// }

type GalleryProps = {
    posts : Post[]
}

type ImagePreviewProps = {
    imageUrl :string;
    isLoading :boolean;
}