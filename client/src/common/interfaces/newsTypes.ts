export interface INews {
	author: string;
	content: string;
	description: string;
	publishedAt: string;
	source: INewsSource;
	title: string;
	url: string;
	urlToImage: string;
}

export type INewsSource = {
	id: string;
	name: string;
};
