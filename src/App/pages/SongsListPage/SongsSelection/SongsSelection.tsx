import { useTypedSelector } from '~store/hooks/useTypedSelector';
import type { SongsGroup } from '~store/songsList/actions/fetchSongsList';

import { Block } from '~/ameliance-ui/components/blocks';
import { List } from '~/ameliance-ui/components/List';
import { Typography } from '~/ameliance-ui/components/Typography';

import { SelectionBar } from './SelectionBar/SelectionBar';
import { SongListItem } from './SongListItem/SongListItem';

import s from './SongsSelection.module.scss';

interface SongsSelection {
	songsTable: SongsGroup[];
}

export function SongsSelection({ songsTable }: SongsSelection) {
	const { selectedSongsId } = useTypedSelector((state) => state.songsListReducer);

	return (
		<Block className={s.SongsSelection}>
			{songsTable.map((songGroup) => (songGroup[1].length > 0
					&& (
						<Block className={s.songsGroup} key={songGroup[0]}>
							<Typography component="h3" className={s.songsGroupSymbol} id={songGroup[0]}>{songGroup[0]}</Typography>
							<List className={s.songsNames}>
								{songGroup[1].map((song) => (
									<SongListItem
										key={song.position}
										song={song}
									/>
								))}
							</List>
						</Block>
					)))}
			{selectedSongsId.length > 0 && <SelectionBar />}
		</Block>
	);
}
