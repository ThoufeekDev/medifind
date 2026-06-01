
import { LoginUserUseCase } from "../../../modules/auth/application/use-cases/LoginUserUseCase";
import { PrismaUserRepository } from '../../../modules/auth/infrastructure/repositories/PrismaUserRepository';

export function makeLoginUserCase() {
      const userRepository = new PrismaUserRepository();

      return new LoginUserUseCase(userRepository);
}