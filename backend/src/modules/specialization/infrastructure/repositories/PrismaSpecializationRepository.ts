import prisma from '../../../../config/database';
import { Specialization } from '../../domain/entities/specialization';
import { ISpecializationRepository } from '../../domain/repositories/ISpecializationRepository';

export class PrismaSpecializationRespository implements ISpecializationRepository {
  async getAll() {
    return prisma.specialization.findMany({
      orderBy: {
        name: 'asc',
      },
    });
  }

  async findById(id: string): Promise<Specialization | null> {
    return prisma.specialization.findUnique({
      where: {
        id,
      },
    });
  }
}
