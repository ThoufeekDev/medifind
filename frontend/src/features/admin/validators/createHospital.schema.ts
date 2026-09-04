import { z } from 'zod';

export const createHospitalSchema = z.object({
  name: z.string().min(3),

  email: z.string().email(),

  phone: z.string().min(10),

  address: z.string().min(5),

  city: z.string(),

  state: z.string(),

  country: z.string(),

  zipcode: z.string(),

  latitude: z.number(),

  longitude: z.number(),

  licenseNumber: z.string(),

  description: z.string().min(10),
});

export type CreateHospitalFormData = z.infer<typeof createHospitalSchema>;
