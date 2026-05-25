import {z} from "zod";

export const registerSchema = z.object({
    name:z.string().min(3),
    email:z.email(),
    password:z.string().min(6),
    confirmPassword:z.string(),
    role:z.enum([

   "USER",

   "ADMIN"
]),
    turnstileToken:z.string()
}).refine((data)=>data.password===data.confirmPassword,{
    message:"Password do not match",
    path:["confirmPassword"]
})