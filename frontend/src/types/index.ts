export interface IItemData {
	id: number;
	title: string;
	author: string;
	content: string;
	createdAt: number;
	date: string;
	state: number;
}

export interface IAddParams {
	title: string;
	author: string;
	content: string;
	createdAt: number;
	date: string;
}
