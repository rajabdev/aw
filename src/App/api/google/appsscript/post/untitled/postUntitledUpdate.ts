import { returnError } from '~helpers/returnError';

import { doPost } from '../../base/doPost';
import type { DataUntitledResponse } from '../../types/types';

export interface PostUntitledUpdate {
	spreadsheetId: string;
	sheetIndex?: number;
	sheetName?: string;
	col: number;
	row: number;
	value: number | string;

}

export interface PostUntitledUpdateResponse {
	status: 'success' | 'partial' | 'error';
	data: DataUntitledResponse;
	info: {
		spreadsheetId: string;
		sheetName?: string;
		sheetIndex?: number;
		type: 'UNTITLED_UPDATE';
		indexesParams: Record<number, unknown>;
		length: string[];
		columnsCount: number;
	};
	error?: string;
}

export async function postUntitledUpdate({
	spreadsheetId, sheetIndex, sheetName, col, row, value,
}: PostUntitledUpdate): Promise<PostUntitledUpdateResponse> {
	try {
		const response = await doPost({
			spreadsheetId, sheetIndex, sheetName, col, row, value, type: 'UNTITLED_UPDATE',
		});
		return response as PostUntitledUpdateResponse;
	} catch (error) {
		throw new Error(returnError(error));
	}
}
