declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "production" | "development" | "test";
    ENV: string;
    DATABASE_URL: string;
    API_PATH: string;
  }
}
