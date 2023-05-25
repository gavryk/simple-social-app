import { IAuthTypes } from './authTypes';

export interface UserApiTypes {
	users: IAuthTypes[];
	totalPage: number;
}
