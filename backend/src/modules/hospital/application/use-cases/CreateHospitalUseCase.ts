import type {Hospital} from "../../domain/entities/Hospital";

import { IHospitalRepository } from "../../domain/repositories/iHospitalRepository";


import { CreateHospitalDTO } from "../../dtos/create-hospital.dto";

export class CreateHospitalUseCase {

    constructor(private hospitalRepository:IHospitalRepository){};

    async execute(data:CreateHospitalDTO,adminId:string):Promise<Hospital> {
            
        // Check Hospital Exists

        const exist = await this.hospitalRepository.existsByAdminId(adminId);


        if(exist){
            throw new Error("Hospital already Exists")
        }

        // create Hospital

        return this.hospitalRepository.create(data,adminId);
    }
}