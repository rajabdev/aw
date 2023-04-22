import { returnError } from '~helpers/returnError';

import { doGet } from '../../base/doGet';
import type { DataTitledResponse } from '../../types/types';

export interface GetTitledColumnsDataByTitles {
	spreadsheetId: string;
	sheetIndex?: number;
	sheetName?: string;
	columnTitles: string[];
}

export interface GetTitledColumnsDataByTitlesResponse {
	status: 'success' | 'partial' | 'error';
	data: DataTitledResponse;
	info: {
		spreadsheetId: string;
		sheetName?: string;
		sheetIndex?: number;
		titles: string[];
		rowsCount: number;
		columnsCount: number;
		type: 'TITLED';

		columnTitles: string[];

		found?: string[];
		missed?: string[];
	};
	error?: string;
}

export async function getTitledColumnsDataByTitles({
	spreadsheetId, sheetIndex, sheetName, columnTitles,
}: GetTitledColumnsDataByTitles): Promise<GetTitledColumnsDataByTitlesResponse> {
	try {
		const response = await doGet({
			spreadsheetId, sheetIndex, sheetName, columnTitles, type: 'TITLED',
		});
		return response as GetTitledColumnsDataByTitlesResponse;
	} catch (error) {
		throw new Error(returnError(error));
	}
}
