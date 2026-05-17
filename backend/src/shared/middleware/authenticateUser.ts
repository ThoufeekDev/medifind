import { NextFunction,Response } from "express";
import {env} from "../../config/env"
import { verifyToken } from "../utils/verifyToken";
import { AthenticatedRequest } from "../types/AuthenticateRequest";



export const authenticateUser = (
    req:AthenticatedRequest,
    res:Response,
    next:NextFunction
):void=>{
    try {
        const token = req.cookies.accessToken;

        if(!token){
             res.status(401).json({
                success:false,
                message:"Unauthorized"
            })
            return
        }

      const decoded = verifyToken(
        token,
        env.JWT_SECRET!
      )

      req.userId = decoded.userId as string
        next()
    } catch (error) {
         res.status(401).json({
            success:false,
            message:"Invalid token",
        })
        return
    }

}