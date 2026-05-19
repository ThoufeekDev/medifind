
import {Role} from "@prisma/client"
export interface User{
    id:string
    name:string
    email:string
    role:Role
    isVerified:boolean
    password:string

}

export type safeUser = Omit<User,"password">

// for login type
export type CreateUserData =Omit<User, "id">
export interface AuthResponse {
    user:safeUser

}
