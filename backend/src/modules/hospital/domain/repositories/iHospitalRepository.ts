import { Hospital } from "../entities/Hospital";

import type { CreateHospitalDTO } from "../../dtos/create-hospital.dto";

export interface IHospitalRepository {
    create(data:CreateHospitalDTO,adminId:string):Promise<Hospital>;
 
    findByAdminId(adminId:string):Promise<Hospital | null>;
    // it checks if admin already owns hospital
    existsByAdminId(adminId:string):Promise<Boolean>
}