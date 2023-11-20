CREATE TABLE `user` (
	`username` text PRIMARY KEY NOT NULL,
	`password` text NOT NULL,
	`singleton` text DEFAULT 'singleton' NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_singleton_unique` ON `user` (`singleton`);