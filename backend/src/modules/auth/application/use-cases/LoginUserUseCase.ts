
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { LoginUserDTO } from "../dtos/LoginUserDTO";
import { comparePassword } from "../../../../shared/utils/comparePassword";



export class LoginUserUseCase {
     
     constructor(private userRepository:IUserRepository ){}

     async execute(data:LoginUserDTO){

        console.log("trigger")
         
         const user = await this.userRepository.findByEmail(
            data.email
         )
   

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
       
        if(!user.isVerified){
            throw new Error(
                "Please verify your email"
            )
        }

        const {
            password,
            ...safeUser
        } = user;
         
        return{

            user:safeUser,
        }
     }
}