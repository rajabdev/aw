import Snowfall from 'react-snowfall';

import { Block } from '~/ameliance-ui/components/blocks/Block';

import s from './Snow.module.scss';

export function Snow() {
	return (
		<Block className={s.Snow}>
			<Snowfall
				color="white"
				snowflakeCount={200}
				wind={[0, 0]}
				speed={[0.023, 0.025]}
			/>
		</Block>
	);
}
