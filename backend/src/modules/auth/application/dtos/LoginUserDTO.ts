
export interface LoginUserDTO {
    email:string
    password:string
    role:"USER" | "ADMIN"
}