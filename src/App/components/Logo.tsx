import { Link } from 'react-router-dom';

import { useAuth } from '~hooks/useAuth';

import { AWLogo } from './SVG/AWLogo';
import { AWLogoShort } from './SVG/AWLogoShort';

interface Logo {
	type?: 'normal' | 'short';
}

export function Logo({ type }: Logo) {
	const { isAuth } = useAuth();
	return (
		<Link to="/" style={{ color: 'var(--color--f1-0)' }}>
			{type === 'short' && <AWLogoShort />}
			{type === 'normal' && <AWLogo />}
			{!type && (isAuth ? <AWLogo /> : <AWLogoShort />)}
		</Link>
	);
}
