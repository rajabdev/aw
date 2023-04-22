import type { User } from 'firebase/auth';
import { updateProfile as updateUserProfile } from 'firebase/auth';

import { isObjectEmpty } from '~/ameliance-scripts';
import { returnError } from '~helpers/returnError';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';

import { returnSuccess } from '../helpers/returnSuccess';

export interface UpdateProfileProps {
	user: User;
	displayName?: string;
	photoURL?: string;
}

export type UpdateProfile = Omit<UpdateProfileProps, 'user'>;

export async function updateProfile({
	user, displayName, photoURL,
}: UpdateProfileProps): Promise<SuccessResponse> {
	const profileData: UpdateProfile = {};

	if (displayName) profileData.displayName = displayName;
	if (photoURL) profileData.photoURL = photoURL;

	if (isObjectEmpty(profileData)) throw new Error(returnError('Nothing to update'));

	try {
		await updateUserProfile(user, profileData);
		return returnSuccess();
	} catch (error) {
		throw new Error(returnError(error));
	}
}
