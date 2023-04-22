import asm from 'asm-ts-scripts';
import type { DocumentData } from 'firebase/firestore';
import { collection, getDocs } from 'firebase/firestore';

import { returnError } from '~helpers/returnError';
import type { SuccessResponse } from '~types/api/google/firebase/commons/SuccessResponse';

import { db } from '../../firebase';

type Groups = Record<string, DocumentData>;

export interface GetAllGroupsResponse extends SuccessResponse {
	groups: Groups;
}

export async function getAllGroups(): Promise<GetAllGroupsResponse> {
	const groupsRef = collection(db, 'groups');

	try {
		const docSnap = await getDocs(groupsRef);
		const groups: Groups = {};
		docSnap.forEach((doc) => {
			groups[doc.id] = doc.data();
		});
		if (!asm.isObjectEmpty(groups)) return { groups, status: 'success' };

		throw new Error('Can\'t find any groups!');
	} catch (error) {
		throw new Error(returnError(error));
	}
}
