import { Request, Response } from 'express';
import { makeGetAllSpecializationUseCase } from '../../../hospital/infrastructure/factories/makeGetAllSpecializationsUseCase';
import  {successResponse}  from '../../../../shared/utils/response';

export class SpecializationController {
  async getAll(req: Request, res: Response) {
    const useCase = makeGetAllSpecializationUseCase();

    const specializations = await useCase.execute();

    return successResponse(res, 200, true,'Specializations fetched successfully', specializations);
  }
}
