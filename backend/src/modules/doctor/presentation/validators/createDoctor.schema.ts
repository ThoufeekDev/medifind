import { z } from "zod";

export const createDoctorSchema = z.object({
  name: z.string().min(2),

  qualification: z.string().min(2),

  experience: z.number().min(0),

  consultationFee: z.number().min(0),

  specializationId: z.uuid(),

  bio: z.string().optional(),
});