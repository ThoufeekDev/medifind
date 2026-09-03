import { z } from 'zod';

export const createDoctorSchema = z.object({
  name: z.string().min(3),
  email: z.email(),
  phone: z.string().min(10),

  gender: z.enum(['MALE', 'FEMALE']),

  qualification: z.string().min(2),

  experience: z.number().min(0),

  consultationFee: z.number().min(0),

  specializationId: z.string().min(1),

  bio: z.string().optional(),

  image: z.any().optional(),
});

export type CreateDoctorFormData = z.infer<typeof createDoctorSchema>;
