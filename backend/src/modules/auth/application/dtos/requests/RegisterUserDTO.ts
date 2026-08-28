export interface RegisterUserDTO{
    name:string
    email:string
    password:string,
    role:"USER" | "ADMIN",
    turnstileToken:string
}