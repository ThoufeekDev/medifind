export interface Hospital {

  id:string;

  adminId:string;

  name:string;

  email?:string;

  phone?:string;

  description:string;

  hospitalImage?:string;

  licenseNumber?:string;

  address:string;

  city?:string;

  state?:string;

  country?:string;

  zipcode?:string;

  latitude:number;

  longitude:number;

  isVerified:boolean;

  createdAt:string;

  updatedAt:string;
}