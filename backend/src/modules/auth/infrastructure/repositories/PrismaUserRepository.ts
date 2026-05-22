import prisma from "../../../../config/database";

import { User } from "../../domain/entities/User";
import { IUserRepository } from "../../domain/repositories/IUserRepository";
import { CreateUserData } from "../../domain/entities/User";
// Thsi is called Liskov Substitution Principle
export class PrismaUserRepository implements IUserRepository{
    async create(userData:CreateUserData): Promise<User> {
        
        const user = await prisma.user.create({
            data:userData
        })
        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = prisma.user.findUnique({
            where:{
                email,
            }
        })
        return user;
    }

    async verifyUser(userId: string):Promise<void> {
        await prisma.user.update({
            where:{
                id:userId
            },
            data:{
                isVerified:true
            }
        })
    }

    async findById(id: string): Promise<User | null> {
    return await prisma.user.findUnique({
            where:{id},
        })
    }
}