import { createAsyncThunk } from '@reduxjs/toolkit';

import { returnError } from '~helpers/returnError';
import { api } from '~api/index';
import type { ChatId } from '~types/api/google/firebase/commons/ChatId';
import type { ErrorString } from '~types/api/google/firebase/commons/ErrorString';

interface CreateGroup {
	chatName: string;
	photo: File;
	ownerId: string;
}

type CreateAsyncThunkReturned = ChatId | ErrorString;
type CreateAsyncThunkArguments = CreateGroup;
interface CreateAsyncThunkConfig { rejectValue: ErrorString }

export const createGroup = createAsyncThunk<
CreateAsyncThunkReturned, CreateAsyncThunkArguments, CreateAsyncThunkConfig
>(
	'chat/createGroup',
	async ({ chatName, photo, ownerId }: CreateGroup, thunkAPI) => {
		try {
			const response = await api.google.firebase.database.groups.addGroup();

			const responseURL = photo ? await api.google.firebase.storage.uploadFile({
				refName: `groupImage-${chatName}-${response.chatId}`,
				file: photo,
			}) : null;
			const downloadURL = (responseURL && 'downloadURL' in responseURL) ? responseURL.downloadURL || '' : '';

			await api.google.firebase.database.groups.updateGroupInfo({
				chatId: response.chatId,
				displayName: chatName,
				photoURL: downloadURL,
				lastText: '',
				color: '',
				ownerId,
				admins: [],
			});

			return {
				chatId: response.chatId,
			};
		} catch (error) {
			return thunkAPI.rejectWithValue(returnError(error));
		}
	},
);
