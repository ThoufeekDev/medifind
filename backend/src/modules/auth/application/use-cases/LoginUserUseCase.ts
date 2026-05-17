
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { LoginUserDTO } from "../dtos/LoginUserDTO";
import prisma from "../../../../config/database";
import { comparePassword } from "../../../../shared/utils/comparePassword";
import { generateAccessToken } from "../../../../shared/utils/generateAccessToken";
import { generateRefreshToken } from "../../../../shared/utils/generateRefreshToken";



export class LoginUserUseCase {
     
     constructor(private userRepository:IUserRepository ){}

     async execute(data:LoginUserDTO){
         
         const user = await this.userRepository.findByEmail(
            data.email
         )

         console.log("Useer ->",user);
         

         if(!user){
            throw new Error("Invalid credentials")
         }

         const isPasswordValid = 
         await comparePassword(
            data.password,
            user.password
        )

        if(!isPasswordValid){
            throw new Error("Invalid credentials")
        }
        const {
            password,
            ...safeUser
        } = user;
        const accessToken = generateAccessToken({
            userId:user.id,role:user.role

        });
        const refreshToken = generateRefreshToken({userId:user.id,role:user.role});
        return{
            accessToken,
            refreshToken,
            safeUser,
        }
     }
}