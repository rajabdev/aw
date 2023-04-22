import { useNavigate } from 'react-router-dom';

import { ROUTES } from '~constants/ROUTES';

import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Button } from '~/ameliance-ui/components/Button';
import { Grid } from '~/ameliance-ui/components/Grid';
import { Typography } from '~/ameliance-ui/components/Typography';

import s from './PageNotFound.module.scss';

export function PageNotFound() {
	const navigate = useNavigate();
	return (
		<Block component="main">
			<Grid container component="section" className={s.container}>
				<Button size="small" onClick={() => navigate(ROUTES.home)}>
					На головну
				</Button>
				<Block className={s.title}>
					<Typography component="p1" display="h1" className={s.title40}>40</Typography>
					<Typography component="p1" display="h1" className={s.title4}>4</Typography>
				</Block>
				<Block className={s.description}>
					<Typography component="p2">
						Вибачте, сторінки не існує
						<br />
						або функціонал ще в процесі розробки
						<br />
						¯\_(ツ)_/¯
					</Typography>
				</Block>
			</Grid>
		</Block>
	);
}
