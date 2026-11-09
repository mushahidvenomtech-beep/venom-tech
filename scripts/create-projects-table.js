const mysql = require('mysql2/promise');

async function main() {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'venom-tech',
    port: 3306
  });

  const sql = `
    CREATE TABLE IF NOT EXISTS \`projects\` (
      \`id\` varchar(36) NOT NULL,
      \`title\` varchar(255) NOT NULL,
      \`subtitle\` varchar(255) NOT NULL DEFAULT '',
      \`client\` varchar(255) NOT NULL DEFAULT '',
      \`service\` varchar(100) NOT NULL DEFAULT 'Web Design',
      \`year\` varchar(10) NOT NULL DEFAULT '2026',
      \`progress\` int NOT NULL DEFAULT 100,
      \`status\` varchar(50) NOT NULL DEFAULT 'Completed',
      \`team\` varchar(100) NOT NULL DEFAULT 'Engineering Pod',
      \`due_date\` varchar(50) NOT NULL DEFAULT 'Delivered',
      \`live_url\` varchar(512),
      \`case_study_url\` varchar(512),
      \`button_text\` varchar(100) DEFAULT 'Live Project',
      \`image\` mediumtext,
      \`mockup_type\` varchar(50) DEFAULT 'custom_image',
      \`color\` varchar(100) DEFAULT 'from-stone-900 to-black',
      \`tags\` json,
      \`display_order\` int NOT NULL DEFAULT 0,
      \`is_featured\` boolean NOT NULL DEFAULT false,
      \`is_active\` boolean NOT NULL DEFAULT true,
      \`created_at\` datetime NOT NULL,
      \`updated_at\` datetime NOT NULL,
      PRIMARY KEY (\`id\`),
      INDEX \`idx_projects_display_order\` (\`display_order\`),
      INDEX \`idx_projects_is_featured\` (\`is_featured\`),
      INDEX \`idx_projects_is_active\` (\`is_active\`),
      INDEX \`idx_projects_status\` (\`status\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  await conn.query(sql);
  console.log('Table projects created successfully!');

  // Check count
  const [rows] = await conn.query('SELECT COUNT(*) as count FROM `projects`');
  if (rows[0].count === 0) {
    console.log('Seeding initial projects into database...');
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const initialProjects = [
      [
        'proj-aura-sound',
        'Aura Spatial Sound',
        'Next.js Flagship / UI & UX',
        'Aura Technologies Inc.',
        'Graphic Design & UI/UX',
        '2026',
        92,
        'Final Review',
        'Design Pod 01',
        'Nov 15, 2026',
        'https://aura-sound.io',
        '/screens/portfolio',
        'Live Project ↗',
        '/images/services/ai-automation.webp',
        'laptop',
        'from-stone-900 to-black',
        JSON.stringify(['Next.js', 'UI/UX', 'Spatial Audio']),
        1,
        1, // is_featured = true (homepage portfolio card 1)
        1, // is_active
        now,
        now
      ],
      [
        'proj-studio-form',
        'Studio Form & Space',
        'Brand Identity / Packaging',
        'Studio Form & Space LLC',
        'Branding',
        '2026',
        100,
        'Completed',
        'Brand Pod 02',
        'Delivered',
        'https://studioform.design',
        '/screens/portfolio',
        'View Showcase ↗',
        '/images/services/ui-design.webp',
        'bag',
        'from-stone-800 to-neutral-900',
        JSON.stringify(['Brand Identity', 'Packaging', 'Visual System']),
        2,
        1, // is_featured = true (homepage portfolio card 2)
        1,
        now,
        now
      ],
      [
        'proj-verve-kinetic',
        'Verve Kinetic Type',
        'Spatial Motion / 3D Canvas',
        'Verve Media Labs',
        'Development',
        '2025',
        100,
        'Completed',
        'Creative Tech Pod',
        'Delivered',
        'https://verve-kinetic.art',
        '/screens/portfolio',
        'Explore Platform ↗',
        '/images/services/animation.webp',
        'editorial',
        'from-neutral-950 to-black',
        JSON.stringify(['React', 'WebGL', '3D Canvas', 'Motion']),
        3,
        1, // is_featured = true (homepage portfolio card 3)
        1,
        now,
        now
      ],
      [
        'proj-nexus-ecommerce',
        'Nexus E-Commerce Automation Pipeline',
        'Multi-Vendor Sync & Smart Logistics',
        'Nexus Retail Group',
        'AI Automation',
        '2026',
        75,
        'Active Sprint',
        'AI Engineering',
        'Nov 24, 2026',
        'https://nexus-retail.com',
        '/screens/portfolio',
        'Live Pipeline ↗',
        '/images/services/e-commerce.webp',
        'custom_image',
        'from-stone-900 to-zinc-950',
        JSON.stringify(['Automation', 'E-Commerce', 'Next.js']),
        4,
        0,
        1,
        now,
        now
      ],
      [
        'proj-fintech-wallet',
        'FinTech Digital Wallet iOS & Android',
        'Cross-Platform Microfinance App',
        'PayWave Microfinance',
        'App Development',
        '2026',
        60,
        'Active Sprint',
        'Mobile Engineering',
        'Dec 05, 2026',
        'https://paywave.app',
        '/screens/portfolio',
        'App Prototype ↗',
        '/images/services/app-development.webp',
        'custom_image',
        'from-slate-900 to-neutral-950',
        JSON.stringify(['iOS', 'Android', 'FinTech', 'Flutter']),
        5,
        0,
        1,
        now,
        now
      ],
      [
        'proj-seo-dominance',
        'Nationwide SEO Dominance Campaign',
        'Semantic Keyword Architecture & Core Vitals',
        'Prime Real Estate Lahore',
        'SEO Services',
        '2026',
        88,
        'Active Sprint',
        'SEO & Growth',
        'Nov 30, 2026',
        'https://primerealestate.pk',
        '/screens/portfolio',
        'Ranking Report ↗',
        '/images/services/digital-marketing.webp',
        'custom_image',
        'from-zinc-900 to-stone-900',
        JSON.stringify(['SEO', 'Organic Growth', 'Analytics']),
        6,
        0,
        1,
        now,
        now
      ],
      [
        'proj-meta-google-ads',
        'Q4 Meta & Google Performance Ads',
        'Omnichannel Performance Funnels',
        'Velocity Apparel',
        'Advertising Agency',
        '2026',
        100,
        'Completed',
        'Media Buying',
        'Delivered',
        'https://velocityapparel.com',
        '/screens/portfolio',
        'Campaign Metrics ↗',
        '/images/services/lead-funnels.webp',
        'custom_image',
        'from-black to-stone-950',
        JSON.stringify(['PPC', 'Meta Ads', 'Conversion Rate']),
        7,
        0,
        1,
        now,
        now
      ]
    ];

    const insertSql = `
      INSERT INTO \`projects\`
      (\`id\`, \`title\`, \`subtitle\`, \`client\`, \`service\`, \`year\`, \`progress\`, \`status\`, \`team\`, \`due_date\`, \`live_url\`, \`case_study_url\`, \`button_text\`, \`image\`, \`mockup_type\`, \`color\`, \`tags\`, \`display_order\`, \`is_featured\`, \`is_active\`, \`created_at\`, \`updated_at\`)
      VALUES ?
    `;

    await conn.query(insertSql, [initialProjects]);
    console.log('Seeded 7 initial projects successfully!');
  } else {
    console.log('Projects already exist: count =', rows[0].count);
  }

  await conn.end();
}

main().catch(console.error);

