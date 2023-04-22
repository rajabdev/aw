export type DataUntitledResponse = {
	position: string;
	value: string;
}[][];

export interface DataTitledValuesItem {
	position: string;
	value: string;
}

export type DataTitledValues = DataTitledValuesItem[] | null;

export type DataTitledResponse = Record<string, {
	colNumber: number;
	values: DataTitledValues;
}>;

export type GetTypes =
	| 'TITLED'
	| 'TITLED_SINGLE'
	| 'UNTITLED'
	| 'UNTITLED_SINGLE';

export interface DoGet {
	spreadsheetId: string;
	sheetName?: string;
	sheetIndex?: number;
	columnTitles?: string[];
	columnIndexes?: number[];
	type: GetTypes;
}

export type PostTypes =
	| 'TITLED'
	| 'TITLED_SINGLE'
	| 'TITLED_UPDATE'
	| 'UNTITLED'
	| 'UNTITLED_SINGLE'
	| 'UNTITLED_ONE_ROW'
	| 'UNTITLED_UPDATE';

export interface DoPost {
	spreadsheetId: string;
	sheetName?: string;
	sheetIndex?: number;
	titlesParams?: Record<string, unknown>;
	indexesParams?: Record<number, unknown>;
	type: PostTypes;
	col?: number;
	row?: number;
	value?: number | string;
}

export interface Response {
	status: 'success' | 'partial' | 'error';
	data: DataUntitledResponse | DataTitledResponse;
	info: {
		spreadsheetId: string;
		sheetName?: string;
		sheetIndex?: number;
		columnTitles?: string[];
		columnIndexes?: number[];
		type: GetTypes | PostTypes;

		titles?: string[];
		found?: string[];
		missed?: string[];
		rowsCount?: number;
		columnsCount?: number;
		columns?: string[];
	};
	error?: string;
}
