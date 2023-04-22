import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { User } from '~types/api/google/firebase/commons/User';

import { createUser } from './actions/createUser';
import { createUserWithEmail } from './actions/createUserWithEmail';
import { signIn } from './actions/signIn';
import { signInWithGoogle } from './actions/signInWithGoogle';
import { updateUser } from './actions/updateUser';

interface UserState {
	isLoading: boolean;
	error: unknown;
	uid: string;
	displayName: string;
	photoURL: string;
	email: string;
	status: 'user' | 'admin' | 'owner' | '';
	sex: 'male' | 'female' | '';
	role: string;
	lastActiveChatId: string;
	lastVisitDate: string;
	isOnline: boolean;
	visitsCount: number;
}

const initialState: UserState = {
	isLoading: false,
	error: '',
	uid: '',
	displayName: '',
	photoURL: '',
	email: '',
	status: '',
	sex: '',
	role: '',
	lastActiveChatId: '',
	lastVisitDate: '',
	isOnline: false,
	visitsCount: 0,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			state.uid = action.payload.uid;
			state.displayName = action.payload.displayName;
			state.photoURL = action.payload.photoURL;
			state.email = action.payload.email;
		},
		removeUser(state) {
			state.uid = '';
			state.displayName = '';
			state.photoURL = '';
			state.email = '';
			state.status = '';
			state.sex = '';
			state.role = '';
			state.lastActiveChatId = '';
			state.lastVisitDate = '';
			state.isOnline = false;
			state.visitsCount = 0;
			state.error = '';
			state.isLoading = false;
		},
		resetError(state) {
			state.error = '';
		},
	},
	extraReducers: (builder) => {
		builder

			.addCase(createUser.pending, (state) => {
				state.uid = '';
				state.displayName = '';
				state.photoURL = '';
				state.email = '';
				state.status = '';
				state.sex = '';
				state.role = '';
				state.lastActiveChatId = '';
				state.lastVisitDate = '';
				state.isOnline = false;
				state.visitsCount = 0;

				state.error = '';
				state.isLoading = true;
			})
			.addCase(
				createUser.fulfilled,
				(state, action: PayloadAction<User>) => {
					state.uid = action.payload.uid;
					state.displayName = action.payload.displayName;
					state.photoURL = action.payload.photoURL;
					state.email = action.payload.email;
					state.status = action.payload.status;
					state.sex = action.payload.sex;
					state.role = action.payload.role;
					state.lastActiveChatId = action.payload.lastActiveChatId;
					state.lastVisitDate = action.payload.lastVisitDate;
					state.isOnline = action.payload.isOnline;
					state.visitsCount = action.payload.visitsCount;

					state.error = '';
					state.isLoading = false;
				},
			)
			.addCase(createUser.rejected, (state, action: PayloadAction<unknown>) => {
				if (typeof action.payload === 'string') state.error = action.payload;
				state.isLoading = false;
			})

			.addCase(createUserWithEmail.pending, (state) => {
				state.uid = '';
				state.displayName = '';
				state.photoURL = '';
				state.email = '';
				state.status = '';
				state.sex = '';
				state.role = '';
				state.lastActiveChatId = '';
				state.lastVisitDate = '';
				state.isOnline = false;
				state.visitsCount = 0;

				state.error = '';
				state.isLoading = true;
			})
			.addCase(
				createUserWithEmail.fulfilled,
				(state, action: PayloadAction<User>) => {
					state.uid = action.payload.uid;
					state.displayName = action.payload.displayName;
					state.photoURL = action.payload.photoURL;
					state.email = action.payload.email;
					state.status = action.payload.status;
					state.sex = action.payload.sex;
					state.role = action.payload.role;
					state.lastActiveChatId = action.payload.lastActiveChatId;
					state.lastVisitDate = action.payload.lastVisitDate;
					state.isOnline = action.payload.isOnline;
					state.visitsCount = action.payload.visitsCount;

					state.error = '';
					state.isLoading = false;
				},
			)
			.addCase(createUserWithEmail.rejected, (state, action: PayloadAction<unknown>) => {
				if (typeof action.payload === 'string') state.error = action.payload;
				state.isLoading = false;
			})

			.addCase(signIn.pending, (state) => {
				state.uid = '';
				state.displayName = '';
				state.photoURL = '';
				state.email = '';
				state.status = '';
				state.sex = '';
				state.role = '';
				state.lastActiveChatId = '';
				state.lastVisitDate = '';
				state.isOnline = false;
				state.visitsCount = 0;

				state.error = '';
				state.isLoading = true;
			})
			.addCase(
				signIn.fulfilled,
				(state, action: PayloadAction<User>) => {
					state.uid = action.payload.uid;
					state.displayName = action.payload.displayName;
					state.photoURL = action.payload.photoURL;
					state.email = action.payload.email;
					state.status = action.payload.status;
					state.sex = action.payload.sex;
					state.role = action.payload.role;
					state.lastActiveChatId = action.payload.lastActiveChatId;
					state.lastVisitDate = action.payload.lastVisitDate;
					state.isOnline = action.payload.isOnline;
					state.visitsCount = action.payload.visitsCount;

					state.error = '';
					state.isLoading = false;
				},
			)
			.addCase(signIn.rejected, (state, action: PayloadAction<unknown>) => {
				if (typeof action.payload === 'string') state.error = action.payload;
				state.isLoading = false;
			})

			.addCase(signInWithGoogle.pending, (state) => {
				state.uid = '';
				state.displayName = '';
				state.photoURL = '';
				state.email = '';
				state.status = '';
				state.sex = '';
				state.role = '';
				state.lastActiveChatId = '';
				state.lastVisitDate = '';
				state.isOnline = false;
				state.visitsCount = 0;

				state.error = '';
				state.isLoading = true;
			})
			.addCase(
				signInWithGoogle.fulfilled,
				(state, action: PayloadAction<User>) => {
					state.uid = action.payload.uid;
					state.displayName = action.payload.displayName;
					state.photoURL = action.payload.photoURL;
					state.email = action.payload.email;
					state.status = action.payload.status;
					state.sex = action.payload.sex;
					state.role = action.payload.role;
					state.lastActiveChatId = action.payload.lastActiveChatId;
					state.lastVisitDate = action.payload.lastVisitDate;
					state.isOnline = action.payload.isOnline;
					state.visitsCount = action.payload.visitsCount;

					state.error = '';
					state.isLoading = false;
				},
			)
			.addCase(signInWithGoogle.rejected, (state, action: PayloadAction<unknown>) => {
				if (typeof action.payload === 'string') state.error = action.payload;
				state.isLoading = false;
			})

			.addCase(updateUser.pending, (state) => {
				state.error = '';
				state.isLoading = true;
			})
			.addCase(
				updateUser.fulfilled,
				(state, action: PayloadAction<User>) => {
					state.uid = action.payload.uid;
					state.displayName = action.payload.displayName;
					state.photoURL = action.payload.photoURL;
					state.email = action.payload.email;
					state.status = action.payload.status;
					state.sex = action.payload.sex;
					state.role = action.payload.role;
					state.lastActiveChatId = action.payload.lastActiveChatId;
					state.lastVisitDate = action.payload.lastVisitDate;
					state.isOnline = action.payload.isOnline;
					state.visitsCount = action.payload.visitsCount;

					state.error = '';
					state.isLoading = false;
				},
			)
			.addCase(updateUser.rejected, (state, action: PayloadAction<unknown>) => {
				if (typeof action.payload === 'string') state.error = action.payload;
				state.isLoading = false;
			});
	},
});
