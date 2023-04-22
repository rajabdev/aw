import type { User } from 'firebase/auth';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { returnError } from '~helpers/returnError';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';

import { auth } from '../firebase';

export interface CreateUser {
	email: string;
	password: string;
}

export interface CreateUserResponse extends SuccessResponse {
	user: User;
}

export async function createUser({
	email, password,
}: CreateUser): Promise<CreateUserResponse> {
	try {
		const userCredential = await createUserWithEmailAndPassword(auth, email, password);
		return { user: userCredential.user, status: 'success' };
	} catch (error) {
		throw new Error(returnError(error));
	}
}
