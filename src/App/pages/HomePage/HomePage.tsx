import { Block } from '~/ameliance-ui/components/blocks/Block';
import { ButtonLink } from '~/ameliance-ui/components/Button';
import { Grid } from '~/ameliance-ui/components/Grid/Grid';
import { Typography } from '~/ameliance-ui/components/Typography';

import s from './HomePage.module.scss';

export function HomePage() {
	return (
		<Block component="main" className={s.HomePage}>
			<Grid container component="section" className={s.container}>
				<Typography component="h1">Вітаю на сайті 👋</Typography>
				<Typography component="h6">Сайт знаходиться в розробці</Typography>
				<Typography component="h6">Якщо ви знайшли баг або у вас є якісь пропозиції, побажання, коментарі, пишіть в Телеграм 😊</Typography>
				<ButtonLink href="https://t.me/amelianceskymusic" blank>Написати</ButtonLink>
			</Grid>
		</Block>
	);
}
