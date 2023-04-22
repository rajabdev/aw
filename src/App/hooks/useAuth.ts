import { useTypedSelector } from '~store/hooks/useTypedSelector';

export function useAuth() {
	const { email, status, sex } = useTypedSelector((state) => state.userReducer);
	return {
		isAuth: !!email,
		isOwner: status === 'owner',
		isAdmin: status === 'admin',
		isUser: status === 'user',
		isFillProfile: sex,
	};
}
