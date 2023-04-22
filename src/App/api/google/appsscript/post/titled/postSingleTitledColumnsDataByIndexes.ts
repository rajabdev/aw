import { returnError } from '~helpers/returnError';

import { doPost } from '../../base/doPost';
import type { DataTitledResponse } from '../../types/types';

export interface PostSingleTitledColumnsDataByIndexes {
	spreadsheetId: string;
	sheetIndex?: number;
	sheetName?: string;
	indexesParams: Record<number, unknown>;
}

export interface PostSingleTitledColumnsDataByIndexesResponse {
	status: 'success' | 'partial' | 'error';
	data: DataTitledResponse;
	info: {
		spreadsheetId: string;
		sheetName?: string;
		sheetIndex?: number;
		titles: string[];
		rowsCount: number;
		columnsCount: number;
		type: 'TITLED_SINGLE';

		columnTitles: string[];

		found?: string[];
		missed?: string[];
	};
	error?: string;
}

export async function postSingleTitledColumnsDataByIndexes({
	spreadsheetId, sheetIndex, sheetName, indexesParams,
}: PostSingleTitledColumnsDataByIndexes): Promise<PostSingleTitledColumnsDataByIndexesResponse> {
	try {
		const response = await doPost({
			spreadsheetId, sheetIndex, sheetName, indexesParams, type: 'TITLED_SINGLE',
		});
		return response as PostSingleTitledColumnsDataByIndexesResponse;
	} catch (error) {
		throw new Error(returnError(error));
	}
}
