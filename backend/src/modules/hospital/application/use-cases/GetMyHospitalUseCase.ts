import type { Hospital } from '../../domain/entities/Hospital';
import type { IHospitalRepository } from '../../domain/repositories/iHospitalRepository';

export class GetMyHospitalUseCase {
  constructor(private repository: IHospitalRepository) {}

  async execute(adminId: string): Promise<Hospital | null> {
    console.log('trgiiger');
    return this.repository.findByAdminId(adminId);
  }
}
