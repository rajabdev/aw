import type { IGoogleSheetsData, Row } from '../interfaces/IGoogleSheetsData';

export function convertDataFromOneColumnSheet(data: IGoogleSheetsData) {
	return data.table.rows.map((row: Row) => row.c.at(0)?.v);
}
