import { ROUTES } from '~constants/ROUTES';

import { Block } from '~/ameliance-ui/components/blocks';
import { Link } from '~/ameliance-ui/components/Link';

import s from './ListNavigation.module.scss';

interface ListNavigation {
	charsList: string[];
}

export function ListNavigation({ charsList }: ListNavigation) {
	return (

		<Block component="nav" className={s.ListNavigation}>
			{charsList.length > 0 && charsList.map((char) => (
				<Link href={`${ROUTES.songslist}#${char}`} className="link" key={char}>{char}</Link>
			))}
		</Block>
	);
}

// { songsList.length > 0 && songsList[activeTableNumber][1] &&	(
// 	<Block component="nav" className={s.listNavigation}>
// 		{songsList.length > 0 && songsList[activeTableNumber][1].map((songGroup) => (
// 			<Link href={`${ROUTES.songslist}#${songGroup[0]}`} className="link" key={songGroup[0]}>{songGroup[0]}</Link>
// 		))}
// 	</Block>
// )}
