
import { RegisterUserUseCase } from '../../../modules/auth/application/use-cases/RegisterUserUseCase';
import { PrismaUserRepository } from '../../../modules/auth/infrastructure/repositories/PrismaUserRepository';


export function makeRegisterUserUseCase() {
    const userRepository = new PrismaUserRepository();

    return new RegisterUserUseCase(userRepository);
}