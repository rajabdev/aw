import { Provider } from 'react-redux';

import { PersistGate } from 'redux-persist/integration/react';

import { AppRouter } from '~components/AppRouter/AppRouter';
import { persistor, store } from '~store/store';

import { ToastBarProvider } from '~/ameliance-ui/components/_LAB/toastbar';

export function App() {
	return (
		<Provider store={store}>
			<ToastBarProvider maxToast={5}>
				<PersistGate loading={null} persistor={persistor}>
					<AppRouter />
				</PersistGate>
			</ToastBarProvider>
		</Provider>
	);
}
