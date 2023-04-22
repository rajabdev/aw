export function returnError(error: unknown, appName?: string, hasWrapper?: boolean): string {
	const errorCount = hasWrapper ? 3 : 2;

	let message = 'Sorry, something went wrong ¯\\_(ツ)_/¯!';
	if (error) {
		if (typeof error === 'string') message = error;
		if (error instanceof Error) message = error.message;
	}
	if (appName) {
		// eslint-disable-next-line no-console
		console.error(`${appName} >`, `${message}\n`, new Error().stack?.split('\n')[errorCount]);
	} else {
		// eslint-disable-next-line no-console
		console.error(`${message}\n`, new Error().stack?.split('\n')[errorCount]);
	}
	return message;
}
