import { doc, getDoc } from 'firebase/firestore';

import { returnError } from '~helpers/returnError';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';
import type { User } from '~types/api/google/firebase/commons/User';

import { db } from '../../firebase';

interface GetUserById {
	userId: string;
}

export interface GetUserByIdResponse extends SuccessResponse {
	user: User;
}

export async function getUserById(
	{ userId }: GetUserById,
): Promise<GetUserByIdResponse> {
	const userRef = doc(db, 'users', userId);

	try {
		const docSnap = await getDoc(userRef);

		if (docSnap.exists()) {
			const { user } = docSnap.data();
			return { user, status: 'success' };
		}

		throw new Error('Can\'t find user!');
	} catch (error) {
		throw new Error(returnError(error));
	}
}
