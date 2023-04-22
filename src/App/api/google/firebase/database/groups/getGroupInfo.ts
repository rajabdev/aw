import { doc, getDoc } from 'firebase/firestore';

import { returnError } from '~helpers/returnError';
import type { ChatId } from '~types/api/google/firebase/commons/ChatId';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';
import type { GroupInfo } from '~types/api/google/firebase/database/groups/GroupInfo';

import { db } from '../../firebase';

export type GetGroupInfo = ChatId;

export interface GetGroupInfoResponse extends SuccessResponse {
	info: GroupInfo;
}

export async function getGroupInfo(
	{ chatId }: GetGroupInfo,
): Promise<GetGroupInfoResponse> {
	const groupRef = doc(db, 'groups', chatId);
	try {
		const docSnap = await getDoc(groupRef);

		if (docSnap.exists()) {
			return { info: docSnap.data().info, status: 'success' };
		}

		throw new Error('Can\'t find group info!');
	} catch (error) {
		throw new Error(returnError(error));
	}
}
