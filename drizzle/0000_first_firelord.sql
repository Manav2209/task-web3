CREATE TABLE `public_events` (
	`id` varchar(36) NOT NULL,
	`title` varchar(255) NOT NULL,
	`description` text,
	`cover_image_url` varchar(512),
	`location` varchar(255) NOT NULL,
	`status` enum('DRAFT','PUBLISHED','CANCELED') NOT NULL DEFAULT 'DRAFT',
	`metadata` json,
	`start_date` datetime NOT NULL,
	`end_date` datetime NOT NULL,
	`created_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	`updated_at` datetime(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
	CONSTRAINT `public_events_id` PRIMARY KEY(`id`)
);
