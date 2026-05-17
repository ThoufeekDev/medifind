import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { RegisterUserDTO } from "../dtos/RegisterUserDTO";
import {Role} from "@prisma/client"
import {AuthResponse, safeUser,User} from "../../domain/entities/User"

// utils 
import { hashPassword } from "../../../../shared/utils/hashPassword";
import { generateAccessToken } from "../../../../shared/utils/generateAccessToken";
import { generateTokens } from "../../../../shared/utils/generateToken";

// user signup(register) useCase
export class RegisterUserUseCase{
    // dependancy injection
    constructor(private userRepository:IUserRepository){}

    async execute(data:RegisterUserDTO):Promise<AuthResponse>{
        const existingUser = await this.userRepository.findByEmail(
            data.email
        );

        if(existingUser){
            throw new Error("User already exists");
        }

        const hashpassword = await hashPassword(data.password);

        const user = await this.userRepository.create({
            ...data,
            password:hashpassword,
            role:Role.USER,
        })

        const {accessToken,refreshToken} = generateTokens({
            userId:user.id,
            role:user.role,
        })

        const {password,...safeUser} = user
        return {
            user:safeUser,
            accessToken,
            refreshToken,
        };
    }
}