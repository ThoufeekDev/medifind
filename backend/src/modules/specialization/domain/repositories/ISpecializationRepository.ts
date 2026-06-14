export interface ISpecializationRepository {
    getAll():Promise<{
        id:string;
        name:string;
    }[]>;
}