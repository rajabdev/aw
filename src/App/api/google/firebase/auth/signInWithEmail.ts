import type { User } from 'firebase/auth';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { returnError } from '~helpers/returnError';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';

import { auth } from '../firebase';

interface SignInWithEmail {
	email: string;
	password: string;
}

interface SignInWithEmailResponse extends SuccessResponse {
	user: User;
}

export async function signInWithEmail({
	email, password,
}: SignInWithEmail): Promise<SignInWithEmailResponse> {
	try {
		const userCredential = await signInWithEmailAndPassword(auth, email, password);
		return { user: userCredential.user, status: 'success' };
	} catch (error) {
		throw new Error(returnError(error));
	}
}
