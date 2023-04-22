import { join } from '~/ameliance-scripts';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import type { SongItem } from '~store/songsList/actions/fetchSongsList';
import { songsListSlice } from '~store/songsList/songsListSlice';

import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Icon } from '~/ameliance-ui/components/Icon';
import { CheckIcon } from '~/ameliance-ui/components/icons/CheckIcon';
import { ListItem } from '~/ameliance-ui/components/List';
import { Typography } from '~/ameliance-ui/components/Typography';

import s from './SongListItem.module.scss';

interface SongListItem {
	song: SongItem;
}

export function SongListItem({ song }: SongListItem) {
	const {
		namesList, nameListLimitCount, selectedSongsId,
	} = useTypedSelector((state) => state.songsListReducer);
	const dispatch = useTypedDispatch();
	const { actions } = songsListSlice;

	const isActive = selectedSongsId.includes(song.position);

	const componentClass = [
		isActive && s.active,
	];

	const handleListItemOnClick = () => {
		if (namesList.length < nameListLimitCount) {
			dispatch(actions.toggleSetToSelectedSongsId(song.position));
		} else {
			dispatch(actions.removeFromSelectedSongsId(song.position));
		}

		dispatch(actions.toggleSetToNamesList(song.value));
	};

	return (
		<Block
			className={join(s.SongListItem, componentClass)}
			onClick={handleListItemOnClick}
		>
			<ListItem className={s.song}>
				<Typography
					component="p1"
					id={`song_${song.position}`}
				>
					{song.value}
				</Typography>
				<Icon>
					{isActive && (
						<CheckIcon />
					)}
				</Icon>
			</ListItem>
		</Block>
	);
}
