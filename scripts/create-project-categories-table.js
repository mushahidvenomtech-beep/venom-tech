const mysql = require('mysql2/promise');

async function main() {
  console.log('Connecting to MySQL (127.0.0.1:3306, venom-tech)...');
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'venom-tech',
    port: 3306,
  });

  const sql = `
    CREATE TABLE IF NOT EXISTS \`project_categories\` (
      \`id\` varchar(36) NOT NULL,
      \`name\` varchar(100) NOT NULL UNIQUE,
      \`slug\` varchar(100) NOT NULL UNIQUE,
      \`description\` text,
      \`color\` varchar(30) DEFAULT '#3BC8F6',
      \`display_order\` int NOT NULL DEFAULT 0,
      \`created_at\` datetime NOT NULL,
      PRIMARY KEY (\`id\`),
      INDEX \`idx_project_categories_slug\` (\`slug\`),
      INDEX \`idx_project_categories_display_order\` (\`display_order\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  await conn.query(sql);
  console.log('✓ Table `project_categories` created successfully or already exists!');

  // Check count
  const [rows] = await conn.query('SELECT COUNT(*) as count FROM `project_categories`');
  if (rows[0].count === 0) {
    console.log('Seeding initial project categories...');
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const initialCategories = [
      ['cat-web-design', 'Web Design', 'web-design', 'Custom bespoke websites, high-performance web applications, and landing pages', '#C07DFF', 1, now],
      ['cat-branding', 'Branding', 'branding', 'Brand identities, visual systems, guidelines, and physical & digital packaging', '#3BC8F6', 2, now],
      ['cat-development', 'Development', 'development', 'Full-stack engineering, interactive 3D WebGL platforms, and cloud backends', '#F59E0B', 3, now],
      ['cat-ai-automation', 'AI Automation', 'ai-automation', 'Autonomous agents, workflow orchestration, and generative intelligence', '#10B981', 4, now],
      ['cat-app-dev', 'App Development', 'app-development', 'Cross-platform mobile apps for iOS and Android built on React Native & Flutter', '#EC4899', 5, now],
      ['cat-seo', 'SEO Services', 'seo-services', 'Algorithmic search dominance, semantic indexation, and technical site performance', '#8B5CF6', 6, now],
    ];

    const insertSql = `
      INSERT INTO \`project_categories\` 
      (id, name, slug, description, color, display_order, created_at)
      VALUES ?
    `;
    await conn.query(insertSql, [initialCategories]);
    console.log(`✓ Seeded ${initialCategories.length} project categories into MySQL!`);
  } else {
    console.log(`Table already has ${rows[0].count} categories.`);
  }

  const [allCats] = await conn.query('SELECT id, name, slug, display_order FROM `project_categories` ORDER BY display_order ASC');
  console.log('\nCurrent Categories in MySQL:');
  allCats.forEach((c) => console.log(` - [${c.display_order}] ${c.name} (${c.slug})`));

  await conn.end();
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});

