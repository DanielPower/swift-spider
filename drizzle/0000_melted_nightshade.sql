CREATE TABLE `task` (
	`id` integer PRIMARY KEY NOT NULL,
	`content` text NOT NULL,
	`status` text DEFAULT 'todo' NOT NULL
);
