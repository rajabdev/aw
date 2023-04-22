import { APP } from '~constants/APP';

export function appError(errorPath: string, error: unknown) {
	// eslint-disable-next-line no-console
	console.error(`${APP.name} >`, `${errorPath}:`, error);
}
