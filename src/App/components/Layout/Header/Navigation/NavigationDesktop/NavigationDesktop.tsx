import { NavLink } from 'react-router-dom';

import { useAuth } from '~hooks/useAuth';

import { Nav } from '~/ameliance-ui/components/blocks/Nav';
import { LinkLabel } from '~/ameliance-ui/components/Link';

import { navigationList } from '../navigationList';

import s from './NavigationDesktop.module.scss';

export function NavigationDesktop() {
	const { isAuth } = useAuth();

	const linkClass = ({ isActive }: Record<string, boolean>) => (isActive ? s.active : '');

	return (
		<Nav className={s.NavigationDesktop}>
			{navigationList.map((item) => (!item.private || isAuth)
				&& (
					<NavLink key={item.label} className={linkClass} end={item.end} to={item.path}>
						<LinkLabel className={s.link} underline={false}>
							{item.label}
						</LinkLabel>
					</NavLink>
				))}
		</Nav>
	);
}
