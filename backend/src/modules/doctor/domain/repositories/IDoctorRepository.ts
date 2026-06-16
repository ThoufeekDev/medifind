import {Doctor} from "../entities/Doctor";
import {CreateDoctorDTO} from "../../application/dtos/CreateDoctorDTO";
import { DoctorListItemDTO } from "../../application/dtos/DotctorListItemDTO";
export interface IDoctorRepository {
    create(data:CreateDoctorDTO &{hospitalId:string;}):Promise<Doctor>;

    existsByEmail(email:string):Promise<boolean>;

    findByHospitalId(hospitalId:string):Promise<DoctorListItemDTO[]>;


}