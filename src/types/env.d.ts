declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: "production" | "development" | "test";
    ENV: string;
    DATABASE_URL: string;
    API_PATH: string;
    ACCESS_TOKEN_SECRET: string;
    REFRESH_TOKEN_SECRET: string;
    REFRESH_TOKEN_EXPIRY: string;
    ACCESS_TOKEN_EXPIRY: string;
  }
}
