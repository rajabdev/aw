import { doc, setDoc } from 'firebase/firestore';

import { returnError } from '~helpers/returnError';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';

import { db } from '../../firebase';
import { returnSuccess } from '../../helpers/returnSuccess';

export interface AddUser {
	uid: string;
}

export async function addUser({ uid }: AddUser): Promise<SuccessResponse> {
	const usersRef = doc(db, 'users', uid);
	try {
		await setDoc(usersRef, { uid });
		return returnSuccess();
	} catch (error) {
		throw new Error(returnError(error));
	}
}
