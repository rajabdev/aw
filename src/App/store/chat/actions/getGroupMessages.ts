import { createAsyncThunk } from '@reduxjs/toolkit';

import { returnError } from '~helpers/returnError';
import { api } from '~api/index';
import type { ChatId } from '~types/api/google/firebase/commons/ChatId';
import type { ErrorString } from '~types/api/google/firebase/commons/ErrorString';
import type { Messages } from '~types/api/google/firebase/commons/Messages';

type CreateAsyncThunkReturned = Messages | ErrorString;
type CreateAsyncThunkArguments = ChatId;
interface CreateAsyncThunkConfig { rejectValue: ErrorString }

export const getGroupMessages = createAsyncThunk<
CreateAsyncThunkReturned, CreateAsyncThunkArguments, CreateAsyncThunkConfig
>(
	'chat/getGroupMessages',
	async ({ chatId }: ChatId, thunkAPI) => {
		try {
			const response = await api.google.firebase.database.groups
				.getGroupMessages({ chatId });

			return { messages: response.messages };
		} catch (error) {
			return thunkAPI.rejectWithValue(returnError(error));
		}
	},
);
