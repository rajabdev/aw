import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';

import { isObjectEmpty } from '~/ameliance-scripts';
import { GoogleColorIcon } from '~components/SVG/GoogleColorIcon';
import { PRIVATE_ROUTES, ROUTES } from '~constants/ROUTES';
import { useAuth } from '~hooks/useAuth';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { createUserWithEmail } from '~store/user/actions/createUserWithEmail';
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

import { SignUpErrorModal } from './SignUpErrorModal';
import { SignUpSuccessModal } from './SignUpSuccessModal';

import s from './SignUpPage.module.scss';

interface FormFields {
	email: string;
	password: string;
	confirmPassword: string;
}

export function SignUpPage() {
	const { isFillProfile } = useAuth();

	const navigate = useNavigate();

	const dispatch = useTypedDispatch();
	const { error, isLoading, uid } = useTypedSelector((state) => state.userReducer);
	const { actions } = userSlice;

	const {
		register,
		handleSubmit,
		reset,
		resetField,
		watch,
		formState: { errors },
	} = useForm<FormFields>({
		mode: 'onSubmit',
		defaultValues: {
			email: '',
			password: '',
			confirmPassword: '',
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
		confirmPassword: register('confirmPassword', {
			required: 'Поле таке пусте! Введіть більше символів!',
			pattern: { value: /^[a-zA-Z0-9]+$/, message: 'Використовуйте тільки латинські літери та цифри!' },
			minLength: { value: 8, message: 'Мінімальна довжина пароля 8 символів' },
			maxLength: { value: 16, message: 'Максимальна довжина пароля 16 символів' },
			validate: (value: string) => watch('password') === value
				|| 'Паролі не збігаються!',
		}),
	};

	const onSubmit: SubmitHandler<FormFields> = async ({
		email, password,
	}: FormFields) => {
		dispatch(createUserWithEmail({
			email, password,
		}));
	};

	const handlePasswordOnChange = () => {
		resetField('confirmPassword');
	};

	const handleSignInWithGoogle = () => {
		dispatch(signInWithGoogle());
	};

	const handlerSuccessModal = () => {
		reset();
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
				<Typography component="h4">Реєстрація</Typography>
				<Form
					className={s.form}
					onSubmit={handleSubmit(onSubmit)}
				>
					<Block className={s.main}>
						<EmailInput register={registers.email} errors={errors}>
							Адреса електронної пошти*:
						</EmailInput>
						<PasswordInput
							register={registers.password}
							errors={errors}
							onChange={handlePasswordOnChange}
						>
							Пароль*:
						</PasswordInput>
						<PasswordInput register={registers.confirmPassword} errors={errors}>
							Підтвердження паролю*:
						</PasswordInput>
						<Button
							submit
							disabled={!isValidFixed}
						>
							Створити
						</Button>
					</Block>
					<Typography component="p2" className={s.center}>або</Typography>
					<Block className={s.additional}>
						<Button type="secondary" onClick={handleSignInWithGoogle}>
							<GoogleColorIcon />
							Увійти через Google
						</Button>
						<Typography component="p2">
							Вже є акаунт?
							{' '}
							<Link className="link" to={ROUTES.login}><LinkLabel display="p2">Увійти</LinkLabel></Link>
						</Typography>
					</Block>
				</Form>
				{isLoading && <LoaderOverlay />}
			</Grid>
			{(uid && !isLoading) ? <SignUpSuccessModal onClose={handlerSuccessModal} /> : null}
			{(error && !isLoading) ? <SignUpErrorModal onClose={handlerErrorModal} /> : null}
		</Main>
	);
}
