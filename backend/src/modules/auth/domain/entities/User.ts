

import { Role } from "../../../../shared/enums/Role"

// for login type


export class User {
    constructor(
        public readonly id: string,
        public name: string,
        public readonly email: string,
        public readonly password: string,
        public role: Role,
        public isVerified: boolean,
        public phone: string | null,
        public profileImage: string | null,
        public gender: string | null,
        public dateOfBirth: Date | null,
        public readonly createdAt: Date,
        public updatedAt: Date,
    ) {}
}

export interface CreateUserData {
    name: string;
    email: string;
    password: string;
    role: Role;
    isVerified: boolean;
}
