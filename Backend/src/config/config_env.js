import {config} from "dotenv"
config();

export const DB_URL = process.env.DB_URL
export const SECRET_KEY_JWT = process.env.SECRET_KEY_JWT
export const HASH_NUMBER = process.env.HASH_NUMBER
export const REFRESH_TOKEN = process.env.REFRESH_TOKEN
export const PORT = process.env.PORT || 3000
