CREATE TABLE `node` (
	`id` integer PRIMARY KEY NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`type` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `note` (
	`id` integer PRIMARY KEY NOT NULL,
	`content` text NOT NULL,
	`node_id` integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE `task` (
	`id` integer PRIMARY KEY NOT NULL,
	`content` text NOT NULL,
	`status` text DEFAULT 'todo' NOT NULL,
	`node_id` integer NOT NULL
);
--> statement-breakpoint
CREATE INDEX `created_at_idx` ON `node` (`created_at`);