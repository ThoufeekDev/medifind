import prisma from "../../../../config/database";
import { CreateDoctorDTO } from "../../application/dtos/CreateDoctorDTO";
import { DoctorListItemDTO } from "../../application/dtos/DotctorListItemDTO";
import { GetDoctorsDTO } from "../../application/dtos/GetDoctorsDTO";
import {Doctor} from "../../domain/entities/Doctor";
import { IDoctorRepository } from "../../domain/repositories/IDoctorRepository";


export class PrismaDoctorRepository implements IDoctorRepository{
       
    async create(data: CreateDoctorDTO & { hospitalId: string; }): Promise<Doctor> {
         
         return prisma.doctor.create({
             data,
         })
    }

    async existsByEmail(email: string): Promise<boolean> {
         const doctor = await prisma.doctor.findUnique({
            where:{email},
            select:{id:true},
         })

         return !!doctor
    }

    async findByHospitalId(hospitalId: string,filters:GetDoctorsDTO): Promise<DoctorListItemDTO[]> {
         const doctor = await  prisma.doctor.findMany({
            where:{
                hospitalId,
                isActive:true,
                ...(filters.onDuty!==undefined && {
                    onDuty:filters.onDuty,
                }),
                ...(filters.specialization && {
                    specialization:{
                        name:filters.specialization,
                    }
                })
            },
            include:{
                specialization:true,
            },
            orderBy:
                filters.sort === "experience-desc"
                ? {experience:"desc"}
                :filters.sort==="experience-asc"
                ?{experience:"asc"}
                :{createdAt:"desc"},
    
         })

         return doctor.map((doctor)=>({
            id:doctor.id,
            name:doctor.name,
            imageUrl:doctor.imageUrl,
            specialization:doctor.specialization.name,
            experience:doctor.experience,
            consultationFee:doctor.consultationFee,
            reviewCount:0,
            averageRating:0,
            isActive:doctor.isActive,
            onDuty:doctor.onDuty,

         }))
    }
}