import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { RegisterUserDTO } from "../dtos/RegisterUserDTO";
import {Role} from "@prisma/client"
import {AuthResponse} from "../../domain/entities/User"

import { generateOtp } from "../../../../shared/utils/generateOtp";
import {redis} from "../../../../shared/config/redis";
import { otpQueue } from "../../../../shared/queues/otp.queue";
// utils 
import { hashPassword } from "../../../../shared/utils/hashPassword";

// user signup(register) useCase
export class RegisterUserUseCase{
    // dependancy injection
    constructor(private userRepository:IUserRepository){}

    async execute(data:RegisterUserDTO):Promise<AuthResponse>{
        const existingUser = await this.userRepository.findByEmail(
            data.email
        );
       
        console.log("data given by frontend",data)
        if(existingUser){
            throw new Error("User already exists");
        }

        const hashpassword = await hashPassword(data.password);

        const user = await this.userRepository.create({
            name:data.name,
            email:data.email,
            password:hashpassword,
            role:Role.USER,
            isVerified:false,
            
        })

        const otp = generateOtp();

        await redis.set(`otp:${user.email}`,otp,"EX",300);

        await otpQueue.add("send-otp-email",{
            email:user.email,
            otp,
        })

        const {password,...safeUser} = user
        return {
            user:safeUser,

        };
    }
}

