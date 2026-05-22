import { AuthResponse } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";


export class GetProfileUseCase {
    
    constructor(private userRepository:IUserRepository){}
     async execute(userId:string):Promise<AuthResponse>{
         const user = await this.userRepository.findById(userId);

         if(!user) throw new Error("User not found");

         const {password,...safeUser} = user;

         return {
            user:safeUser
        }
     }
}