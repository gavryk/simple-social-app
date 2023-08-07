export interface PostApiTypes {
	posts: IPost[];
}

export type IPost = {
	_id: string;
	userId: string;
	firstName: string;
	lastName: string;
	location: string;
	description: string;
	picturePath: string;
	userPicturePath: string;
	likes: any;
	comments: string[];
};
