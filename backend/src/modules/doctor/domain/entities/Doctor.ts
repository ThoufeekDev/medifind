export interface Doctor {
  id: string;
  name: string;
  email:string;
  phone:string;
  qualification: string;
  experience: number;
  imageUrl: string | null;
  consultationFee: number;
  hospitalId: string;
  specializationId: string;
  createdAt: Date;
  updatedAt: Date;
}