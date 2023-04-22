import { addDoc, collection } from 'firebase/firestore';

import { returnError } from '~helpers/returnError';
import type { ChatId } from '~types/api/google/firebase/commons/ChatId';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';

import { db } from '../../firebase';

export type AddGroupResponse = ChatId & SuccessResponse;

export async function addGroup(): Promise<AddGroupResponse> {
	const groupsRef = collection(db, 'groups');

	try {
		const docRef = await addDoc(groupsRef, {});
		return { chatId: docRef.id, status: 'success' };
	} catch (error) {
		throw new Error(returnError(error));
	}
}
