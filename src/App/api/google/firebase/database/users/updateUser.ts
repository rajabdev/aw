import { doc, updateDoc } from 'firebase/firestore';

import { getCurrentDateInMs } from '~/ameliance-scripts';
import { returnError } from '~helpers/returnError';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';
import type { User } from '~types/api/google/firebase/commons/User';

import { db } from '../../firebase';
import { returnSuccess } from '../../helpers/returnSuccess';

export interface UpdateUserProp extends Partial<Omit<User, 'lastVisitDate' | 'isOnline'>> {
	uid: string;
	isOnline?: boolean;
}

export type UpdateUser = Partial<Omit<User, 'uid'>>;

export async function updateUser({
	uid, displayName, photoURL, email, status, role, sex, lastActiveChatId, isOnline, visitsCount,
}: UpdateUserProp): Promise<SuccessResponse> {
	const usersRef = doc(db, 'users', uid);
	try {
		const user: UpdateUser = {};
		if (displayName) user.displayName = displayName.trim();
		if (photoURL) user.photoURL = photoURL;
		if (email) user.email = email;
		if (status) user.status = status;
		if (role) user.role = role.trim();
		if (sex) user.sex = sex;
		if (lastActiveChatId) user.lastActiveChatId = lastActiveChatId;
		user.lastVisitDate = getCurrentDateInMs().toString();
		if (isOnline) user.isOnline = isOnline;
		if (visitsCount) user.visitsCount = visitsCount;
		await updateDoc(usersRef, { user });
		return returnSuccess();
	} catch (error) {
		throw new Error(returnError(error));
	}
}
