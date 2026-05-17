import prisma from "../../../../config/database";

import { User } from "../../domain/entities/User";
import { CreateUserData, IUserRepository } from "../../domain/repositories/IUserRepository";

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
}