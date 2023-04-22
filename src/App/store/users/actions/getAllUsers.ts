import { createAsyncThunk } from '@reduxjs/toolkit';

import { api } from '~api/index';
import { returnError } from '~helpers/returnError';
import type { ErrorString } from '~types/api/google/firebase/commons/ErrorString';
import type { UserResponse } from '~types/api/google/firebase/commons/UserResponse';

type CreateAsyncThunkReturned = UserResponse[];
type CreateAsyncThunkArguments = void;
interface CreateAsyncThunkConfig { rejectValue: ErrorString }

export const getAllUsers = createAsyncThunk<
CreateAsyncThunkReturned, CreateAsyncThunkArguments, CreateAsyncThunkConfig
>(
	'user/getAllUsers',
	async (_, thunkAPI) => {
		try {
			const response = await api.google.firebase.database.users.getAllUsers();
			const users = Object.values(response.users).map((user) => ({
				uid: user.uid,
				...user.user,
			}));
			return users;
		} catch (error) {
			return thunkAPI.rejectWithValue(returnError(error));
		}
	},
);
