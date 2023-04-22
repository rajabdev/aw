import { signOut as signOutUser } from 'firebase/auth';

import { returnError } from '~helpers/returnError';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';

import { auth } from '../firebase';
import { returnSuccess } from '../helpers/returnSuccess';

export function signOut(): SuccessResponse {
	try {
		signOutUser(auth);
		return returnSuccess();
	} catch (error) {
		throw new Error(returnError(error));
	}
}
