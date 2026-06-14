export interface CreateDoctorDTO{
    name:string;
    qualification:string;
    experience:number;
    consultationFee:number;
    specializationId:string;
    bio?:string;
}