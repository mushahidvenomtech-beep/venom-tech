const mysql = require('mysql2/promise');

async function main() {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'venom-tech',
    port: 3306
  });

  const sql = `
    CREATE TABLE IF NOT EXISTS \`team_members\` (
      \`id\` varchar(36) NOT NULL,
      \`name\` varchar(100) NOT NULL,
      \`role\` varchar(255) NOT NULL,
      \`badge\` varchar(50) NOT NULL DEFAULT 'PARTNER',
      \`brand_label\` varchar(50) NOT NULL DEFAULT 'CREAT',
      \`studio_role\` varchar(100) NOT NULL DEFAULT 'STUDIO LEAD',
      \`specialty\` varchar(255) NOT NULL,
      \`avatar_bg\` varchar(100) NOT NULL DEFAULT 'from-stone-900 to-black',
      \`image\` mediumtext,
      \`initials\` varchar(10) NOT NULL DEFAULT '',
      \`social_links\` json,
      \`display_order\` int NOT NULL DEFAULT 0,
      \`is_active\` boolean NOT NULL DEFAULT true,
      \`created_at\` datetime NOT NULL,
      \`updated_at\` datetime NOT NULL,
      PRIMARY KEY (\`id\`),
      INDEX \`idx_team_display_order\` (\`display_order\`),
      INDEX \`idx_team_is_active\` (\`is_active\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  await conn.query(sql);
  console.log('Table team_members created successfully!');

  const [tables] = await conn.query('SHOW TABLES');
  console.log('Current tables:', tables);

  // Now seed the initial 4 team members with real photos if table is empty
  const [rows] = await conn.query('SELECT COUNT(*) as count FROM `team_members`');
  if (rows[0].count === 0) {
    console.log('Seeding initial 4 team members with real photos...');
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const members = [
      [
        'team-alex-rivera',
        'Alex Rivera',
        'Founding Partner & Creative Director',
        'PARTNER',
        'CREAT',
        'STUDIO LEAD',
        'Brand Systems & Art Direction',
        'from-stone-900 to-black',
        '/images/team/alex-rivera.webp',
        'AR',
        JSON.stringify({ linkedin: 'https://linkedin.com', twitter: 'https://twitter.com' }),
        1,
        1,
        now,
        now
      ],
      [
        'team-maya-chen',
        'Maya Chen',
        'Principal Product Architect',
        'PARTNER',
        'CREAT',
        'STUDIO LEAD',
        'Design Systems & UI/UX',
        'from-neutral-900 to-stone-900',
        '/images/team/maya-chen.webp',
        'MC',
        JSON.stringify({ linkedin: 'https://linkedin.com', github: 'https://github.com' }),
        2,
        1,
        now,
        now
      ],
      [
        'team-liam-oconnor',
        'Liam O\'Connor',
        'Head of Creative Technology',
        'PARTNER',
        'CREAT',
        'STUDIO LEAD',
        'Full-Stack Web & Next.js',
        'from-stone-950 to-neutral-900',
        '/images/team/liam-oconnor.webp',
        'LO',
        JSON.stringify({ linkedin: 'https://linkedin.com', github: 'https://github.com' }),
        3,
        1,
        now,
        now
      ],
      [
        'team-sofia-rossi',
        'Sofia Rossi',
        'Lead 3D & Motion Artist',
        'PARTNER',
        'CREAT',
        'STUDIO LEAD',
        'Kinetic Visuals & Spatial Canvas',
        'from-black to-stone-900',
        '/images/team/sofia-rossi.webp',
        'SR',
        JSON.stringify({ linkedin: 'https://linkedin.com', portfolio: 'https://sofia.art' }),
        4,
        1,
        now,
        now
      ]
    ];

    const insertSql = `
      INSERT INTO \`team_members\` 
      (\`id\`, \`name\`, \`role\`, \`badge\`, \`brand_label\`, \`studio_role\`, \`specialty\`, \`avatar_bg\`, \`image\`, \`initials\`, \`social_links\`, \`display_order\`, \`is_active\`, \`created_at\`, \`updated_at\`)
      VALUES ?
    `;
    await conn.query(insertSql, [members]);
    console.log('Seeded 4 team members with real portraits successfully!');
  } else {
    console.log('Team members already exist: count =', rows[0].count);
  }

  await conn.end();
}

main().catch(console.error);
