import { ISpecializationRepository } from '../../../../../../../domain/repositories/ISpecializationRepository';

export class GetAllSpecialization {
  constructor(private specializationRepository: ISpecializationRepository) {}

  async execute() {
    return this.specializationRepository.getAll();
  }
}
