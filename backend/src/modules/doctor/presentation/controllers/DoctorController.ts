import { Response, Request } from 'express';
import { AuthenticatedRequest } from '../../../../shared/types/AuthenticateRequest';
import { createDoctorSchema } from '../validators/createDoctor.schema';
import { makeCreateDoctorUseCase } from '../../infrastructure/factories/makeCreateDoctorUseCase';
import { makeGetDoctorUseCase } from '../../infrastructure/factories/makeGetDoctorUseCase';
import { successResponse } from '../../../../shared/utils/response';
import { CloudinaryService } from '../../../../shared/services/cloudinary.service';
export class doctorController {
  async create(req: AuthenticatedRequest, res: Response): Promise<Response> {
    console.log('create doctor func triggered');
    const adminId = req.userId!;
    console.log('request body', req.body);
    const validatedData = createDoctorSchema.parse(req.body);

    const image = req.file;

    const useCase = makeCreateDoctorUseCase();

    const doctor = await useCase.create(adminId, validatedData, image);

    console.log('doctor is ', doctor);

    return successResponse(res, 201, 'Doctor created successfully', doctor);
  }

  async getAll(req: AuthenticatedRequest, res: Response) {
    const filters = {
      specialization: req.query.specialization?.toString().split(','),
      onDuty: req.query.onDuty === undefined ? undefined : req.query.onDuty === 'true',
      sort: req.query.sort as string,
    };

    const getDoctorRespository = makeGetDoctorUseCase();

    const doctor = await getDoctorRespository.execute(req.userId!, filters);

    return successResponse(res, 200, 'Doctor fetched Successfully', doctor);
  }
}
