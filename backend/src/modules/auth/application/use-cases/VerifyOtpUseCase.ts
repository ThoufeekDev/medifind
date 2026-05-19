import {redis} from "../../../../shared/config/redis";
import { IUserRepository } from "../../domain/repositories/IUserRepository";

import { verifyOtpDTO } from "../dtos/VerifyOtpDTO";



export class VerifyOtpUseCase {
    constructor (private userRepository:IUserRepository){};


    async execute(data:verifyOtpDTO){
        const storedOtp = await redis.get(`otp:${data.email}`);
        if(!storedOtp){
            throw new Error("OTP Expired");
        }

        if(storedOtp!==data.otp){
            throw new Error("Invalid OTP");
        }

        const user = await this.userRepository.findByEmail(data.email);

        if(!user){
            throw new Error(
                "User not found"
            );
        }


        await this.userRepository.verifyUser(user.id);

        const updatedUser = await this.userRepository.findByEmail(data.email);
        if(!updatedUser){
            throw new Error("User not found")
        }

        await redis.del(`otp:${data.email}`);

        const {password,...safeUser} = updatedUser

        return {
            user:safeUser,
        }
    }
}