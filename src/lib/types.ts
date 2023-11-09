export type Note = {
	id: number;
	content: string;
	createdAt: string;
	type: "note";
};

export type Task = {
	id: number;
	content: string;
	status: "todo" | "done";
	createdAt: string;
	type: "task";
};

export type Quote = {
	id: number;
	content: string;
	source: string;
	type: "quote";
};
