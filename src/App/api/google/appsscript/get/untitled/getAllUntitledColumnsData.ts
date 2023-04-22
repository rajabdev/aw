import { returnError } from '~helpers/returnError';

import { doGet } from '../../base/doGet';
import type { DataUntitledResponse } from '../../types/types';

export interface GetAllUntitledColumnsData {
	spreadsheetId: string;
	sheetIndex?: number;
	sheetName?: string;
}

export interface GetAllUntitledColumnsDataResponse {
	status: 'success' | 'error';
	data: DataUntitledResponse;
	info: {
		spreadsheetId: string;
		sheetName?: string;
		sheetIndex?: number;
		type: 'UNTITLED';
		rowCounts: string[];
		columnsCount: number;
	};
	error?: string;
}

export async function getAllUntitledColumnsData({
	spreadsheetId, sheetIndex, sheetName,
}: GetAllUntitledColumnsData): Promise<GetAllUntitledColumnsDataResponse> {
	try {
		const response = await doGet({
			spreadsheetId, sheetIndex, sheetName, type: 'UNTITLED',
		});
		return response as GetAllUntitledColumnsDataResponse;
	} catch (error) {
		throw new Error(returnError(error));
	}
}
