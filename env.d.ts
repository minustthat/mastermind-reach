
declare namespace NodeJS {
    interface ProcessEnv {
        DB_URI: string;
        // Add more environment variables if needed
    }
}

declare global {
    namespace NodeJS {
        interface ProcessEnv extends ProcessEnv {}
    }
}
