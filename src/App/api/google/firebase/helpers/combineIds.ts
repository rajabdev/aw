type CombineIds = string[];

type CombineIdsReturn = string;

export function combineIds(...ids: CombineIds): CombineIdsReturn {
	return ids.sort().join('-');
}
