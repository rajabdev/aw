import type { SongsGroup } from '~store/songsList/actions/fetchSongsList';

import { Block } from '~/ameliance-ui/components/blocks';
import { List } from '~/ameliance-ui/components/List';
import { Typography } from '~/ameliance-ui/components/Typography';

import { SongListItem } from './SongListItem/SongListItem';

import s from './SongsList.module.scss';

interface SongsList {
	songsTable: SongsGroup[];
}

export function SongsList({
	songsTable,
}: SongsList) {
	return (
		<Block className={s.SongsList}>
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
		</Block>
	);
}
