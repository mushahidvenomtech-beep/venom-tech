const mysql = require('mysql2/promise');

async function main() {
  console.log('Connecting to MySQL (127.0.0.1:3306, database: venom-tech)...');
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'venom-tech',
    port: 3306,
  });

  const sql = `
    CREATE TABLE IF NOT EXISTS \`leads\` (
      \`id\` varchar(36) NOT NULL,
      \`name\` varchar(255) NOT NULL,
      \`email\` varchar(255) NOT NULL,
      \`phone\` varchar(50) NOT NULL DEFAULT '',
      \`company\` varchar(255) NOT NULL DEFAULT '',
      \`services\` json NOT NULL,
      \`message\` text NOT NULL,
      \`status\` varchar(50) NOT NULL DEFAULT 'New',
      \`source\` varchar(100) NOT NULL DEFAULT 'contact_page',
      \`created_at\` datetime NOT NULL,
      \`updated_at\` datetime NOT NULL,
      PRIMARY KEY (\`id\`),
      INDEX \`idx_leads_status\` (\`status\`),
      INDEX \`idx_leads_created_at\` (\`created_at\`),
      INDEX \`idx_leads_email\` (\`email\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  await conn.query(sql);
  console.log('✓ Table `leads` created successfully in MySQL venom-tech!');

  const [countRows] = await conn.query('SELECT COUNT(*) as count FROM `leads`');
  console.log(`Current leads in database: ${countRows[0].count}`);

  await conn.end();
}

main().catch((err) => {
  console.error('Failed to create leads table:', err);
  process.exit(1);
});

