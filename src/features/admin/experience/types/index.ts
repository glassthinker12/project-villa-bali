export type Experience = {
	id: string;
	title: string;
	description?: string | null;
	bgImageUrl: string;
	innerImageUrl: string;
	createdAt: string;
	updatedAt: string;
};

export type CreateExperienceInput = {
	title: string;
	description?: string | null;
	bgImageUrl: string;
	innerImageUrl: string;
};

export type UpdateExperienceInput = {
	id: string;
	title: string;
	description?: string | null;
	bgImageUrl: string;
	innerImageUrl: string;
};
