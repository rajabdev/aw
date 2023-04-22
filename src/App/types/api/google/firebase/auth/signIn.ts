import type { User } from './commonAuth';

export interface SignIn {
	email: string;
	password: string;
}

export type SignInResponse = User;
