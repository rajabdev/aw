import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '~api/index';
import { returnError } from '~helpers/returnError';
import type { SignIn } from '~types/api/google/firebase/auth/signIn';
import type { ErrorString } from '~types/api/google/firebase/commons/ErrorString';
import type { User } from '~types/api/google/firebase/commons/User';

type CreateAsyncThunkReturned = User;
type CreateAsyncThunkArguments = SignIn;
interface CreateAsyncThunkConfig { rejectValue: ErrorString }

export const signIn = createAsyncThunk<
CreateAsyncThunkReturned, CreateAsyncThunkArguments, CreateAsyncThunkConfig
>(
	'user/signIn',
	async ({ email, password }, thunkAPI) => {
		try {
			const response = await api.google.firebase.auth.signInWithEmail({ email, password });

			const userResponse = await api.google.firebase.database.users
				.getUserById({ userId: response.user.uid });

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
