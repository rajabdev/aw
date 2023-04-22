import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '~api/index';
import { returnError } from '~helpers/returnError';
import type { ErrorString } from '~types/api/google/firebase/commons/ErrorString';
import type { User } from '~types/api/google/firebase/commons/User';

type CreateAsyncThunkReturned = User;
type CreateAsyncThunkArguments = void;
interface CreateAsyncThunkConfig { rejectValue: ErrorString }

export const signInWithGoogle = createAsyncThunk<
CreateAsyncThunkReturned, CreateAsyncThunkArguments, CreateAsyncThunkConfig
>(
	'user/signInWithGoogle',
	async (_, thunkAPI) => {
		try {
			await api.google.firebase.auth.signInWithGoogle();

			// *----- get current logged user data -----
			const userAuthResponse = api.google.firebase.auth.getCurrentAuthUser();

			let userResponse = null;

			try {
				userResponse = await api.google.firebase.database.users
					.getUserById({ userId: userAuthResponse.user.uid });
			} catch (e) { /**/ }

			if (!userResponse) {
				// *----- add user to database -----
				const addUserResponse = await api.google.firebase.database.users
					.addUser({ uid: userAuthResponse.user.uid });

				// *----- update user info in database -----
				if (!('error' in addUserResponse)) {
					await api.google.firebase.database.users.updateUser({
						uid: userAuthResponse.user.uid,
						displayName: userAuthResponse.user.displayName || 'User',
						photoURL: userAuthResponse.user.photoURL || '',
						email: userAuthResponse.user.email || '',
						status: 'user',
						role: '',
						sex: '',
						lastActiveChatId: '0',
						visitsCount: 1,
					});
				}
				// *----- add chatList for user -----
				await api.google.firebase.database.userChats
					.addUserChatsForUser({ uid: userAuthResponse.user.uid });

				// *----- get current auth user data -----
				userResponse = await api.google.firebase.database.users
					.getUserById({ userId: userAuthResponse.user.uid });
			}

			// *----- get current auth user data -----
			const currentAuthUser = api.google.firebase.auth.getCurrentAuthUser();

			return {
				uid: currentAuthUser.user.uid,
				displayName: userResponse.user.displayName,
				photoURL: userResponse.user.photoURL,
				email: userResponse.user.email,
				status: userResponse.user.status,
				sex: userResponse.user.sex,
				role: userResponse.user.role,
				lastActiveChatId: userResponse.user.lastActiveChatId,
				lastVisitDate: userResponse.user.lastVisitDate,
				isOnline: userResponse.user.isOnline,
				visitsCount: userResponse.user.visitsCount,
			};
		} catch (error) {
			return thunkAPI.rejectWithValue(returnError(error));
		}
	},
);
