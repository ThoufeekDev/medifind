export interface CreateDoctorDTO {
  name: string;
  email: string;
  phone: string;
  qualification: string;
  experience: number;
  gender: 'MALE' | 'FEMALE';
  consultationFee: number;
  image?: File;
  specializationId: string;
  bio?: string;
}
