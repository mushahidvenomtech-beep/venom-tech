CREATE TABLE `blog_categories` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`description` text,
	`color` varchar(30) DEFAULT '#C07DFF',
	`created_at` datetime NOT NULL,
	CONSTRAINT `blog_categories_id` PRIMARY KEY(`id`),
	CONSTRAINT `blog_categories_name_unique` UNIQUE(`name`),
	CONSTRAINT `blog_categories_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `blog_media` (
	`id` varchar(36) NOT NULL,
	`url` mediumtext NOT NULL,
	`filename` varchar(255) NOT NULL,
	`title` varchar(255) NOT NULL,
	`alt` varchar(255) NOT NULL DEFAULT '',
	`caption` text,
	`size` varchar(50),
	`mime_type` varchar(100),
	`dimensions` varchar(50),
	`uploaded_at` datetime NOT NULL,
	CONSTRAINT `blog_media_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `blog_posts` (
	`id` varchar(36) NOT NULL,
	`title` varchar(255) NOT NULL,
	`slug` varchar(255) NOT NULL,
	`excerpt` text,
	`content_blocks` json NOT NULL,
	`featured_image` mediumtext,
	`featured_image_alt` varchar(255),
	`featured_image_caption` varchar(512),
	`author_name` varchar(100) NOT NULL DEFAULT 'Venom Tech Team',
	`author_role` varchar(100),
	`author_avatar` varchar(512),
	`categories` json NOT NULL,
	`tags` json NOT NULL,
	`status` enum('draft','review','scheduled','published','archived') NOT NULL DEFAULT 'draft',
	`views` int NOT NULL DEFAULT 0,
	`reading_time` int NOT NULL DEFAULT 3,
	`published_at` datetime,
	`scheduled_for` datetime,
	`seo_meta_title` varchar(255),
	`seo_meta_description` text,
	`seo_focus_keyword` varchar(100),
	`seo_canonical_url` varchar(512),
	`seo_og_image` varchar(512),
	`seo_no_index` boolean NOT NULL DEFAULT false,
	`seo_no_follow` boolean NOT NULL DEFAULT false,
	`meta` json,
	`created_at` datetime NOT NULL,
	`updated_at` datetime NOT NULL,
	CONSTRAINT `blog_posts_id` PRIMARY KEY(`id`),
	CONSTRAINT `blog_posts_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE TABLE `blog_tags` (
	`id` varchar(36) NOT NULL,
	`name` varchar(100) NOT NULL,
	`slug` varchar(100) NOT NULL,
	`created_at` datetime NOT NULL,
	CONSTRAINT `blog_tags_id` PRIMARY KEY(`id`),
	CONSTRAINT `blog_tags_name_unique` UNIQUE(`name`),
	CONSTRAINT `blog_tags_slug_unique` UNIQUE(`slug`)
);
--> statement-breakpoint
CREATE INDEX `idx_categories_slug` ON `blog_categories` (`slug`);--> statement-breakpoint
CREATE INDEX `idx_media_filename` ON `blog_media` (`filename`);--> statement-breakpoint
CREATE INDEX `idx_posts_slug` ON `blog_posts` (`slug`);--> statement-breakpoint
CREATE INDEX `idx_posts_status` ON `blog_posts` (`status`);--> statement-breakpoint
CREATE INDEX `idx_posts_published_at` ON `blog_posts` (`published_at`);--> statement-breakpoint
CREATE INDEX `idx_tags_slug` ON `blog_tags` (`slug`);