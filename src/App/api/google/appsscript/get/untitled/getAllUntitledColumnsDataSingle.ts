import { returnError } from '~helpers/returnError';

import { doGet } from '../../base/doGet';
import type { DataUntitledResponse } from '../../types/types';

export interface GetAllUntitledColumnsDataSingle {
	spreadsheetId: string;
	sheetIndex?: number;
	sheetName?: string;
}

export interface GetAllUntitledColumnsDataSingleResponse {
	status: 'success' | 'error';
	data: DataUntitledResponse;
	info: {
		spreadsheetId: string;
		sheetName?: string;
		sheetIndex?: number;
		type: 'UNTITLED_SINGLE';
		rowCounts: string[];
		columnsCount: number;
	};
	error?: string;
}

export async function getAllUntitledColumnsDataSingle({
	spreadsheetId, sheetIndex, sheetName,
}: GetAllUntitledColumnsDataSingle): Promise<GetAllUntitledColumnsDataSingleResponse> {
	try {
		const response = await doGet({
			spreadsheetId, sheetIndex, sheetName, type: 'UNTITLED_SINGLE',
		});
		return response as GetAllUntitledColumnsDataSingleResponse;
	} catch (error) {
		throw new Error(returnError(error));
	}
}
