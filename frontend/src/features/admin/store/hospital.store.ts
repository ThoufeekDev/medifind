import {create} from "zustand";

import {
    createHospital,
    getMyHospital
} from "../services/hospital.service";
import type { Hospital } from "../types/hospital.type";


interface HospitalStore {
    hospital:Hospital|null;
    loading:boolean;
    hasFetchedHospital:boolean;
    fetchHospital:()=>Promise<Hospital | null>;
    createHospitalAction:(data:FormData)=>Promise<void>;

    resetHospital:()=>void;
}

export const useHospitalStore = create<HospitalStore>((set,get)=>({
    hospital:null,
    loading:false,
    hasFetchedHospital:false,

    fetchHospital:async()=>{
        if(get().hasFetchedHospital){
            return get().hospital;
        }
        set({loading:true});
        
        try {

            
           
            const response = await getMyHospital();
           
            set({
                hospital:response.hospital,
                hasFetchedHospital:true,
            })
            return response.hospital;
        }catch(error){
            set({
                hospital:null,
                hasFetchedHospital:false,
            })
            return null;
        } finally {
            set({loading:false})
        }
    },

    createHospitalAction:async(data:FormData)=>{
        set({loading:true});

        try {
            const response = await createHospital(data);
            set({
                hospital: response,
                hasFetchedHospital:true,
            })
        } finally {
            set({loading:false})
        }
    },

    resetHospital:()=>
        set({
            hospital:null,
            hasFetchedHospital:false,
        })
}))