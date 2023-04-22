import { useState } from 'react';

import { clearLocalStorageAndReload } from '~/ameliance-scripts/scripts';
import { useFullscreen } from '~hooks/useFullscreen';
import { appSlice } from '~store/app/appSlice';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { fetchSongsList } from '~store/songsList/actions/fetchSongsList';

import { Button } from '~/ameliance-ui/components/Button';
import { Icon } from '~/ameliance-ui/components/Icon';
import { AlertOctagonIcon } from '~/ameliance-ui/components/icons/AlertOctagonIcon';
import { Maximize2Icon } from '~/ameliance-ui/components/icons/Maximize2Icon';
import { Minimize2Icon } from '~/ameliance-ui/components/icons/Minimize2Icon';
import { MoonIcon } from '~/ameliance-ui/components/icons/MoonIcon';
import { MoreVerticalIcon } from '~/ameliance-ui/components/icons/MoreVerticalIcon';
import { RefreshCcwIcon } from '~/ameliance-ui/components/icons/RefreshCcwIcon';
import { SunIcon } from '~/ameliance-ui/components/icons/SunIcon';
import {
	Menu, MenuContainer, MenuDivider, MenuItem,
} from '~/ameliance-ui/components/Menu';
import { Typography } from '~/ameliance-ui/components/Typography';
import { toggleTheme } from '~/ameliance-ui/scripts/toggleTheme';

export function HeaderMenu() {
	const [fullscreenMode, setFullscreenMode] = useState(false);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const { theme } = useTypedSelector((state) => state.appReducer);
	const { actions } = appSlice;
	const dispatch = useTypedDispatch();

	const setFullscreen = useFullscreen();

	const handelIconMenuClick = () => {
		setIsMenuOpen(true);
	};

	const handelMenuClose = () => {
		setIsMenuOpen(false);
	};

	const handleResetMenuItemOnClick = () => {
		setIsMenuOpen(false);
		clearLocalStorageAndReload();
	};

	const handleReloadSongsLIstMenuItemOnClick = () => {
		setIsMenuOpen(false);
		dispatch(fetchSongsList());
	};

	const handleThemeMenuItemOnClick = () => {
		const newTheme = toggleTheme();
		dispatch(actions.setTheme(newTheme));
	};

	const handleFullscreenMenuItemOnClick = () => {
		const newFullscreen = !fullscreenMode;
		setFullscreen(newFullscreen);
		setFullscreenMode(newFullscreen);
	};

	return (
		<MenuContainer>
			<Menu
				isOpen={isMenuOpen}
				onClick={handelMenuClose}
				anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
				menuOrigin={{ horizontal: 'right', vertical: 'top' }}
				preventItemClickClose
			>
				<MenuItem onClick={handleResetMenuItemOnClick}>
					<Icon size="small"><AlertOctagonIcon /></Icon>
					<Typography component="p2">
						Скинути налаштування
					</Typography>
				</MenuItem>
				<MenuItem onClick={handleReloadSongsLIstMenuItemOnClick}>
					<Icon size="small"><RefreshCcwIcon /></Icon>
					<Typography component="p2">
						Оновити список пісень
					</Typography>
				</MenuItem>
				<MenuDivider />
				<MenuItem onClick={handleThemeMenuItemOnClick}>
					<Icon size="small">{theme === 'dark' ? <MoonIcon /> : <SunIcon />}</Icon>
					<Typography component="p2">
						Тема:
						{' '}
						{theme === 'dark' ? 'темна' : 'світла'}
					</Typography>
				</MenuItem>
				<MenuItem onClick={handleFullscreenMenuItemOnClick}>
					<Icon size="small">{fullscreenMode ? <Minimize2Icon /> : <Maximize2Icon />}</Icon>
					<Typography component="p2">
						На весь екран
					</Typography>
				</MenuItem>
			</Menu>
			<Button type="text" onClick={handelIconMenuClick}>
				<MoreVerticalIcon />
			</Button>
		</MenuContainer>
	);
}
