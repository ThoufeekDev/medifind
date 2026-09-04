import { PrismaHospitalRepository } from '../../../hospital/infrastructure/repositories/PrismaHospitalRepository';
import { GetDoctorUseCase } from '../../application/use-cases/getDoctorUseCase';
import { PrismaDoctorRepository } from '../repositories/PrismaDoctorRepository';

export const makeGetDoctorUseCase = () => {
  const doctorRepository = new PrismaDoctorRepository();
  const hospitalRepository = new PrismaHospitalRepository();

  return new GetDoctorUseCase(doctorRepository, hospitalRepository);
};
