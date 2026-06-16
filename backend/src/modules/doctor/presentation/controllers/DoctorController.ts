import { Response,Request } from "express";
import { AuthenticatedRequest } from "../../../../shared/types/AuthenticateRequest";
import { createDoctorSchema } from "../validators/createDoctor.schema";
import { makeCreateDoctorUseCase } from "../../infrastructure/factories/makeCreateDoctorUseCase";
import { makeGetDoctorUseCase } from "../../infrastructure/factories/makeGetDoctorUseCase";
import { successResponse } from "../../../../shared/utils/response";
export class doctorController  {
   
  async create(req:AuthenticatedRequest,res:Response):Promise<Response>{
      const adminId = req.userId!;
      const validatedData = createDoctorSchema.parse(req.body);

      const useCase = makeCreateDoctorUseCase();

      const doctor = await useCase.create(adminId,validatedData);
  

       return successResponse(
        res,
        201,
        "Doctor created successfully",
        doctor
    )
      
  }

  async getAll(req:AuthenticatedRequest,res:Response){
    const getDoctorRespository = makeGetDoctorUseCase();

    const doctor = await getDoctorRespository.execute(req.userId!);

    return successResponse(
      res,
      200,
      "Doctor fetched Successfully",
      doctor,
    )
  }

}