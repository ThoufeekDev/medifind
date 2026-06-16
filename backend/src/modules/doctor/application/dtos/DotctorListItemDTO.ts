export interface DoctorListItemDTO {
    id:string;
    name:string;

    imageUrl:string | null;

    specialization:string;

    experience:number;

    consultationFee:number;

    reviewCount:number;

    averageRating:number;

    isActive:boolean;

    
}