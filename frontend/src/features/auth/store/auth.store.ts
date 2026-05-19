import {create} from "zustand";

import {
    loginUser,
    logoutUser,
    getProfile
} from "../services/auth.service"

import type { LoginDTO } from "../dtos/login.dto";
import type {User} from "../types/auth.types"


interface AuthStore {
    user:User | null;

    isAuthenticated:boolean;
    isLoading:boolean;

    login:(
        data:LoginDTO
    )=> Promise<void>

    logout:()=>Promise<void>;

    fetchProfile:()=>Promise<void>;
    
    verifyOtpAndLogin:()=>Promise<void>
}


export const useAthStore = create<AuthStore>((set)=>({
     user:null,
     isAuthenticated:false,
     isLoading:false,

     login: async(data)=>{
       try {
         set({
            isLoading:true,
         });
         await loginUser(data);

         const profile = await getProfile();

         set({
            user:profile.user,
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
                user:profile.user,
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
            })
        }

     },

     verifyOtpAndLogin:async()=>{
         try {
            set({
                isLoading:true,
            });
            const profile = await getProfile();
            set({
                user:profile.user,
                isAuthenticated:true,
            })
         } catch (error) {
            console.error(error);
         }finally{
            set({
                isLoading:false
            })
         }
     }
}))