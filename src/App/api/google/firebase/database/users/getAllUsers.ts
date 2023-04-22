import asm from 'asm-ts-scripts';
import type { DocumentData } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';

import { returnError } from '~helpers/returnError';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';

import { db } from '../../firebase';

type Users = Record<string, DocumentData>;

export interface GetAllUsersResponse extends SuccessResponse {
	users: Users;
}

export async function getAllUsers(): Promise<GetAllUsersResponse> {
	const usersRef = collection(db, 'users');

	try {
		const docSnap = await getDocs(usersRef);
		const users: Users = {};
		docSnap.forEach((doc) => {
			users[doc.id] = doc.data();
		});
		if (!asm.isObjectEmpty(users)) return { users, status: 'success' };

		throw new Error(returnError('Can\'t find any chats!'));
	} catch (error) {
		throw new Error(returnError(error));
	}
}
