import type { User } from 'firebase/auth';

import { returnError } from '~helpers/returnError';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';

import { auth } from '../firebase';

interface GetCurrentAuthUserResponse extends SuccessResponse {
	user: User;
}

export function getCurrentAuthUser(): GetCurrentAuthUserResponse {
	const user = auth.currentUser;
	if (user !== null) return { user, status: 'success' };

	throw new Error(returnError('Can\'t find user auth!'));
}
