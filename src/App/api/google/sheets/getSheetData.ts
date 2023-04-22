import { returnError } from '~helpers/returnError';

import { BASE_GOOGLE_SHEET_URL } from './consts';

interface IGetSheetData {
	sheetId: string;
	tqx?: string;
	pageTitle?: string;
	range?: string;
}

export async function getSheetData({
	sheetId,
	tqx = 'out:json',
	pageTitle = 'sheet',
	range = '',
}: IGetSheetData) {
	const URLParams = new URLSearchParams();
	if (tqx) URLParams.append('tqx', tqx);
	if (pageTitle) URLParams.append('sheet', pageTitle);
	if (range) URLParams.append('range', range);

	try {
		const response = await fetch(`${BASE_GOOGLE_SHEET_URL}${sheetId}/gviz/tq?${URLParams}`);

		const textData = await response.text();
		const data = JSON.parse(textData.substring(47).slice(0, -2));

		return data;
	} catch (error) {
		throw new Error(returnError(error));
	}
}
