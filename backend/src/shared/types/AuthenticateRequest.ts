import {Request} from "express";
import { Role } from "@prisma/client";
export interface AthenticatedRequest extends Request{
    userId?:string;
    role?:Role;
}