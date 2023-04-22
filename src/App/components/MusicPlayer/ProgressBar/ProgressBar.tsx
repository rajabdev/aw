import { toTimeFormat } from '~/ameliance-scripts';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { musicPlayerSlice } from '~store/musicPlayer/musicPlayerSlice';

import { Block } from '~/ameliance-ui/components/blocks';
import { Typography } from '~/ameliance-ui/components/Typography';

import s from './ProgressBar.module.scss';

interface ProgressBarProps {
	timeProgress: number;
	audioRef: React.RefObject<HTMLAudioElement>;
	progressBarRef: React.RefObject<HTMLInputElement>;
}

export function ProgressBar({
	timeProgress,
	audioRef,
	progressBarRef,
}: ProgressBarProps) {
	const { currentTrackDuration } = useTypedSelector((state) => state.musicPlayerReducer);
	const { actions } = musicPlayerSlice;
	const dispatch = useTypedDispatch();

	const handleInputOnChange = () => {
		if (audioRef.current && progressBarRef.current) {
			const reassignAudioRef = audioRef.current;
			reassignAudioRef.currentTime = Number(progressBarRef.current.value);
		}
	};

	const handleInputOnMouseUp = () => {
		if (audioRef.current && progressBarRef.current) {
			dispatch(actions.setCurrentTrackTimeProgress(Number(progressBarRef.current.value)));
		}
	};

	return (
		<Block className={s.ProgressBar}>
			<Typography component="p2" className={s.timeProgress}>{toTimeFormat(timeProgress)}</Typography>
			<input
				type="range"
				className={s.range}
				onChange={handleInputOnChange}
				onMouseUp={handleInputOnMouseUp}
				defaultValue="0"
				ref={progressBarRef}
			/>
			<Typography component="p2" className={s.duration}>{toTimeFormat(currentTrackDuration)}</Typography>
		</Block>
	);
}
