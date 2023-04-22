import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';

import { returnError } from '~helpers/returnError';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';

import { storage } from '../firebase';

export interface UploadFile {
	refName: string;
	file: File;
}

export interface UploadFileResponse extends SuccessResponse {
	downloadURL: string;
}

export async function uploadFile({
	refName, file,
}: UploadFile): Promise<UploadFileResponse> {
	const storageRef = ref(storage, refName);
	try {
		await uploadBytesResumable(storageRef, file);
		const downloadURL = await getDownloadURL(storageRef);
		return { downloadURL, status: 'success' };
	} catch (error) {
		throw new Error(returnError(error));
	}
}

// refactor default code
// https://stackoverflow.com/questions/71555134/cant-get-image-url-after-upload-a-file-to-firebase
