import { getAllTitledColumnsData } from './get/titled/getAllTitledColumnsData';
import { getAllTitledColumnsDataSingle } from './get/titled/getAllTitledColumnsDataSingle';
import { getTitledColumnsDataByIndexes } from './get/titled/getTitledColumnsDataByIndexes';
import { getTitledColumnsDataByTitles } from './get/titled/getTitledColumnsDataByTitles';
import { getAllUntitledColumnsData } from './get/untitled/getAllUntitledColumnsData';
import { getAllUntitledColumnsDataSingle } from './get/untitled/getAllUntitledColumnsDataSingle';
import { getUntitledColumnsDataByIndexes } from './get/untitled/getUntitledColumnsDataByIndexes';
import { postSingleTitledColumnsDataByIndexes } from './post/titled/postSingleTitledColumnsDataByIndexes';
import { postSingleTitledColumnsDataByTitles } from './post/titled/postSingleTitledColumnsDataByTitles';
import { postTitledColumnsDataByIndexes } from './post/titled/postTitledColumnsDataByIndexes';
import { postTitledColumnsDataByTitles } from './post/titled/postTitledColumnsDataByTitles';
import { postTitledUpdate } from './post/titled/postTitledUpdate';
import { postAllUntitledParamsAsOneRow } from './post/untitled/postAllUntitledParamsAsOneRow';
import { postSingleUntitledColumnsDataByIndexes } from './post/untitled/postSingleUntitledColumnsDataByIndexes';
import { postUntitledColumnsDataByIndexes } from './post/untitled/postUntitledColumnsDataByIndexes';
import { postUntitledUpdate } from './post/untitled/postUntitledUpdate';

export const appsscript = {
	getAllTitledColumnsData,
	getTitledColumnsDataByIndexes,
	getTitledColumnsDataByTitles,

	getAllUntitledColumnsData,
	getUntitledColumnsDataByIndexes,

	postTitledColumnsDataByIndexes,
	postSingleTitledColumnsDataByIndexes,
	postSingleTitledColumnsDataByTitles,
	postTitledColumnsDataByTitles,
	postAllUntitledParamsAsOneRow,
	postSingleUntitledColumnsDataByIndexes,
	postUntitledColumnsDataByIndexes,
	postTitledUpdate,
	postUntitledUpdate,
	getAllTitledColumnsDataSingle,
	getAllUntitledColumnsDataSingle,
};
