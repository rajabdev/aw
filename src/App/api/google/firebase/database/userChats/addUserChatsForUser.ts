import { doc, setDoc } from 'firebase/firestore';

import { returnError } from '~helpers/returnError';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';

import { db } from '../../firebase';
import { returnSuccess } from '../../helpers/returnSuccess';

interface AddUserChatsForUser {
	uid: string;
}

export async function addUserChatsForUser({
	uid,
}: AddUserChatsForUser): Promise<SuccessResponse> {
	const userChatsRef = doc(db, 'userChats', uid);

	try {
		await setDoc(userChatsRef, {});
		return returnSuccess();
	} catch (error) {
		throw new Error(returnError(error));
	}
}
