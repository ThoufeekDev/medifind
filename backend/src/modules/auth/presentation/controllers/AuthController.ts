import { Request,Response } from "express";
import { PrismaUserRepository } from "../../infrastructure/repositories/PrismaUserRepository";
import { RegisterUserUseCase } from "../../application/use-cases/RegisterUserUseCase";
import { registerSchema } from "../validators/register.validator";
import { RefreshTokenUseCase } from "../../application/use-cases/RefreshTokenUseCase";
import { AthenticatedRequest } from "../../../../shared/types/AuthenticateRequest";
import { success } from "zod";
import { loginSchema } from "../validators/login.validator";
import { LoginUserUseCase } from "../../application/use-cases/LoginUserUseCase";


export class AuthController {
    async register(req:Request,res:Response){
        const validatedData = registerSchema.parse(req.body);

        const userRepository = new PrismaUserRepository();
                                        // dependency injection 
        const registerUserUseCase = new RegisterUserUseCase(userRepository);

        const user = await registerUserUseCase.execute(validatedData)

        return res.status(201).json({
            success:true,
            data:user
        })
    }

    async login(req:Request,res:Response){
        const validatedData = loginSchema.parse(req.body);
        const userRepository = new PrismaUserRepository();
                                     // dependancy injecttion
        const loginUserUseCase = new LoginUserUseCase(userRepository )

        const result = await loginUserUseCase.execute(validatedData)

 
        
         res.cookie(
            "accessToken",
             result.accessToken,
            {
                httpOnly:true,
                secure:false,
                sameSite:"strict",
                maxAge:15 * 60 * 1000,
            }
         );

         res.cookie(
            "refreshToken",
             result.refreshToken,
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
                user: result.safeUser
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