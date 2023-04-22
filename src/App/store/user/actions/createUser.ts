import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '~api/index';
import { returnError } from '~helpers/returnError';
import type { CreateUser } from '~types/api/google/firebase/auth/createUser';
import type { ErrorString } from '~types/api/google/firebase/commons/ErrorString';
import type { User } from '~types/api/google/firebase/commons/User';

type CreateAsyncThunkReturned = User;
type CreateAsyncThunkArguments = CreateUser;
interface CreateAsyncThunkConfig { rejectValue: ErrorString }

export const createUser = createAsyncThunk<
CreateAsyncThunkReturned, CreateAsyncThunkArguments, CreateAsyncThunkConfig
>(
	'user/createUser',
	async ({
		displayName, email, password, photo,
	}, thunkAPI) => {
		try {
			//* ----- create user in auth -----
			const response = await api.google.firebase.auth.createUser({ email, password });
			if ('error' in response) throw new Error(response.error?.toString());

			// *----- upload user image -----
			const responseURL = photo ? await api.google.firebase.storage.uploadFile({
				refName: `users/${response.user.uid}/profile/profileImage-${response.user.uid}`,
				file: photo,
			}) : null;
			const downloadURL = (responseURL && 'downloadURL' in responseURL) ? responseURL.downloadURL || '' : '';

			// *----- add user to database -----
			const addUserResponse = await api.google.firebase.database.users
				.addUser({ uid: response.user.uid });

			// *----- update user info in database -----
			if (!('error' in addUserResponse)) {
				await api.google.firebase.database.users.updateUser({
					uid: response.user.uid,
					displayName: displayName || 'User',
					photoURL: downloadURL,
					email: email || '',
					status: 'user',
					role: '',
					sex: '',
					lastActiveChatId: '0',
					visitsCount: 1,
				});
			}

			// *----- update auth user data -----
			await api.google.firebase.auth.updateProfile({
				user: response.user,
				displayName,
				photoURL: downloadURL,
			});

			// *----- add chatList for user -----
			await api.google.firebase.database.userChats
				.addUserChatsForUser({ uid: response.user.uid });

			// *----- get current auth user data -----
			const currentAuthUser = api.google.firebase.auth.getCurrentAuthUser();

			return {
				uid: currentAuthUser.user.uid,
				displayName,
				photoURL: downloadURL,
				email,
				status: '',
				sex: '',
				role: '',
				lastActiveChatId: '',
				lastVisitDate: '',
				isOnline: false,
				visitsCount: 1,
			};
		} catch (error) {
			return thunkAPI.rejectWithValue(returnError(error));
		}
	},
);
