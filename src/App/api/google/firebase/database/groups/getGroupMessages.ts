import {	doc, getDoc } from 'firebase/firestore';

import { returnError } from '~helpers/returnError';
import type { ChatId } from '~types/api/google/firebase/commons/ChatId';
import type { Messages } from '~types/api/google/firebase/commons/Messages';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';

import { db } from '../../firebase';

export type GetGroupMessages = ChatId;

export type GetGroupMessagesResponse = Messages & SuccessResponse;

export async function getGroupMessages(
	{ chatId }: GetGroupMessages,
): Promise<GetGroupMessagesResponse> {
	const chatRef = doc(db, 'groups', chatId);
	try {
		const docSnap = await getDoc(chatRef);
		if (docSnap.exists()) return { messages: docSnap.data().messages, status: 'success' };

		throw new Error('Can\'t find group messages!');
	} catch (error) {
		throw new Error(returnError(error));
	}
}
