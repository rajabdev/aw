import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import type { ErrorString } from '~types/api/google/firebase/commons/ErrorString';

import type { SongsListData } from './actions/fetchSongsList';
import { fetchSongsList } from './actions/fetchSongsList';

interface SongsListSlice {
	activeTableNumber: number;
	namesList: string[];
	selectedSongsId: string[];
	tableGroupLabels: string[][];
	nameListLimitCount: number;
	isLoading: boolean;
	error: ErrorString;
	songsList: SongsListData;
	lastFetchingDate: string;
}

const initSongsListSlice: SongsListSlice = {
	activeTableNumber: 0,
	namesList: [],
	selectedSongsId: [],
	tableGroupLabels: [],
	nameListLimitCount: 10,
	isLoading: false,
	error: '',
	songsList: [] as SongsListData,
	lastFetchingDate: '',
};

export const songsListSlice = createSlice({
	name: 'songsList',
	initialState: initSongsListSlice,
	reducers: {
		setActiveTable(state, action: PayloadAction<SongsListSlice['activeTableNumber']>) {
			state.activeTableNumber = action.payload;
		},
		resetTableGroupLabels(state) {
			state.tableGroupLabels = [];
		},
		resetNamesList(state) {
			state.namesList = [];
		},
		toggleSetToSelectedSongsId(state, action: PayloadAction<string>) {
			let newSongsIdList = [...state.selectedSongsId];
			const findIndex = state.selectedSongsId.indexOf(action.payload);
			if (findIndex >= 0) {
				newSongsIdList.splice(findIndex, 1);
			} else {
				newSongsIdList = [...state.selectedSongsId, action.payload];
			}
			state.selectedSongsId = newSongsIdList;
		},
		removeFromSelectedSongsId(state, action: PayloadAction<string>) {
			const newSongsIdList = [...state.selectedSongsId];
			const findIndex = state.selectedSongsId.indexOf(action.payload);
			if (findIndex >= 0) newSongsIdList.splice(findIndex, 1);
			state.selectedSongsId = newSongsIdList;
		},
		resetSelectedSongsId(state) {
			state.selectedSongsId = [];
		},
		toggleSetToNamesList(state, action: PayloadAction<string>) {
			const songName = action.payload;
			const { namesList } = state;
			let newNamesList = [...namesList];

			if (namesList.length === 0) newNamesList = [songName];

			if (namesList.length > 0 && namesList.length < state.nameListLimitCount) {
				newNamesList = [...namesList, songName];
			}

			const indexOfSongName = namesList.indexOf(songName);
			if (indexOfSongName >= 0) {
				newNamesList = [...namesList];
				newNamesList.splice(indexOfSongName, 1);
			}

			state.namesList = newNamesList;
		},
		setLastFetchingDate(state, action: PayloadAction<SongsListSlice['lastFetchingDate']>) {
			state.lastFetchingDate = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchSongsList.pending, (state) => {
				state.isLoading = true;
				state.error = '';
			})
			.addCase(
				fetchSongsList.fulfilled,
				(state, action: PayloadAction<SongsListData>) => {
					state.songsList = action.payload;
					state.error = '';
					state.isLoading = false;
					state.tableGroupLabels = action.payload
						.map((table) => table[1]
							.map((group) => group[0]));
				},
			)
			.addCase(fetchSongsList.rejected, (state, action: PayloadAction<unknown>) => {
				if (typeof action.payload === 'string') state.error = action.payload;
				state.isLoading = false;
			});
	},
});
