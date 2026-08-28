import { Role } from "@prisma/client"

export interface RegisterUserDTO{
    name:string
    email:string
    password:string,
    role:Role,
    turnstileToken:string
}