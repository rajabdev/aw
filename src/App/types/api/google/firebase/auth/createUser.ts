import type { User } from './commonAuth';

export interface CreateUserWithEmail {
	email: string;
	password: string;
}

export interface CreateUser extends CreateUserWithEmail {
	displayName: string;
	photo: File;
}

export type CreateUserResponse = User;
