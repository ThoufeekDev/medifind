import { Role } from "@prisma/client"
export interface LoginUserDTO {
    email:string
    password:string
    role:Role
}