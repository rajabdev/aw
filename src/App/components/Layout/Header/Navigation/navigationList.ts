import { PRIVATE_ROUTES, ROUTES } from '~constants/ROUTES';

interface NavigationItem {
	label: string;
	path: string;
	end: boolean;
	private?: boolean;
}

type NavigationList = NavigationItem[];

export const navigationList: NavigationList = [
	{
		label: 'Головна',
		path: ROUTES.home,
		end: false,
	}, {
		label: 'Список пісень',
		path: ROUTES.songslist,
		end: false,
	}, {
		label: 'Користувачі',
		path: PRIVATE_ROUTES.users,
		end: false,
		private: true,
	},
];
