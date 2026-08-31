import { Request,Response } from "express";
import { PrismaUserRepository } from "../../infrastructure/repositories/PrismaUserRepository";

import { registerSchema } from "../validators/register.validator";
import { RefreshTokenUseCase } from "../../application/use-cases/RefreshTokenUseCase";
import { AuthenticatedRequest } from "../../../../shared/types/AuthenticateRequest";

import { loginSchema } from "../validators/login.validator";

import { generateAccessToken } from "../../../../shared/utils/generateAccessToken";
import { generateRefreshToken } from "../../../../shared/utils/generateRefreshToken";


import { VerifyOtpUseCase } from "../../application/use-cases/VerifyOtpUseCase";
import { verifyUserOtpSchema } from "../validators/verifyOtp.validator";


// factories

import {makeRegisterUserUseCase} from "../../infrastructure/factories/makeRegisterUserUseCase"
import { makeLoginUserCase } from "../../infrastructure/factories/makeLoginUserCase";
import { makeGetProfileUserUseCase } from "../../infrastructure/factories/makeGetProfileUserUseCase";
import {makeVerifyOTPUseCase} from "../../infrastructure/factories/makeVerifyOtpUseCase"

// Error Handling
import { UnauthorizedError } from "../../../../shared/exceptions/UnauthorizedError";


export class AuthController {
    async register(req:Request,res:Response){

        const validatedData = registerSchema.parse(req.body);

    const useCase = makeRegisterUserUseCase();

     await useCase.execute(validatedData);

        
        return res.status(201).json({
            success:true,
            message:"OTP send to email",
        })
    }

    async verifyOtp(req:Request,res:Response){
        const validatedData = verifyUserOtpSchema.parse(req.body);

        // const userRepository = new PrismaUserRepository();
        // const verifyOtpUseCase = new VerifyOtpUseCase(userRepository);
        const verifyOtpUseCase = makeVerifyOTPUseCase();

        const result = await verifyOtpUseCase.execute(validatedData);

        const accessToken = generateAccessToken({
            userId:result.user.id,
            role:result.user.role,
        })

       const refreshToken = generateRefreshToken({
            userId:result.user.id,role:result.user.role
        });


          res.cookie(
            "accessToken",
             accessToken,
            {
                httpOnly:true,
                secure:false,
                sameSite:"lax",
                maxAge:15 * 60 * 1000,
              
            }
         );

         res.cookie(
            "refreshToken",
             refreshToken,
            {
                httpOnly:true,
                secure:false,
                sameSite:"lax",
                maxAge:7 * 24 * 60 * 60 * 1000,
              
            }
         )

         
        return res.status(201).json({
            success:true,
            data:result
        })
    }

    async login(req:Request,res:Response){
        const validatedData = loginSchema.parse(req.body);
      
        const loginUserUseCase = makeLoginUserCase();
      
        const result = await loginUserUseCase.execute(validatedData)
         

         
         const accessToken = generateAccessToken({
            userId:result.user.id,
            role:result.user.role

        });
        const refreshToken = generateRefreshToken({
            userId:result.user.id,
            role:result.user.role
        });
 
        
         res.cookie(
            "accessToken",
             accessToken,
            {
                httpOnly:true,
                secure:false,
                sameSite:"lax",
                maxAge:15 * 60 * 1000,
                 
            }
         );

         res.cookie(
            "refreshToken",
             refreshToken,
            {
                httpOnly:true,
                secure:false,
                sameSite:"lax",
                maxAge:7 * 24 * 60 * 60 * 1000,
                
            }
         )


         return res.status(200).json({
            success:true,
             user:result.user
            
         })
    }



     async refreshToken(req:Request,res:Response):Promise<void>{
        try {
            const refreshToken = 
            req.cookies.refreshToken;

            if(!refreshToken){

                throw new UnauthorizedError("Refresh token missing");
            }

            const refreshTokenUseCase = new RefreshTokenUseCase();

            const {accessToken} = await refreshTokenUseCase.execute(refreshToken)
            
            res.cookie(
                "accessToken",
                accessToken,
                {
                    httpOnly:true,
                    secure:false,
                    sameSite:"lax",
                    maxAge:15 * 60 * 1000,

                }
            )

            res.status(200).json({
                success:true,
                message:"Access token refreshed"
            })
        } catch (error) {
            res.status(401).json({
                success:false,
                message:"Invalid refresh token"
            })

            return
        }
    }

    // logout method

    async logout(req:Request,res:Response):Promise<void>{
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");

        res.status(200).json({
            success:true,
            message:"Logged out successfully"
        })
    }

    // profile

    async profile(req:AuthenticatedRequest,res:Response):Promise<void>{
  
        const userId = req.userId;
    
            const getProfileUserUseCase = makeGetProfileUserUseCase();
            
            const result = await getProfileUserUseCase.execute(userId!)
        
      
         res.status(200).json({
            success:true,
            user:result.user
         })
    }
}