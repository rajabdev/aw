import { createAsyncThunk } from '@reduxjs/toolkit';

import type { UpdateProfileProps } from '~api/google/firebase/auth/updateProfile';
import { api } from '~api/index';
import { returnError } from '~helpers/returnError';
import type { ErrorString } from '~types/api/google/firebase/commons/ErrorString';
import type { User } from '~types/api/google/firebase/commons/User';

interface UpdateUser extends Partial<Omit<User, 'photoURL' | 'uid' | 'lastVisitDate'>> {
	uid: string;
	photo?: File;
}

type CreateAsyncThunkReturned = User;
type CreateAsyncThunkArguments = UpdateUser;
interface CreateAsyncThunkConfig { rejectValue: ErrorString }

export const updateUser = createAsyncThunk<
CreateAsyncThunkReturned, CreateAsyncThunkArguments, CreateAsyncThunkConfig
>(
	'user/updateUser',
	async ({
		uid,
		displayName,
		photo,
		email,
		status,
		sex,
		role,
		lastActiveChatId,
		visitsCount,
	}, thunkAPI) => {
		try {
			// *----- upload user image -----
			const responseURL = photo ? await api.google.firebase.storage.uploadFile({
				refName: `users/${uid}/profile/profileImage-${uid}`,
				file: photo,
			}) : null;
			const downloadURL = (responseURL && 'downloadURL' in responseURL) ? responseURL.downloadURL || '' : '';

			const userBeforeDatabase = await api.google.firebase.database.users
				.getUserById({ userId: uid });

			const dataToUserUpdate: Omit<User, 'lastVisitDate' | 'isOnline'> = {
				uid,
				displayName: displayName || userBeforeDatabase.user.displayName || '',
				photoURL: downloadURL || userBeforeDatabase.user.photoURL || '',
				email: email || userBeforeDatabase.user.email || '',
				status: status || userBeforeDatabase.user.status || '',
				sex: sex || userBeforeDatabase.user.sex || '',
				role: role || userBeforeDatabase.user.role || '',
				lastActiveChatId: lastActiveChatId || userBeforeDatabase.user.lastActiveChatId || '',
				visitsCount: visitsCount || userBeforeDatabase.user.visitsCount || 0,
			};

			// *----- update user info in database -----
			await api.google.firebase.database.users.updateUser(dataToUserUpdate);

			// *----- get current logged user data -----
			const userAuthResponse = api.google.firebase.auth.getCurrentAuthUser();

			const dataToProfileUpdate: UpdateProfileProps = {
				user: userAuthResponse.user,
				displayName: displayName || userAuthResponse.user.displayName || '',
				photoURL: downloadURL || userAuthResponse.user.photoURL || '',
			};

			// *----- update auth user data -----
			await api.google.firebase.auth.updateProfile(dataToProfileUpdate);

			// *----- get current auth user data -----
			const userFinalDatabase = await api.google.firebase.database.users
				.getUserById({ userId: uid });

			// *----- get current auth user data -----
			const currentAuthUser = api.google.firebase.auth.getCurrentAuthUser();

			return {
				uid: currentAuthUser.user.uid,
				displayName: userFinalDatabase.user.displayName,
				photoURL: userFinalDatabase.user.photoURL,
				email: userFinalDatabase.user.email,
				status: userFinalDatabase.user.status,
				sex: userFinalDatabase.user.sex,
				role: userFinalDatabase.user.role,
				lastActiveChatId: userFinalDatabase.user.lastActiveChatId,
				lastVisitDate: userFinalDatabase.user.lastVisitDate,
				isOnline: userFinalDatabase.user.isOnline,
				visitsCount: userFinalDatabase.user.visitsCount,
			};
		} catch (error) {
			return thunkAPI.rejectWithValue(returnError(error));
		}
	},
);
