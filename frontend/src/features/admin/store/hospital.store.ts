import {create} from "zustand";
import type {CreateHospitalDTO} from "../dtos/createHospital.dto"
import {
    createHospital,
    getMyHospital
} from "../services/hospital.service";
import type { Hospital } from "../types/hospital.type";


interface HospitalStore {
    hospital:Hospital|null;
    loading:boolean;
    fetchHospital:()=>Promise<void>;
    createHospitalAction:(data:CreateHospitalDTO)=>Promise<void>;
}

export const useHospitalStore = create<HospitalStore>((set)=>({
    hospital:null,
    loading:false,

    fetchHospital:async()=>{
        set({loading:true});

        try {
            const response = await getMyHospital();
            set({hospital:response.hospital})
        } finally {
            set({loading:false})
        }
    },

    createHospitalAction:async(data)=>{
        set({loading:true});

        try {
            const response = await createHospital(data);
            set({
                hospital: response
            })
        } finally {
            set({loading:false})
        }
    }
}))