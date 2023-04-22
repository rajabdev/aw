import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from '~app/App';

import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';

import './index.scss';

const container = document.getElementById('root') as HTMLElement;
const root = createRoot(container);

root.render(
	// <StrictMode>
	<App />,
	// </StrictMode>,
);
