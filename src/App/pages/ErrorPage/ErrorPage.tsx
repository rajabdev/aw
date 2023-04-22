import { isRouteErrorResponse, useNavigate, useRouteError } from 'react-router-dom';

import { clearLocalStorageAndReload } from '~/ameliance-scripts';
import { ROUTES } from '~constants/ROUTES';

import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Button, ButtonLink } from '~/ameliance-ui/components/Button';
import { Grid } from '~/ameliance-ui/components/Grid';
import { Typography } from '~/ameliance-ui/components/Typography';

import { PageNotFound } from './PageNotFound/PageNotFound';

import s from './ErrorPage.module.scss';

export function ErrorPage() {
	const error = useRouteError();
	const navigate = useNavigate();

	const handleResetButtonOnClick = () => {
		clearLocalStorageAndReload();
	};

	if (isRouteErrorResponse(error) && error.status) return <PageNotFound />;

	return (
		<Block component="main">
			<Grid container component="section" className={s.container}>
				<>
					<Block className={s.buttons}>
						<Button size="small" onClick={() => navigate(ROUTES.home)}>
							На головну
						</Button>
						<Button type="secondary" size="small" onClick={handleResetButtonOnClick}>
							Видалити дані та перезавантажити
						</Button>
						<ButtonLink type="secondary" size="small" href="https://t.me/amelianceskymusic" blank>Написати мені в Телеграм</ButtonLink>
					</Block>
					<Typography component="h3">
						Сорі, виникла помилка =(
					</Typography>
					<Block className={s.description}>
						<>
							<Typography component="h4">
								{isRouteErrorResponse(error) && error.status}
							</Typography>
							<Typography component="h5">
								{error instanceof Error && error.message}
								{isRouteErrorResponse(error) && error.statusText}
								{isRouteErrorResponse(error) && error.data.message}
							</Typography>
						</>
					</Block>
				</>
			</Grid>
		</Block>
	);
}
