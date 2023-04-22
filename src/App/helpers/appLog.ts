import { APP } from '~constants/APP';

export function appLog(...log: unknown[]) {
	// eslint-disable-next-line no-console
	console.log(`${APP.name} >`, ...log);
}
