import { User } from "../../domain/entities/User";
import { UserResponseDTO } from "../dtos/response/UserResponseDTO";


export class UserMapper {
    static toResponseDTO(user:User):UserResponseDTO {
        return new UserResponseDTO(
            user.id,
            user.name,
            user.email,
            user.role,
            user.isVerified,
        )
    }
}