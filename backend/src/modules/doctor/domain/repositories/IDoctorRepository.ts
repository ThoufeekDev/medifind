import {Doctor} from "../entities/Doctor";
import {CreateDoctorDTO} from "../../application/dtos/CreateDoctorDTO";

export interface IDoctorRepository {
    create(data:CreateDoctorDTO &{
        hospitalId:string;
    }):Promise<Doctor>;
}