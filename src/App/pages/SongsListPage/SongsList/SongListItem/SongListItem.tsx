import { join } from '~/ameliance-scripts';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { musicPlayerSlice } from '~store/musicPlayer/musicPlayerSlice';
import type { SongItem } from '~store/songsList/actions/fetchSongsList';

import { Button } from '~/ameliance-ui/components/Button';
import { PauseIcon } from '~/ameliance-ui/components/icons/PauseIcon';
import { PlayIcon } from '~/ameliance-ui/components/icons/PlayIcon';
import { ListItem } from '~/ameliance-ui/components/List';
import { Typography } from '~/ameliance-ui/components/Typography';

import s from './SongListItem.module.scss';

interface SongListItem {
	song: SongItem;
}

export function SongListItem({
	song,
}: SongListItem) {
	const {
		audioTracksList,
		currentTrack,
		isPlaying,
	} = useTypedSelector((state) => state.musicPlayerReducer);

	const { actions } = musicPlayerSlice;
	const dispatch = useTypedDispatch();
	const handlePlayPauseButtonOnClick = () => {
		dispatch(actions.showPlayer());
		dispatch(actions.toggleIsPlaying());
		if (currentTrack && currentTrack.includes(song.value)) {
			// dispatch(actions.setCurrentTrack(null));
		} else {
			dispatch(actions.setCurrentTrack(song.value));
		}
	};

	const buttonType = isPlaying && (currentTrack === song.value) ? 'secondary' : 'text';
	const playingClass = isPlaying && (currentTrack === song.value) && s.playing;

	return (
		<ListItem
			className={s.SongListItem}
			key={song.position}
		>
			<Typography
				component="p1"
				id={`song_${song.position}`}
			>
				{song.value}
			</Typography>
			{audioTracksList.includes(song.value)
				&& (
					<Button
						type={buttonType}
						size="small"
						onClick={handlePlayPauseButtonOnClick}
						className={join(playingClass)}
					>
						{isPlaying && (currentTrack === song.value)
							? <PauseIcon size="small" />
							: <PlayIcon size="small" className={s.playIcon} />}
					</Button>
				)}
		</ListItem>
	);
}
