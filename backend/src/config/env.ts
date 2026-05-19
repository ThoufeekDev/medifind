import dotenv from "dotenv";
 dotenv.config();
export const env = {
    PORT:process.env.PORT!,
    JWT_SECRET:process.env.JWT_SECRET!,
    JWT_REFRESH_SECRET:process.env.JWT_REFRESH_SECRET,
    RESEND_API_KEY:process.env.RESEND_API_KEY,
    TURNSTILE_SITE_KEY:process.env.TURNSTILE_SITE_KEY,
    TURNSTILE_SECRET_KEY:process.env.TURNSTILE_SECRET_KEY,

}