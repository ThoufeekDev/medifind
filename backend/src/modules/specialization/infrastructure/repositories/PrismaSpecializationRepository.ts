import prisma from "../../../../config/database";
import { ISpecializationRepository } from "../../domain/repositories/ISpecializationRepository";

export class PrismaSpecializationRespository implements ISpecializationRepository {
     async getAll(){
        return prisma.specialization.findMany({
            orderBy:{
                name:"asc"
            }
        })
     }
}