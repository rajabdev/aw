import { returnError } from '~helpers/returnError';

import { doPost } from '../../base/doPost';
import type { DataTitledResponse } from '../../types/types';

export interface PostTitledColumnsDataByIndexes {
	spreadsheetId: string;
	sheetIndex?: number;
	sheetName?: string;
	indexesParams: Record<number, unknown>;
}

export interface PostTitledColumnsDataByIndexesResponse {
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

export async function postTitledColumnsDataByIndexes({
	spreadsheetId, sheetIndex, sheetName, indexesParams,
}: PostTitledColumnsDataByIndexes): Promise<PostTitledColumnsDataByIndexesResponse> {
	try {
		const response = await doPost({
			spreadsheetId, sheetIndex, sheetName, indexesParams, type: 'TITLED',
		});
		return response as PostTitledColumnsDataByIndexesResponse;
	} catch (error) {
		throw new Error(returnError(error));
	}
}
