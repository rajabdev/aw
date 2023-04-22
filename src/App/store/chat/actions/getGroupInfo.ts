import { createAsyncThunk } from '@reduxjs/toolkit';

import { returnError } from '~helpers/returnError';
import { api } from '~api/index';
import type { ChatId } from '~types/api/google/firebase/commons/ChatId';
import type { ErrorString } from '~types/api/google/firebase/commons/ErrorString';
import type { GroupInfo } from '~types/api/google/firebase/database/groups/GroupInfo';

type CreateAsyncThunkReturned = GroupInfo | ErrorString;
type CreateAsyncThunkArguments = ChatId;
interface CreateAsyncThunkConfig { rejectValue: ErrorString }

export const getGroupInfo = createAsyncThunk<
CreateAsyncThunkReturned, CreateAsyncThunkArguments, CreateAsyncThunkConfig
>(
	'chat/getGroupInfo',
	async ({ chatId }: ChatId, thunkAPI) => {
		try {
			const response = await api.google.firebase.database.groups.getGroupInfo({ chatId });

			return { ...response.info };
		} catch (error) {
			return thunkAPI.rejectWithValue(returnError(error));
		}
	},
);
