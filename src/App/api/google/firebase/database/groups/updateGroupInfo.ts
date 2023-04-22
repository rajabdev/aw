import { doc, updateDoc } from 'firebase/firestore';

import { getCurrentDateInMs } from '~/ameliance-scripts';
import { returnError } from '~helpers/returnError';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';
import type { GroupInfo } from '~types/api/google/firebase/database/groups/GroupInfo';

import { db } from '../../firebase';
import { returnSuccess } from '../../helpers/returnSuccess';

export interface UpdateGroupInfo extends Partial<Omit<GroupInfo, 'date'>> {
	chatId: string;
}

export async function updateGroupInfo({
	chatId, displayName, photoURL, lastText, color, ownerId, admins, type,
}: UpdateGroupInfo): Promise<SuccessResponse> {
	const groupRef = doc(db, 'groups', chatId);
	try {
		const info = {} as GroupInfo;
		if (chatId) info.chatId = chatId;
		if (displayName) info.displayName = displayName;
		if (photoURL) info.photoURL = photoURL;
		info.date = getCurrentDateInMs().toString();
		if (lastText) info.lastText = lastText;
		if (color) info.color = color;
		if (ownerId) info.ownerId = ownerId;
		if (admins && admins.length > 0) info.admins = admins;
		if (type) info.type = type;
		await updateDoc(groupRef, { info });
		return returnSuccess();
	} catch (error) {
		throw new Error(returnError(error));
	}
}
