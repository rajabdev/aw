import type { User } from './commonAuth';

export interface SignInWithGoogle {
	email: string;
	password: string;
}

export type SignInWithGoogleResponse = User;
