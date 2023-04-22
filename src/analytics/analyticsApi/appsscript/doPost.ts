import { baseURL } from './baseURL';
import type { DoPost, Response } from './types';

export function apiError(errorPath: string, error: unknown) {
	// eslint-disable-next-line no-console
	console.error('analyticsAPI', `${errorPath}:`, error);
}

export function apiLog(...log: unknown[]) {
	// eslint-disable-next-line no-console
	console.log('analyticsAPI', ...log);
}

export async function doPost({
	spreadsheetId, sheetName, sheetIndex, titlesParams, indexesParams, type, col, row, value,
}: DoPost) {
	const URLParams = new URLSearchParams();
	if (spreadsheetId) URLParams.append('spreadsheetId', spreadsheetId);
	if (sheetName) URLParams.append('sheetName', sheetName);
	if (sheetIndex) URLParams.append('sheetIndex', sheetIndex.toString());
	if (titlesParams) URLParams.append('titlesParams', JSON.stringify(titlesParams));
	if (indexesParams) URLParams.append('indexesParams', JSON.stringify(indexesParams));
	if (type) URLParams.append('type', type);
	if (col) URLParams.append('col', col.toString());
	if (row) URLParams.append('row', row.toString());
	if (value) URLParams.append('value', value.toString());

	return fetch(`${baseURL}?${URLParams}`, { method: 'POST' })
		.then((response) => response.text())
		.then((textData) => JSON.parse(textData))
		.then((data: Response) => {
			if (data.status !== 'success') {
				// eslint-disable-next-line no-console
				apiLog('doPost', data.status);
				// eslint-disable-next-line no-console
				apiLog('doPost', data.info);
				// eslint-disable-next-line no-console
				apiLog('doPost', data.error);
			}
			return data;
		})
		// eslint-disable-next-line no-console
		.catch((error) => apiError('doPost', error));
}
