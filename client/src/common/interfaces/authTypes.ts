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
	social?: SocialMedia[];
}

export type SocialMedia = {
	name: string;
	link: string;
};

export interface ILoginTypes {
	email: string;
	password: string;
}

export interface IAuthTypes extends Omit<IRegisterTypes, 'password'> {
	_id: string;
}
export interface IRegisterFormTypes
	extends Omit<IRegisterTypes, 'friends' | 'viewedProfile' | 'impressions'> {}

export interface IAuthSliceTypes {
	user: IAuthTypes | null;
}

export interface IUpdateUserProps
	extends Pick<IRegisterTypes, 'firstName' | 'lastName' | 'email' | 'location' | 'occupation'> {}
