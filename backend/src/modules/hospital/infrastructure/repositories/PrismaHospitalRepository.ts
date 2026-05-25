import prisma from "../../../../config/database";

import type {
    IHospitalRepository
} from "../../domain/repositories/iHospitalRepository";

import type { Hospital } from "../../domain/entities/Hospital";

import type { CreateHospitalDTO } from "../../dtos/create-hospital.dto";


export class PrismaHospitalRepository implements IHospitalRepository {
     
    
     async create(data: CreateHospitalDTO,adminId:string): Promise<Hospital> {
          return prisma.hospital.create({
            data:{
                ...data,
                adminId,
            }
          })
     }

     async existsByAdminId(adminId: string): Promise<Boolean> {
          const hospital = await prisma.hospital.findUnique({
            where:{
                adminId
            },
            select:{
                id:true
            }
          })

          return !!hospital;
     }

     async findByAdminId(adminId:string):Promise<Hospital | null>{
         
            return prisma.hospital.findUnique({ 
                where:{
                    adminId
                }
            })
     }
     
}