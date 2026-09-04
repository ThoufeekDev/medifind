import { Doctor } from '../entities/Doctor';
import { CreateDoctorDTO } from '../../application/dtos/CreateDoctorDTO';
import { DoctorListItemDTO } from '../../application/dtos/DotctorListItemDTO';
import { GetDoctorsDTO } from '../../application/dtos/GetDoctorsDTO';
export interface IDoctorRepository {
  create(data: CreateDoctorDTO & { hospitalId: string }): Promise<Doctor>;

  existsByEmail(email: string): Promise<boolean>;

  findByHospitalId(hospitalId: string, filters: GetDoctorsDTO): Promise<DoctorListItemDTO[]>;
}
