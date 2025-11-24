import type { Tag } from './courses';

export interface StrapiUser {
	id: number;
	username: string;
	email: string;
	confirmed: boolean;
	blocked: boolean;
	createdAt: string;
	updatedAt: string;
	tags: Tag[];
}

export interface StrapiAuthResponse {
	jwt: string;
	user: StrapiUser;
}

export interface StrapiErrorResponse {
	data: null;
	error: {
		status: number;
		name: string;
		message: string;
		details?: any;
	};
}
