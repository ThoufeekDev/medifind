import { z } from 'zod';

export const createDoctorSchema = z.object({
  name: z.string().min(2),

  email: z.email(),

  phone: z.string().min(10),

  qualification: z.string().min(2),

  experience: z.coerce.number().min(0),

  gender: z.enum(['MALE', 'FEMALE']),

  consultationFee: z.coerce.number().min(0),

  specializationId: z.uuid(),

  bio: z.string().optional(),
});
