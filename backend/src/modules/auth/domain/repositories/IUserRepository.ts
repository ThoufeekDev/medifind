import {User} from "../entities/User";
import { CreateUserData } from "../entities/User";
import { Role } from "@prisma/client";
export interface IUserRepository{
    create(user:CreateUserData):Promise<User>;

    findByEmail(email:string):Promise<User | null>
}

// export interface CreateUserData {
//     name:string;
//     email:string;
//     password:string;
//     role?:Role,
// }