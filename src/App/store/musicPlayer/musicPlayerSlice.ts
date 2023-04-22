import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import asm from 'asm-ts-scripts';

import { mp3List } from '~app/data/mp3List';

const audioFilesList: string[] = mp3List.trim().split('\n').map((song) => song.trim());

interface MusicPlayerSlice {
	normalOrderAudioFilesList: string[];
	audioTracksList: string[];
	isPlaying: boolean;
	isPlayerShow: boolean;
	lastOpenedTrack: string | null;
	currentTrack: string | null;
	currentTrackIndex: number;
	currentTrackDuration: number;
	currentTrackTimeProgress: number;
}

const initMusicPlayerSlice: MusicPlayerSlice = {
	normalOrderAudioFilesList: audioFilesList,
	audioTracksList: audioFilesList,
	isPlaying: false,
	isPlayerShow: false,
	lastOpenedTrack: null,
	currentTrack: null,
	currentTrackIndex: 0,
	currentTrackDuration: 0,
	currentTrackTimeProgress: 0,
};

export const musicPlayerSlice = createSlice({
	name: 'musicPlayer',
	initialState: initMusicPlayerSlice,
	reducers: {
		setNormalAudioTracksList(state) {
			state.audioTracksList = state.normalOrderAudioFilesList;
		},
		setShuffleAudioTracksList(state) {
			state.audioTracksList = asm.shuffleArray(state.audioTracksList);
		},
		setIsPlaying(state, action: PayloadAction<MusicPlayerSlice['isPlaying']>) {
			state.isPlaying = action.payload;
			if (state.isPlaying) {
				state.currentTrack = state.audioTracksList[state.currentTrackIndex];
			} else {
				state.lastOpenedTrack = state.currentTrack;
			}
		},
		toggleIsPlaying(state) {
			state.isPlaying = !state.isPlaying;
			if (state.isPlaying) {
				state.currentTrack = state.audioTracksList[state.currentTrackIndex];
			} else {
				state.lastOpenedTrack = state.currentTrack;
			}
		},
		showPlayer(state) {
			state.isPlayerShow = true;
		},
		hidePlayer(state) {
			state.isPlayerShow = false;
		},
		setCurrentTrack(state, action: PayloadAction<MusicPlayerSlice['currentTrack']>) {
			state.currentTrack = action.payload;
		},
		setCurrentTrackIndex(state, action: PayloadAction<MusicPlayerSlice['currentTrackIndex']>) {
			state.currentTrackIndex = action.payload;
		},
		setCurrentTrackDuration(state, action: PayloadAction<MusicPlayerSlice['currentTrackDuration']>) {
			state.currentTrackDuration = action.payload;
		},
		setCurrentTrackTimeProgress(state, action: PayloadAction<MusicPlayerSlice['currentTrackTimeProgress']>) {
			state.currentTrackTimeProgress = action.payload;
		},
		prevTrack(state) {
			if (state.currentTrackIndex === 0) {
				const lastTrackIndex = state.audioTracksList.length - 1;

				state.currentTrackIndex = 	lastTrackIndex;
				state.currentTrack = state.audioTracksList[lastTrackIndex];
			} else {
				const newTrackIndex = state.currentTrackIndex - 1;
				state.currentTrackIndex = newTrackIndex;
				state.currentTrack = state.audioTracksList[newTrackIndex];
			}
		},
		nextTrack(state) {
			if (state.currentTrackIndex >= state.audioTracksList.length - 1) {
				state.currentTrackIndex = 0;
				[state.currentTrack] = state.audioTracksList;
			} else {
				const newTrackIndex = state.currentTrackIndex + 1;
				state.currentTrackIndex = newTrackIndex;
				state.currentTrack = state.audioTracksList[newTrackIndex];
			}
		},
	},
});
