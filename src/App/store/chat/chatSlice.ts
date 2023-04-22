import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { ChatId } from '~types/api/google/firebase/commons/ChatId';
import type { ChatInfo } from '~types/api/google/firebase/commons/ChatInfo';
import type { ErrorString } from '~types/api/google/firebase/commons/ErrorString';
import type { Message } from '~types/api/google/firebase/commons/Message';
import type { Messages } from '~types/api/google/firebase/commons/Messages';

import { createGroup } from './actions/createGroup';
import { getGroupInfo } from './actions/getGroupInfo';
import { getGroupMessages } from './actions/getGroupMessages';

interface ChatState {
	isLoading: boolean;
	error: string;
	activeChatId: string;
	messages: Message[];
	chatInfo: ChatInfo;
	searchField: string;
	messageField: string;
}

const initialState: ChatState = {
	isLoading: false,
	error: '',
	activeChatId: '',
	messages: [],
	chatInfo: {} as ChatInfo,
	searchField: '',
	messageField: '',
};

export const chatSlice = createSlice({
	name: 'chat',
	initialState,
	reducers: {
		setSearchField(state, action) {
			state.searchField = action.payload;
		},
		setMessageField(state, action) {
			state.messageField = action.payload;
		},
		setActiveChatMessages(state, action) {
			state.messages = action.payload;
		},
		resetError(state) {
			state.error = '';
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createGroup.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(
				createGroup.fulfilled,
				(state, action: PayloadAction<ChatId | ErrorString>) => {
					if ('error' in action.payload) {
						state.error = action.payload.error;
					} else {
						state.activeChatId = action.payload.chatId;
					}
					state.isLoading = false;
				},
			)
			.addCase(createGroup.rejected, (state, action: PayloadAction<unknown>) => {
				state.error = (action.payload as ErrorString).error;
				state.isLoading = false;
			});

		builder
			.addCase(getGroupInfo.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(
				getGroupInfo.fulfilled,
				(state, action: PayloadAction<ChatInfo | ErrorString>) => {
					if ('error' in action.payload) {
						state.error = action.payload.error;
					} else {
						state.chatInfo = action.payload;
					}
					state.isLoading = false;
				},
			)
			.addCase(getGroupInfo.rejected, (state, action: PayloadAction<unknown>) => {
				state.error = (action.payload as ErrorString).error;
				state.isLoading = false;
			});

		builder
			.addCase(getGroupMessages.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(
				getGroupMessages.fulfilled,
				(state, action: PayloadAction<Messages | ErrorString>) => {
					if ('error' in action.payload) {
						state.error = action.payload.error || 'Something went wrong!';
					} else {
						state.messages = action.payload.messages;
					}
					state.isLoading = false;
				},
			)
			.addCase(getGroupMessages.rejected, (state, action: PayloadAction<unknown>) => {
				state.error = (action.payload as ErrorString).error;
				state.isLoading = false;
			});
	},

});
