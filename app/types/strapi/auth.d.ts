export interface StrapiUser {
	id: number;
	username: string;
	email: string;
	confirmed: boolean;
	blocked: boolean;
	createdAt: string;
	updatedAt: string;
	// Add fields you have in Strapi user schema
}

export interface StrapiAuthResponse {
	jwt: string;
	user: StrapiUser;
}

export interface StrapiErrorResponse {
	error: {
		status: number;
		name: string;
		message: string;
		details?: any;
	};
}
