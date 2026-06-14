import prisma from "../../../../config/database";
import { CreateDoctorDTO } from "../../application/dtos/CreateDoctorDTO";
import {Doctor} from "../../domain/entities/Doctor";
import { IDoctorRepository } from "../../domain/repositories/IDoctorRepository";


export class PrismaDoctorRepository implements IDoctorRepository{
       
    async create(data: CreateDoctorDTO & { hospitalId: string; }): Promise<Doctor> {
         
         return prisma.doctor.create({
             data,
         })
    }
}