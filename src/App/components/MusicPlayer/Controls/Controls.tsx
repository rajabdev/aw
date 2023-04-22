import {
	useCallback, useEffect, useRef,
} from 'react';

import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { musicPlayerSlice } from '~store/musicPlayer/musicPlayerSlice';

import { Block } from '~/ameliance-ui/components/blocks';
import { Button } from '~/ameliance-ui/components/Button';
import { ChevronsLeftIcon } from '~/ameliance-ui/components/icons/ChevronsLeftIcon';
import { ChevronsRightIcon } from '~/ameliance-ui/components/icons/ChevronsRightIcon';
import { PauseIcon } from '~/ameliance-ui/components/icons/PauseIcon';
import { PlayIcon } from '~/ameliance-ui/components/icons/PlayIcon';
import { SkipBackIcon } from '~/ameliance-ui/components/icons/SkipBackIcon';
import { SkipForwardIcon } from '~/ameliance-ui/components/icons/SkipForwardIcon';

import s from './Controls.module.scss';

interface Controls {
	timeProgress: number;
	setTimeProgress: (time: number) => void;
	audioRef: React.RefObject<HTMLAudioElement>;
	progressBarRef: React.RefObject<HTMLInputElement>;
}

export function Controls({
	timeProgress,
	setTimeProgress,
	audioRef,
	progressBarRef,
}: Controls) {
	const playAnimationRef = useRef<number>();

	const {
		isPlaying,
		currentTrackDuration,
		currentTrackTimeProgress,
	} = useTypedSelector((state) => state.musicPlayerReducer);
	const dispatch = useTypedDispatch();
	const { actions } = musicPlayerSlice;

	const repeat = useCallback(() => {
		if (audioRef.current && progressBarRef.current) {
			const { currentTime } = audioRef.current;
			setTimeProgress(currentTime);
			const reassignProgressBarRef = progressBarRef.current;
			reassignProgressBarRef.value = currentTime.toString();
			reassignProgressBarRef.style.setProperty(
				'--progress-bar--range-progress',
				`${(Number(reassignProgressBarRef.value) / currentTrackDuration) * 100}%`,
			);

			if (isPlaying) {
				playAnimationRef.current = requestAnimationFrame(repeat);
			}
		}
	}, [audioRef, currentTrackDuration, isPlaying, progressBarRef, setTimeProgress]);

	useEffect(() => {
		if (audioRef.current) {
			if (isPlaying) {
				audioRef.current.play();
			} else {
				audioRef.current.pause();
			}
		}
		playAnimationRef.current = requestAnimationFrame(repeat);
	}, [isPlaying, audioRef, repeat]);

	const handlePlayPauseIconOnClick = () => {
		dispatch(actions.toggleIsPlaying());

		if (!isPlaying) {
			setTimeProgress(currentTrackTimeProgress);
		}
	};

	const skipForwardOnClick = () => {
		if (audioRef.current) {
			const reassignAudioRef = audioRef.current;
			reassignAudioRef.currentTime += 10;
		}
	};

	const skipBackwardOnClick = () => {
		if (audioRef.current) {
			const reassignAudioRef = audioRef.current;
			reassignAudioRef.currentTime -= 10;
		}
	};

	const handlePreviousOnClick = () => {
		if (timeProgress >= 1) {
			setTimeProgress(0);
			if (audioRef.current) {
				const reassignAudioRef = audioRef.current;
				reassignAudioRef.currentTime = 0;
			}
		} else {
			dispatch(actions.prevTrack());
		}
	};

	const handleNextOnClick = () => {
		dispatch(actions.nextTrack());
	};

	return (
		<Block className={s.Controls}>
			<Button type="text" onClick={handlePreviousOnClick}>
				<SkipBackIcon />
			</Button>
			<Button type="text" onClick={skipBackwardOnClick}>
				<ChevronsLeftIcon />
			</Button>
			<Button type="secondary" onClick={handlePlayPauseIconOnClick}>
				{isPlaying ? <PauseIcon /> : <PlayIcon className={s.playIcon} />}
			</Button>
			<Button type="text" onClick={skipForwardOnClick}>
				<ChevronsRightIcon />
			</Button>
			<Button type="text" onClick={handleNextOnClick}>
				<SkipForwardIcon />
			</Button>
		</Block>
	);
}
