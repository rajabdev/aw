import type { User } from './User';

export interface ChatInfo {
	chatId: string;
	displayName: string;
	photoURL: string;
	lastText: string;
	date: string;
	color: string;
	ownerId: string;
	admins: User[];
	type: 'group' | 'contact' | 'channel';
}
