import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { isObjectEmpty } from '~/ameliance-scripts';
import { PRIVATE_ROUTES } from '~constants/ROUTES';
import { useTypedDispatch } from '~store/hooks/useTypedDispatch';
import { useTypedSelector } from '~store/hooks/useTypedSelector';
import { updateUser } from '~store/user/actions/updateUser';
import { userSlice } from '~store/user/userSlice';

import { LoaderOverlay } from '~/ameliance-ui/components/_LAB/LoaderOverlay';
import { Block } from '~/ameliance-ui/components/blocks';
import { Button } from '~/ameliance-ui/components/Button';
import { Form } from '~/ameliance-ui/components/Form';
import { Grid } from '~/ameliance-ui/components/Grid';
import { FileImgUpload, RadioButton, TextInput } from '~/ameliance-ui/components/Inputs';
import { Typography } from '~/ameliance-ui/components/Typography';

import { UserPageErrorModal } from './UserPageErrorModal';
import { UserPageSuccessModal } from './UserPageSuccessModal';

import s from './UserPage.module.scss';

interface FormFields {
	userName: string;
	profileImage: FileList | string;
	role: string;
	sex: string;
}

const SEXES = {
	male: 'Хлопчик',
	female: 'Дівчинка',
};

export function UserPage() {
	const [isSubmit, setIsSubmit] = useState(false);

	const dispatch = useTypedDispatch();
	const { actions } = userSlice;

	const {
		uid,
		displayName,
		photoURL,
		sex: userSex,
		role: userRole,
		isLoading,
		error,
	} = useTypedSelector((state) => state.userReducer);

	const userSexKey = userSex !== '' ? userSex : 'male';

	const {
		register,
		handleSubmit,
		watch,
		formState: { errors },
	} = useForm<FormFields>({
		mode: 'onSubmit',
		defaultValues: {
			userName: displayName,
			profileImage: photoURL,
			role: userRole,
			sex: SEXES[userSexKey],
		},
	});

	const isValidFixed = isObjectEmpty(errors); //* fix isValid default has false

	const registers = {
		userName: register('userName', {
			required: 'Поле таке пусте! Введіть більше символів!',
			pattern: { value: /^[\sа-яА-ЯёЁъЪїЇіІєЄґҐa-zA-Z_]+$/, message: 'Використовуйте тільки літери, пробіл або нижнє підкреслення!' },
			minLength: { value: 2, message: 'Мінімальна довжина логіну 2 символів' },
			maxLength: { value: 32, message: 'Максимальна довжина логіну 32 символів' },
		}),
		profileImage: register('profileImage', {
			validate: (value: FormFields['profileImage']) => {
				if (value && (typeof value === 'string'
					|| (typeof value !== 'string' && !isObjectEmpty(value)))) {
					return true;
				}
				return 'Будь ласка, оберіть зображення!';
			},
		}),
		role: register('role', {
			required: 'Поле таке пусте! Введіть більше символів!',
			minLength: { value: 2, message: 'Мінімальна довжина логіну 2 символів' },
			maxLength: { value: 32, message: 'Максимальна довжина логіну 32 символів' },
		}),
		sex: register('sex', { required: 'Оберіть стать!' }),
	};

	const onSubmit: SubmitHandler<FormFields> = async ({
		userName, profileImage, role, sex,
	}: FormFields) => {
		const newSex = sex === SEXES.male ? 'male' : 'female';

		dispatch(updateUser({
			uid,
			displayName: userName !== displayName ? userName : undefined,
			photo: typeof profileImage !== 'string' ? profileImage[0] : undefined,
			role: role !== userRole ? role : undefined,
			sex: newSex !== userSex ? newSex : undefined,
		}));
		setIsSubmit(true);
	};

	const navigate = useNavigate();

	const handlerSuccessModal = () => {
		navigate(PRIVATE_ROUTES.users);
	};

	const handlerErrorModal = () => {
		dispatch(actions.resetError());
	};

	return (
		<Block component="main" className={s.UserPage}>
			<Grid container component="section" className={s.container}>
				<Typography component="h4">Редагування профілю</Typography>
				<Form
					className={s.form}
					onSubmit={handleSubmit(onSubmit)}
				>
					<FileImgUpload
						watch={watch}
						register={registers.profileImage}
						errors={errors}
						accept=".jpg, .jpeg, .png"
						label="Оберіть зображення"
					>
						Зображення профілю:
					</FileImgUpload>
					<TextInput register={registers.userName} errors={errors}>
						Логін*:
					</TextInput>
					<TextInput register={registers.role} errors={errors}>
						Роль*:
						<Typography component="caption">(наприклад: Майстер мікрофону, Басист)</Typography>
					</TextInput>
					<RadioButton
						labels={Object.values(SEXES)}
						register={registers.sex}
						errors={errors}
					>
						Стать*:
					</RadioButton>
					<Button
						submit
						disabled={!isValidFixed}
					>
						Оновити дані
					</Button>
				</Form>
			</Grid>
			{isLoading && <LoaderOverlay />}
			{(isSubmit && !isLoading) && <UserPageSuccessModal onClose={handlerSuccessModal} />}
			{(error && !isLoading) ? <UserPageErrorModal onClose={handlerErrorModal} /> : null}

		</Block>
	);
}
