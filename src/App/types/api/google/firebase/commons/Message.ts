import type { User } from './User';

export interface Message {
	messageId: string;
	text: string;
	chatId: string;
	date: string;
	user: User;
}
