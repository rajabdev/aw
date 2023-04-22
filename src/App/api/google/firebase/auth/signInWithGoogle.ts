import type { User } from 'firebase/auth';
import { signInWithPopup } from 'firebase/auth';

import { returnError } from '~helpers/returnError';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';

import { auth, googleAuthProvider } from '../firebase';

interface SignInWithGoogle extends SuccessResponse {
	user: User;
}

export async function signInWithGoogle(): Promise<SignInWithGoogle> {
	try {
		const response = await signInWithPopup(auth, googleAuthProvider);
		return { user: response.user, status: 'success' };
	} catch (error) {
		throw new Error(returnError(error));
	}
}
