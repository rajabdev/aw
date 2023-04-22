import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getToday, isObjectEmpty } from '~/ameliance-scripts';
import { MusicPlayer } from '~components/MusicPlayer/MusicPlayer';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import type { SongsGroup } from '~store/songsList/actions/fetchSongsList';
import { fetchSongsList } from '~store/songsList/actions/fetchSongsList';
import { songsListSlice } from '~store/songsList/songsListSlice';

import { LoaderOverlay } from '~/ameliance-ui/components/_LAB/LoaderOverlay';
import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Grid } from '~/ameliance-ui/components/Grid';
import { Dropdown } from '~/ameliance-ui/components/Inputs/Dropdown';
import { SearchInput } from '~/ameliance-ui/components/Inputs/SearchInput';

import { TABLE_NAMES } from './constants/TABLE_NAMES';
import { ListNavigation } from './ListNavigation/ListNavigation';
import { Navbar } from './Navbar/Navbar';
import { ScrollUpButton } from './ScrollUpButton';
import { SongsList } from './SongsList/SongsList';
import { SongsSelection } from './SongsSelection/SongsSelection';

import s from './SongsListPage.module.scss';

export function SongsListPage() {
	const [activeTableNumber, setActiveTableNumber] = useState(0);
	const [songsListTable, setSongsListTable] = useState<SongsGroup[]>();

	const {
		error, isLoading, songsList, tableGroupLabels, lastFetchingDate,

	} = useTypedSelector((state) => state.songsListReducer);

	const { isPlayerShow } = useTypedSelector((state) => state.musicPlayerReducer);

	const dispatch = useTypedDispatch();
	const { actions } = songsListSlice;

	const { page } = useParams();

	useEffect(() => {
		const today = getToday();
		if (isObjectEmpty(songsList) || lastFetchingDate !== today) {
			dispatch(fetchSongsList());
			dispatch(actions.setLastFetchingDate(today));
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const [searchValue, setSearchValue] = useState('');

	useEffect(() => {
		if (songsList.length > 0) {
			const songsActiveTable = songsList[activeTableNumber][1];
			if (!searchValue) {
				setSongsListTable(songsActiveTable);
			} else {
				setSongsListTable(songsActiveTable.map((group) => [
					group[0],
					group[1]
						.filter((song) => song.value.toLowerCase().includes(searchValue.toLowerCase())),
				]));
			}
		}
	}, [activeTableNumber, songsList, searchValue]);

	const handleTableNameChange = (select: string) => {
		const tableNumber = TABLE_NAMES.indexOf(select);
		setActiveTableNumber(tableNumber);
	};

	if (error) throw Error(error);

	const handleSearchOnChange = (value: string) => {
		setSearchValue(value);
	};

	return (
		<Block component="main" className={s.SongsListPage}>
			<Grid component="section" container className={s.container}>
				<Block className={s.tools}>
					{isLoading && <LoaderOverlay />}
					<Dropdown
						selected={TABLE_NAMES[activeTableNumber]}
						onDropdownChange={handleTableNameChange}
						options={TABLE_NAMES}
					/>
					<SearchInput
						placeholder="Пошук..."
						onChangeValue={handleSearchOnChange}
					/>
					{tableGroupLabels && tableGroupLabels.length > 0
					&& <ListNavigation charsList={tableGroupLabels[activeTableNumber]} />}
				</Block>
				{ songsListTable && (page === 'selection'
					? <SongsSelection songsTable={songsListTable} />
					: <SongsList songsTable={songsListTable} />)}
				<ScrollUpButton />
			</Grid>
			{!isLoading && songsListTable && <Navbar />}
			{ songsListTable && isPlayerShow
				&& <MusicPlayer />}
		</Block>
	);
}
