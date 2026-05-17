import { JwtPayload } from "jsonwebtoken";
import { generateAccessToken } from "../../../../shared/utils/generateAccessToken";
import { generateRefreshToken } from "../../../../shared/utils/generateRefreshToken";
import { verifyToken } from "../../../../shared/utils/verifyToken";
import {env} from "../../../../config/env";

export class RefreshTokenUseCase {
    async execute(
        refreshToken:string
    ){
        const decoded = verifyToken(
             refreshToken,
            env.JWT_REFRESH_SECRET!,
        ) as JwtPayload;

        const accessToken = 
        generateAccessToken({
            userId:decoded.userId as string,
            role:decoded.role as string,
        })

        return {
            accessToken,
        }
    }
}