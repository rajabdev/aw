import { AWLogoShort } from '~components/SVG/AWLogoShort';

import { Block } from '~/ameliance-ui/components/blocks/Block';

import s from './StartScreen.module.scss';

export function StartScreen() {
	return (
		<Block className={s.StartScreen}>
			<AWLogoShort />
		</Block>
	);
}
