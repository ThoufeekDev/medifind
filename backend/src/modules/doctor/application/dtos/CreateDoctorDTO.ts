export interface CreateDoctorDTO {
  name: string;
  email: string;
  phone: string;
  qualification: string;
  gender: 'MALE' | 'FEMALE';
  experience: number;
  consultationFee: number;
  specializationId: string;
  bio?: string;
  imageUrl?: string;
}
