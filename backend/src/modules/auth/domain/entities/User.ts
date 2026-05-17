
import {Role} from "@prisma/client"
export interface User{
    id:string
    name:string
    email:string
    role:Role
    password:string
}

export type safeUser = Omit<User,"password">
export interface AuthResponse {
    user:safeUser
    accessToken:string
    refreshToken:string
}