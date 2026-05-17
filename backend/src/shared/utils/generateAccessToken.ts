import jwt from "jsonwebtoken";
import {env} from "../../config/env"


interface GenerateAccessTokenParams {
    userId:string;
    role:string;
}
export const generateAccessToken = (payload:GenerateAccessTokenParams):string=>{
   
    return jwt.sign(
        payload,
        env.JWT_SECRET,
        {
            expiresIn:"15m"
        }
    )

}