import type { User } from './User';

export interface UserResponse {
	uid: string;
	users: Omit<User, 'uid'>[];
}
