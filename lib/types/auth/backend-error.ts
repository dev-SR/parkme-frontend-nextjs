export type BackendErrorType = {
	status: number;
	message: string;
	errors: Record<string, string[]>;
};
