import { PrismaDoctorRepository } from "../repositories/PrismaDoctorRepository";
import { CreateDoctorDTO } from "../../application/dtos/CreateDoctorDTO";
import { CreateDoctorUseCase } from "../../application/use-cases/CreateDoctorUseCase";
import { PrismaHospitalRepository } from "../../../hospital/infrastructure/repositories/PrismaHospitalRepository";
import { PrismaSpecializationRespository } from "../../../specialization/infrastructure/repositories/PrismaSpecializationRepository";

export const makeCreateDoctorUseCase = ()=>{
    
    return new CreateDoctorUseCase(
        new PrismaDoctorRepository(),
        new PrismaHospitalRepository(),
        new PrismaSpecializationRespository()
    )
}