import { ConflictError } from "../../../../shared/exceptions/ConflictError";
import { NotFoundError } from "../../../../shared/exceptions/NotFoundError";
import { IHospitalRepository } from "../../../hospital/domain/repositories/iHospitalRepository";
import { ISpecializationRepository } from "../../../specialization/domain/repositories/ISpecializationRepository";
import { IDoctorRepository } from "../../domain/repositories/IDoctorRepository";
import { CreateDoctorDTO } from "../dtos/CreateDoctorDTO";


export class CreateDoctorUseCase {
    constructor(
        private doctorRepository:IDoctorRepository,
        private hospitalRepository:IHospitalRepository,
        private specialization:ISpecializationRepository
    ){}

    async create(adminId:string,data:CreateDoctorDTO){
        const hospital = await this.hospitalRepository.findByAdminId(adminId);

        const existDoctor = await this.doctorRepository.existsByEmail(data.email);

        if(existDoctor){
            throw new ConflictError("Doctor already exists");
        }

        if(!hospital){
            throw new NotFoundError("Hospital not found");
        }

        const specialization = await this.specialization.findById(data.specializationId);

        if(!specialization){
            throw new NotFoundError(
                "Specialization not found please request for a new one"
            );
        }

        return this.doctorRepository.create({...data,hospitalId:hospital.id});
    }
}