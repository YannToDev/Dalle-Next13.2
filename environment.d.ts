// pour typer les variables d'environnement?
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            OPEN_API_Key : string;
            NEXT_PUBLIC_URL : string;
        }
    }
}

export {}