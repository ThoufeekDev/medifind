import { GetAllSpecialization } from '../../../specialization/application/use-cases/src/modules/specialization/application/use-cases/GetAllSpecializationsUseCase';
import { PrismaSpecializationRespository } from '../../../specialization/infrastructure/repositories/PrismaSpecializationRepository';

export const makeGetAllSpecializationUseCase = () => {
  const repository = new PrismaSpecializationRespository();

  return new GetAllSpecialization(repository);
};
