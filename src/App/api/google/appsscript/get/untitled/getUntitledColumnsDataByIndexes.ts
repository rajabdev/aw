import { returnError } from '~helpers/returnError';

import { doGet } from '../../base/doGet';
import type { DataUntitledResponse } from '../../types/types';

export interface GetUntitledColumnsDataByIndexes {
	spreadsheetId: string;
	sheetIndex?: number;
	sheetName?: string;
	columnIndexes: number[];
}

export interface GetUntitledColumnsDataByIndexesResponse {
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

export async function getUntitledColumnsDataByIndexes({
	spreadsheetId, sheetIndex, sheetName, columnIndexes,
}: GetUntitledColumnsDataByIndexes): Promise<GetUntitledColumnsDataByIndexesResponse> {
	try {
		const response = doGet({
			spreadsheetId, sheetIndex, sheetName, columnIndexes, type: 'UNTITLED',
		});
		return response as unknown as GetUntitledColumnsDataByIndexesResponse;
	} catch (error) {
		throw new Error(returnError(error));
	}
}
