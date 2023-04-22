import { returnError as returnErr } from '~/ameliance-scripts';
import { APP } from '~constants/APP';

export function returnError(error: unknown): string {
	return returnErr(error, APP.name, true);
}
