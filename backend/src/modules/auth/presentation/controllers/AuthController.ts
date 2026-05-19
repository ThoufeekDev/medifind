import { Request,Response } from "express";
import { PrismaUserRepository } from "../../infrastructure/repositories/PrismaUserRepository";
import { RegisterUserUseCase } from "../../application/use-cases/RegisterUserUseCase";
import { registerSchema } from "../validators/register.validator";
import { RefreshTokenUseCase } from "../../application/use-cases/RefreshTokenUseCase";
import { AthenticatedRequest } from "../../../../shared/types/AuthenticateRequest";

import { loginSchema } from "../validators/login.validator";
import { LoginUserUseCase } from "../../application/use-cases/LoginUserUseCase";

import { generateAccessToken } from "../../../../shared/utils/generateAccessToken";
import { generateRefreshToken } from "../../../../shared/utils/generateRefreshToken";


import { VerifyOtpUseCase } from "../../application/use-cases/VerifyOtpUseCase";
import { verifyUserOtpSchema } from "../validators/verifyOtp.validator";


export class AuthController {
    async register(req:Request,res:Response){
        const validatedData = registerSchema.parse(req.body);

        const userRepository = new PrismaUserRepository();
                                        // dependency injection 
        const registerUserUseCase = new RegisterUserUseCase(userRepository);

        const result = await registerUserUseCase.execute(validatedData)
        
        return res.status(201).json({
            success:true,
            message:"OTP send to email",
            // data:{
            //     user:result.user
            // }
        })
    }

    async verifyOtp(req:Request,res:Response){
        const validatedData = verifyUserOtpSchema.parse(req.body);

        const userRepository = new PrismaUserRepository();
        const verifyOtpUseCase = new VerifyOtpUseCase(userRepository);

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
                sameSite:"strict",
                maxAge:15 * 60 * 1000,
            }
         );

         res.cookie(
            "refreshToken",
             refreshToken,
            {
                httpOnly:true,
                secure:false,
                sameSite:"strict",
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
        const userRepository = new PrismaUserRepository();
                                     // dependancy injecttion
        const loginUserUseCase = new LoginUserUseCase(userRepository )

        const result = await loginUserUseCase.execute(validatedData)
         
         const accessToken = generateAccessToken({
            userId:result.user.id,role:result.user.role

        });
        const refreshToken = generateRefreshToken({
            userId:result.user.id,role:result.user.role
        });
 
        
         res.cookie(
            "accessToken",
             accessToken,
            {
                httpOnly:true,
                secure:false,
                sameSite:"strict",
                maxAge:15 * 60 * 1000,
            }
         );

         res.cookie(
            "refreshToken",
             refreshToken,
            {
                httpOnly:true,
                secure:false,
                sameSite:"strict",
                maxAge:7 * 24 * 60 * 60 * 1000,
            }
         )

         return res.status(200).json({
            success:true,
            data:{
                user: result.user
            }
         })
    }



     async refreshToken(req:Request,res:Response):Promise<void>{
        try {
            const refreshToken = 
            req.cookies.refreshToken;

            if(!refreshToken){
                res.status(401).json({
                    success:false,
                    message:"Refresh token missing"
                })

                return;
            }

            const refreshTokenUseCase = new RefreshTokenUseCase();

            const {accessToken} = await refreshTokenUseCase.execute(refreshToken)
            
            res.cookie(
                "accessToken",
                accessToken,
                {
                    httpOnly:true,
                    secure:false,
                    sameSite:"strict",
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

    async profile(req:AthenticatedRequest,res:Response):Promise<void>{
         res.status(200).json({
            success:true,
            data:{
                userId:req.userId,
                role:req.role
            }
         })
    }
}