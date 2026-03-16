import { Request } from "express";


export interface dbConfig {
    DB_URL: string;
    connectionLimit?:number
}

export interface AuthUser {
  id: number | string;
  email?: string;
}

export interface AuthRequest extends Request {
  user?: AuthUser;
}