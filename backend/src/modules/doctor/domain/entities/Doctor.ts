export interface Doctor {
  id: string;
  name: string;
  qualification: string;
  experience: number;
  consultationFee: number;
  hospitalId: string;
  specializationId: string;
  createdAt: Date;
  updatedAt: Date;
}