export interface IRegisterTypes {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	picturePath: string;
	friends: any[];
	location: string;
	occupation: string;
	viewedProfile?: number;
	impressions?: number;
}

export interface ILoginTypes {
	email: string;
	password: string;
}

export interface IAuthTypes extends Omit<IRegisterTypes, 'password'> {}
export interface IRegisterFormTypes
	extends Omit<IRegisterTypes, 'friends' | 'viewedProfile' | 'impressions'> {}

export interface IAuthSliceTypes {
	auth: IAuthTypes | null;
}
