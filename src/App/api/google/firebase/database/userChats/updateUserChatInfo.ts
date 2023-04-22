import { doc, updateDoc } from 'firebase/firestore';

import { getCurrentDateInMs } from '~/ameliance-scripts';

import { db } from '../../firebase';

interface UpdateUserChatInfo {
	chatId: string;
	uid: string;
	targetChatUserId: string;
	targetChatUserDisplayName: string;
	targetChatUserPhotoURL: string;

}

export function updateUserChatInfo({
	chatId, uid, targetChatUserId, targetChatUserDisplayName, targetChatUserPhotoURL,
}: UpdateUserChatInfo) {
	const chatRef = doc(db, 'userChats', uid);
	updateDoc(chatRef, {
		[`${chatId}.userInfo`]: {
			uid: targetChatUserId,
			displayName: targetChatUserDisplayName,
			photoURL: targetChatUserPhotoURL,
		},
		[`${chatId}.date`]: getCurrentDateInMs(),
	});
}
