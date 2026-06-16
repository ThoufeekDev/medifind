export interface CreateDoctorDTO{
    name:string;
    email:string;
    phone:string;
    qualification:string;
    experience:number;
    consultationFee:number;
    specializationId:string;
    bio?:string;
}