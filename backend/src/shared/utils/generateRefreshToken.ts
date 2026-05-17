import jwt from "jsonwebtoken";
import {env} from "../../config/env"
interface GenerateRefreshTokenParams {
    userId:string;
    role:string;
}

export const generateRefreshToken =(
    payload:GenerateRefreshTokenParams
):string=>{
    return jwt.sign(
        payload,
        env.JWT_REFRESH_SECRET!,
        {
            expiresIn:"7d"
        }
    )
}