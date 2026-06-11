import { GetProfileUseCase } from "../../../modules/auth/application/use-cases/GetProfileUseCase";
import { PrismaUserRepository } from '../../../modules/auth/infrastructure/repositories/PrismaUserRepository';


export function makeGetProfileUserUseCase() {
    const userRepository = new PrismaUserRepository();

    return new GetProfileUseCase(userRepository);
}