
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { LoginUserDTO } from "../dtos/LoginUserDTO";
import { comparePassword } from "../../../../shared/utils/comparePassword";


// Error Handling
import {NotFoundError} from "../../../../shared/exceptions/NotFoundError";
import { UnauthorizedError } from "../../../../shared/exceptions/UnauthorizedError";
import { ForbiddenError } from "../../../../shared/exceptions/ForbiddenError";
export class LoginUserUseCase {
     
     constructor(private userRepository:IUserRepository ){}

     async execute(data:LoginUserDTO){
         
         const user = await this.userRepository.findByEmail(
            data.email
         )
   

         if(!user){
            throw new NotFoundError("Invalid credentials")
         }

         const isPasswordValid = 
         await comparePassword(
            data.password,
            user.password
        )

        if(!isPasswordValid){
            throw new UnauthorizedError("Invalid credentials")
        }
       
        if(!user.isVerified){
            throw new ForbiddenError(
                "Please verify your email"
            )
        }

        const {
            password,
            ...safeUser
        } = user;
         
        return{

          safeUser,
        }
     }
}