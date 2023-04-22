import { useScreenQuery } from '~/ameliance-ui/hooks/useScreenQuery';

import { NavigationDesktop } from './NavigationDesktop/NavigationDesktop';
import { NavigationMobile } from './NavigationMobile/NavigationMobile';

// import s from './Navigation.module.scss';

export function Navigation() {
	const { isScreenMD } = useScreenQuery();
	return (
		<>
			{!isScreenMD && <NavigationDesktop />}
			{isScreenMD && <NavigationMobile />}
		</>
	);
}
