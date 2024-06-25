import dotenv from "dotenv";
dotenv.config();

export const URL: string = process.env.URL || "http://localhost:3000";
