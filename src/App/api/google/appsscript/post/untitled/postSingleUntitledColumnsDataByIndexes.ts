import { returnError } from '~helpers/returnError';

import { doPost } from '../../base/doPost';
import type { DataUntitledResponse } from '../../types/types';

export interface PostSingleUntitledColumnsDataByIndexes {
	spreadsheetId: string;
	sheetIndex?: number;
	sheetName?: string;
	indexesParams: Record<number, unknown>;
}

export interface PostSingleUntitledColumnsDataByIndexesResponse {
	status: 'success' | 'partial' | 'error';
	data: DataUntitledResponse;
	info: {
		spreadsheetId: string;
		sheetName?: string;
		sheetIndex?: number;
		type: 'UNTITLED_SINGLE';
		indexesParams: Record<number, unknown>;
		length: string[];
		columnsCount: number;
	};
	error?: string;
}

export async function postSingleUntitledColumnsDataByIndexes({
	spreadsheetId, sheetIndex, sheetName, indexesParams,
}: PostSingleUntitledColumnsDataByIndexes):
	Promise<PostSingleUntitledColumnsDataByIndexesResponse> {
	try {
		const response = await doPost({
			spreadsheetId, sheetIndex, sheetName, indexesParams, 	type: 'UNTITLED_SINGLE',
		});
		return response as PostSingleUntitledColumnsDataByIndexesResponse;
	} catch (error) {
		throw new Error(returnError(error));
	}
}
