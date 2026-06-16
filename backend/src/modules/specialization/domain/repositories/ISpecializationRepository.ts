import { Specialization } from "../entities/specialization"

export interface ISpecializationRepository {
    getAll():Promise<{id:string;name:string;}[]>;

    findById(id:string):Promise<Specialization | null>
}