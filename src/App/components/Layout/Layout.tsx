import { Outlet } from 'react-router-dom';

import { StartScreen } from '~components/StartScreen/StartScreen';

import { Footer } from './Footer/Footer';
import { Header } from './Header/Header';
import { useAppInit } from './hooks/useAppInit';

export function Layout() {
	const { isInit } = useAppInit();

	if (!isInit) return <StartScreen />;

	return (
		<>
			<Header />
			<Outlet />
			<Footer />
			{/* <Snow /> */}
		</>
	);
}
