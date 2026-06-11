import { NotFoundError } from "../../../../shared/exceptions/NotFoundError";
import { AuthResponse } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";



export class GetProfileUseCase {
    
    constructor(private userRepository:IUserRepository){}
     async execute(userId:string):Promise<AuthResponse>{
         const user = await this.userRepository.findById(userId);

         if(!user) throw new NotFoundError("Invalid credentials");

         const {password,...safeUser} = user;

         return {
            user:safeUser
        }
     }
}