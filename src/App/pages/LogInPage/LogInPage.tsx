import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { isObjectEmpty } from '~/ameliance-scripts';
import { GoogleColorIcon } from '~components/SVG/GoogleColorIcon';
import { PRIVATE_ROUTES, ROUTES } from '~constants/ROUTES';
import { useAuth } from '~hooks/useAuth';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { signIn } from '~store/user/actions/signIn';
import { signInWithGoogle } from '~store/user/actions/signInWithGoogle';
import { userSlice } from '~store/user/userSlice';

import { LoaderOverlay } from '~/ameliance-ui/components/_LAB/LoaderOverlay';
import { Block } from '~/ameliance-ui/components/blocks/Block';
import { Main } from '~/ameliance-ui/components/blocks/Main';
import { Button } from '~/ameliance-ui/components/Button';
import { Form } from '~/ameliance-ui/components/Form';
import { Grid } from '~/ameliance-ui/components/Grid';
import { EmailInput, PasswordInput } from '~/ameliance-ui/components/Inputs';
import { LinkLabel } from '~/ameliance-ui/components/Link';
import { Typography } from '~/ameliance-ui/components/Typography';

import { LogInErrorModal } from './LogInErrorModal';
import { LogInSuccessModal } from './LogInSuccessModal';

import s from './LogInPage.module.scss';

interface FormFields {
	email: string;
	password: string;
}

export function LogInPage() {
	const { isFillProfile } = useAuth();

	const navigate = useNavigate();

	const dispatch = useTypedDispatch();
	const { error, isLoading, uid } = useTypedSelector((state) => state.userReducer);
	const { actions } = userSlice;

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormFields>({
		mode: 'onSubmit',
		defaultValues: {
			email: '',
			password: '',
		},
	});

	const isValidFixed = isObjectEmpty(errors); //* fix isValid default has false

	const registers = {
		email: register('email', {
			required: 'Поле таке пусте! Введіть більше символів!',
			pattern: { value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i, message: 'Невірно введена адреса електронної пошти!' },
		}),
		password: register('password', {
			required: 'Поле таке пусте! Введіть більше символів!',
			pattern: { value: /^[a-zA-Z0-9]+$/, message: 'Використовуйте тільки латинські літери та цифри!' },
			minLength: { value: 8, message: 'Мінімальна довжина пароля 8 символів' },
			maxLength: { value: 16, message: 'Максимальна довжина пароля 16 символів' },
		}),
	};

	const onSubmit: SubmitHandler<FormFields> = async ({ email, password }: FormFields) => {
		dispatch(signIn({ email, password }));
	};

	const handleSignInWithGoogle = () => {
		dispatch(signInWithGoogle());
	};

	const handlerSuccessModal = () => {
		if (!isFillProfile) {
			navigate(PRIVATE_ROUTES.user);
		} else {
			navigate(PRIVATE_ROUTES.users);
		}
	};

	const handlerErrorModal = () => {
		dispatch(actions.resetError());
	};

	return (
		<Main>
			<Grid container className={s.container}>
				<Typography component="h4">Вхід</Typography>
				<Form
					className={s.form}
					onSubmit={handleSubmit(onSubmit)}
				>

					<Block className={s.main}>
						<EmailInput register={registers.email} errors={errors}>
							Адреса електронної пошти*:
						</EmailInput>
						<PasswordInput register={registers.password} errors={errors}>
							Пароль*:
						</PasswordInput>
						<Button submit disabled={!isValidFixed}>
							Увійти
						</Button>
					</Block>
					<Typography component="p2" className={s.center}>
						або
					</Typography>
					<Block className={s.additional}>
						<Button type="secondary" onClick={handleSignInWithGoogle}>
							<GoogleColorIcon />
							Увійти через Google
						</Button>
						<Typography component="p2">
							Немає акаунту?
							{' '}
							<Link to={ROUTES.signup}><LinkLabel display="p2">Створити</LinkLabel></Link>
						</Typography>
					</Block>
				</Form>
				{isLoading && <LoaderOverlay />}
			</Grid>
			{(uid && !isLoading) ? <LogInSuccessModal onClose={handlerSuccessModal} /> : null}
			{(error && !isLoading) ? <LogInErrorModal onClose={handlerErrorModal} /> : null}
		</Main>
	);
}
