import { Role } from "@prisma/client"


export class UserResponseDTO {
     constructor(
        public readonly id:string,
        public readonly name:string,
        public readonly email:string,
        public readonly role:Role,
        public readonly isVerified:boolean,
     ){}
}