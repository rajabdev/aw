import { doPost } from './doPost';
import type { DataTitledResponse } from './types';

export interface PostTitledColumnsDataByTitles {
	spreadsheetId: string;
	sheetIndex?: number;
	sheetName?: string;
	titlesParams: Record<string, unknown>;
}

export interface PostTitledColumnsDataByTitlesResponse {
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

export async function postTitledColumnsDataByTitles({
	spreadsheetId, sheetIndex, sheetName, titlesParams,
}: PostTitledColumnsDataByTitles) {
	return doPost({
		spreadsheetId, sheetIndex, sheetName, titlesParams, type: 'TITLED',
	}).then((data) => data as PostTitledColumnsDataByTitlesResponse);
}
