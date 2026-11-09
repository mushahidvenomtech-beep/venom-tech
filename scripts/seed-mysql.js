const mysql = require("mysql2/promise");
const fs = require("fs");
const path = require("path");

async function seed() {
  const dataPath = path.join(process.cwd(), "data", "blog-db.json");
  const dbData = JSON.parse(fs.readFileSync(dataPath, "utf8"));

  const pool = mysql.createPool({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "",
    database: "venom-tech",
  });

  console.log("Connected to MySQL database 'venom-tech'!");

  // 1. Seed categories
  for (const cat of dbData.categories || []) {
    await pool.query(
      `INSERT INTO blog_categories (id, name, slug, description, color, created_at)
       VALUES (?, ?, ?, ?, ?, NOW())
       ON DUPLICATE KEY UPDATE name=VALUES(name), description=VALUES(description), color=VALUES(color)`,
      [cat.id, cat.name, cat.slug, cat.description || "", cat.color || "#C07DFF"]
    );
  }

  // 2. Seed tags
  for (const tag of dbData.tags || []) {
    await pool.query(
      `INSERT INTO blog_tags (id, name, slug, created_at)
       VALUES (?, ?, ?, NOW())
       ON DUPLICATE KEY UPDATE name=VALUES(name)`,
      [tag.id, tag.name, tag.slug]
    );
  }

  // 3. Seed posts
  for (const post of dbData.posts || []) {
    await pool.query(
      `INSERT INTO blog_posts (
        id, title, slug, excerpt, content_blocks, featured_image, featured_image_alt,
        author_name, author_role, author_avatar, categories, tags, status, views,
        reading_time, published_at, seo_meta_title, seo_meta_description, seo_focus_keyword,
        seo_canonical_url, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
      ON DUPLICATE KEY UPDATE title=VALUES(title), content_blocks=VALUES(content_blocks)`,
      [
        post.id,
        post.title,
        post.slug,
        post.excerpt || "",
        JSON.stringify(post.contentBlocks || []),
        post.featuredImage || "",
        post.featuredImageAlt || "",
        post.author?.name || "Venom Tech Team",
        post.author?.role || "",
        post.author?.avatar || "",
        JSON.stringify(post.categories || []),
        JSON.stringify(post.tags || []),
        post.status || "published",
        post.views || 185,
        post.readingTime || 4,
        post.publishedAt ? new Date(post.publishedAt) : new Date(),
        post.seo?.metaTitle || "",
        post.seo?.metaDescription || "",
        post.seo?.focusKeyword || "",
        post.seo?.canonicalUrl || "",
      ]
    );
  }

  const [posts] = await pool.query("SELECT id, title, slug, status FROM blog_posts");
  const [cats] = await pool.query("SELECT count(*) as count FROM blog_categories");
  const [tags] = await pool.query("SELECT count(*) as count FROM blog_tags");

  console.log("Seeding successful!");
  console.log(`- Categories in DB: ${cats[0].count}`);
  console.log(`- Tags in DB: ${tags[0].count}`);
  console.log(`- Posts in DB: ${posts.length}`);
  console.log("Sample post:", posts[0]);

  await pool.end();
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});

