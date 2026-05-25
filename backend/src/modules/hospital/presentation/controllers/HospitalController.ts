import { Request, Response } from "express";

import { PrismaHospitalRepository } from "../../infrastructure/repositories/PrismaHospitalRepository";

import { AuthenticatedRequest } from "../../../../shared/types/AuthenticateRequest";

import { CreateHospitalUseCase } from "../../application/use-cases/CreateHospitalUseCase";
import { GetMyHospitalUseCase } from "../../application/use-cases/GetMyHospitalUseCase";
import { success } from "zod";


export class HospitalController {
    async create(req: Request, res: Response): Promise<Response> {
        try {

            const authReq = req as AuthenticatedRequest;
            const adminId = authReq.userId;

            if (!adminId) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized",
                })
            }

            const hospitalData = req.body;

            const repository = new PrismaHospitalRepository();
            const useCase = new CreateHospitalUseCase(repository);

            const hospital = await useCase.execute(hospitalData, adminId);

            return res.status(201).json({
                success: true,
                hospital,
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: error instanceof Error ? error.message : "Something went wrong"
            })
        }
    }

    async getMyHospital(req: Request, res: Response) {
        try {
            console.log("tigger")
            const authReq = req as AuthenticatedRequest;
            const adminId = authReq.userId;
            if (!adminId) {
                return res.status(401).json({
                    success: false,
                    message: "Unauthorized"
                })
            }
            const repository = new PrismaHospitalRepository();
            const useCase = new GetMyHospitalUseCase(repository);
            const hospital = await useCase.execute(adminId);

            return res.status(200).json({
                success: true,
                hospital
            })
        } catch (error) {
            return res.status(500).json({
                success: false,
                message:
                    error instanceof Error
                        ? error.message
                        : "Something went wrong"

            })
        }
    }
}