import { useNavigate, useParams } from 'react-router-dom';

import { join } from '~/ameliance-scripts';
import { ROUTES } from '~constants/ROUTES';

import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Grid } from '~/ameliance-ui/components/Grid';
import { Icon } from '~/ameliance-ui/components/Icon';
import { CheckSquareIcon } from '~/ameliance-ui/components/icons/CheckSquareIcon';
import { ListIcon } from '~/ameliance-ui/components/icons/ListIcon';
import { Typography } from '~/ameliance-ui/components/Typography';

import s from './Navbar.module.scss';

export function Navbar() {
	const navigate = useNavigate();
	const { page } = useParams();

	const handleListOnClick = () => {
		navigate(ROUTES.songslist);
	};
	const handleSelectionOnClick = () => {
		navigate(ROUTES.songslistSelection);
	};

	const listActive = !page && s.active;
	const selectionActive = page === 'selection' && s.active;

	return (
		<Grid className={s.Navbar} row>
			<Block
				className={join(s.button, listActive)}
				onClick={handleListOnClick}
				grid={{ xx: 3 }}
			>
				<Icon><ListIcon /></Icon>
				<Typography component="caption">Список</Typography>
			</Block>
			<Block
				className={join(s.button, selectionActive)}
				onClick={handleSelectionOnClick}
				grid={{ xx: 3 }}
			>
				<Icon><CheckSquareIcon /></Icon>
				<Typography component="caption">Вибрати</Typography>
			</Block>
		</Grid>
	);
}
