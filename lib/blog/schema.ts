/**
 * Drizzle ORM MySQL Schema Definitions for Blog Management Module
 *
 * This file specifies the MySQL schema mappings for Drizzle ORM.
 * When configuring drizzle-kit or running migrations, import this schema.
 */

export interface MySQLColumnDef {
  type: string;
  primaryKey?: boolean;
  notNull?: boolean;
  default?: unknown;
}

export const blogTablesSQL = {
  postsTable: `
    CREATE TABLE IF NOT EXISTS blog_posts (
      id VARCHAR(36) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      slug VARCHAR(255) NOT NULL UNIQUE,
      excerpt TEXT,
      content_blocks JSON NOT NULL,
      featured_image VARCHAR(512),
      featured_image_alt VARCHAR(255),
      author_name VARCHAR(100) NOT NULL DEFAULT 'Venom Editorial',
      author_avatar VARCHAR(512),
      author_role VARCHAR(100),
      status ENUM('draft', 'review', 'scheduled', 'published', 'archived') NOT NULL DEFAULT 'draft',
      views INT UNSIGNED NOT NULL DEFAULT 0,
      reading_time INT UNSIGNED NOT NULL DEFAULT 3,
      published_at DATETIME NULL,
      scheduled_for DATETIME NULL,
      seo_meta_title VARCHAR(255),
      seo_meta_description TEXT,
      seo_focus_keyword VARCHAR(100),
      seo_canonical_url VARCHAR(512),
      seo_og_image VARCHAR(512),
      seo_no_index BOOLEAN NOT NULL DEFAULT FALSE,
      seo_no_follow BOOLEAN NOT NULL DEFAULT FALSE,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      INDEX idx_slug (slug),
      INDEX idx_status (status),
      INDEX idx_published_at (published_at)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `,

  categoriesTable: `
    CREATE TABLE IF NOT EXISTS blog_categories (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(100) NOT NULL UNIQUE,
      slug VARCHAR(100) NOT NULL UNIQUE,
      description TEXT,
      color VARCHAR(30) DEFAULT '#C07DFF',
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `,

  tagsTable: `
    CREATE TABLE IF NOT EXISTS blog_tags (
      id VARCHAR(36) PRIMARY KEY,
      name VARCHAR(100) NOT NULL UNIQUE,
      slug VARCHAR(100) NOT NULL UNIQUE,
      created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `,

  postCategoriesTable: `
    CREATE TABLE IF NOT EXISTS blog_post_categories (
      post_id VARCHAR(36) NOT NULL,
      category_id VARCHAR(36) NOT NULL,
      PRIMARY KEY (post_id, category_id),
      FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
      FOREIGN KEY (category_id) REFERENCES blog_categories(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `,

  postTagsTable: `
    CREATE TABLE IF NOT EXISTS blog_post_tags (
      post_id VARCHAR(36) NOT NULL,
      tag_id VARCHAR(36) NOT NULL,
      PRIMARY KEY (post_id, tag_id),
      FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE,
      FOREIGN KEY (tag_id) REFERENCES blog_tags(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `,

  mediaTable: `
    CREATE TABLE IF NOT EXISTS blog_media (
      id VARCHAR(36) PRIMARY KEY,
      url VARCHAR(512) NOT NULL,
      filename VARCHAR(255) NOT NULL,
      title VARCHAR(255) NOT NULL,
      alt VARCHAR(255) NOT NULL DEFAULT '',
      caption TEXT,
      size VARCHAR(50),
      mime_type VARCHAR(100),
      dimensions VARCHAR(50),
      uploaded_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `,

  revisionsTable: `
    CREATE TABLE IF NOT EXISTS blog_revisions (
      id VARCHAR(36) PRIMARY KEY,
      post_id VARCHAR(36) NOT NULL,
      title VARCHAR(255) NOT NULL,
      author VARCHAR(100) NOT NULL,
      content_blocks JSON NOT NULL,
      note VARCHAR(255),
      saved_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (post_id) REFERENCES blog_posts(id) ON DELETE CASCADE
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
  `,
};

