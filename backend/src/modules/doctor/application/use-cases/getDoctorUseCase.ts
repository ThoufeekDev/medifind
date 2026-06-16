import { NotFoundError } from "../../../../shared/exceptions/NotFoundError";
import { IHospitalRepository } from "../../../hospital/domain/repositories/iHospitalRepository";
import { IDoctorRepository } from "../../domain/repositories/IDoctorRepository";
import { DoctorListItemDTO } from "../dtos/DotctorListItemDTO";
import { GetDoctorsDTO } from "../dtos/GetDoctorsDTO";




export class GetDoctorUseCase {

    constructor(
        private doctorRepository:IDoctorRepository,
        private hospitalRepository:IHospitalRepository
    ){}


    async execute(adminId:string,filters:GetDoctorsDTO):Promise<DoctorListItemDTO[]>{
        const hospital = await this.hospitalRepository.findByAdminId(adminId);
        if(!hospital){
            throw new NotFoundError("Hospital not found");
        }

        return this.doctorRepository.findByHospitalId(hospital.id,filters);
    }
}