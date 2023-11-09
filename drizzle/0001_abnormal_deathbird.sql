CREATE TABLE `quote` (
	`id` integer PRIMARY KEY NOT NULL,
	`content` text NOT NULL,
	`source` text NOT NULL,
	`node_id` integer NOT NULL
);
