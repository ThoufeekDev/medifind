import {create} from "zustand";

import {
    loginUser,
    logoutUser,
    getProfile,
    registerUser,
    verifyOtpPaylod
} from "../services/auth.service"

import type { LoginDTO } from "../dtos/login.dto";
import type {User} from "../types/auth.types"
import type { RegisterDTO } from "../dtos/register.dto";
import type { VerifyOtpDTO } from "../dtos/verify-otp.dto";



interface AuthStore {
    user:User | null;

    isAuthenticated:boolean;
    isCheckingAuth:boolean
    isLoading:boolean;

    register:(data:RegisterDTO)=>Promise<void>;

    login:(
        data:LoginDTO
    )=> Promise<void>

    logout:()=>Promise<void>;

    fetchProfile:()=>Promise<void>;
    
    verifyOtpAndLogin:(data:VerifyOtpDTO)=>Promise<void>
}


export const useAuthStore = create<AuthStore>((set,get)=>({
     user:null,
     isAuthenticated:false,
     isLoading:false,
     isCheckingAuth:true,


     register: async(data)=>{
        try {
            set({
                isLoading:true,
            });

            await registerUser(data)
        } catch (error) {
            console.error(error)
        } finally {
            set({
                isLoading:false
            })
        }
     },

     login: async(data)=>{
       try {
         set({
            isLoading:true,
         });
         await loginUser(data);

         const profile = await getProfile();

         set({
            user:profile.data.user,
            isAuthenticated:true,
         })
       } finally {
         set({
            isLoading:false,
         })
       }
     },

     logout:async()=>{

        try {
            await logoutUser();
            set({
                user:null,
                isAuthenticated:false,
            })
        } catch (error) {
            console.error(error)
        }

     },

     fetchProfile:async()=>{
        try {
            set({
                isLoading:true,
            })

            const profile = await getProfile();
            set({
                user:profile.data,
                isAuthenticated:true,
            })
        } catch (error) {
          set({
            user:null,
            isAuthenticated:false,
          })   
        }finally{
            set({
                isLoading:false,
                isCheckingAuth:false,
            })
        }

     },

     verifyOtpAndLogin:async(data)=>{
         try {
            set({
                isLoading:true,
            });
            await verifyOtpPaylod(data);
            await get().fetchProfile();
            
         } catch (error) {
            console.error(error);
         }finally{
            set({
                isLoading:false
            })
         }
     }
}))