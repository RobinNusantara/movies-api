import { config as dotenv } from "dotenv";

dotenv();

export const config = {
    server: {
        port: Number(process.env.PORT) || 5000,
    },
    jwt: {
        signature: String(process.env.JWT_SIGNATURE) || "JWT_SIGNATURE",
    },
    api: {
        url: String(process.env.MOVIE_API_URL),
        key: String(process.env.MOVIE_API_KEY),
    },
};
