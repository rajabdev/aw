import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { User } from '~types/api/google/firebase/commons/User';

import { getAllUsers } from './actions/getAllUsers';

interface UserResponse extends Partial<User> {
	uid: string;
}

interface UsersState {
	isLoading: boolean;
	error: unknown;
	users: UserResponse[];
}

const initialState: UsersState = {
	isLoading: false,
	error: '',
	users: [],
};

export const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {
		removeUsers(state) {
			state.users = [];
		},
		resetError(state) {
			state.error = '';
		},
	},
	extraReducers: (builder) => {
		builder

			.addCase(getAllUsers.pending, (state) => {
				state.error = '';
				state.isLoading = true;
			})
			.addCase(
				getAllUsers.fulfilled,
				(state, action: PayloadAction<UsersState['users']>) => {
					state.users = action.payload;
					state.error = '';
					state.isLoading = false;
				},
			)
			.addCase(getAllUsers.rejected, (state, action: PayloadAction<unknown>) => {
				if (typeof action.payload === 'string') state.error = action.payload;
				state.isLoading = false;
			});
	},
});
