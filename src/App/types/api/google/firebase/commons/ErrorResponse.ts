import type { AuthError } from 'firebase/auth';

export interface ErrorResponse {
	error: AuthError | string | unknown;
	status: 'error';
}
