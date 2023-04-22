import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';

export function returnSuccess(): SuccessResponse {
	return { status: 'success' };
}
