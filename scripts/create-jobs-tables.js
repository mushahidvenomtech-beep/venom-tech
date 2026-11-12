const mysql = require('mysql2/promise');

async function main() {
  console.log('Connecting to MySQL (127.0.0.1:3306, database: venom-tech)...');
  const conn = await mysql.createConnection({
    host: process.env.MYSQL_HOST || '127.0.0.1',
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || '',
    database: process.env.MYSQL_DATABASE || 'venom-tech',
    port: process.env.MYSQL_PORT ? parseInt(process.env.MYSQL_PORT, 10) : 3306,
  });

  const jobsSql = `
    CREATE TABLE IF NOT EXISTS \`jobs\` (
      \`id\` varchar(36) NOT NULL,
      \`title\` varchar(255) NOT NULL,
      \`slug\` varchar(255) NOT NULL,
      \`department\` varchar(100) NOT NULL DEFAULT 'Engineering',
      \`employment_type\` varchar(60) NOT NULL DEFAULT 'Full-Time',
      \`work_mode\` varchar(60) NOT NULL DEFAULT 'Hybrid',
      \`location\` varchar(150) NOT NULL DEFAULT 'Lahore, Pakistan',
      \`experience_level\` varchar(100) NOT NULL DEFAULT 'Mid-Level',
      \`salary_range\` varchar(120) NOT NULL DEFAULT 'Competitive',
      \`summary\` text NOT NULL,
      \`description\` text NOT NULL,
      \`requirements\` json NOT NULL,
      \`benefits\` json NOT NULL,
      \`apply_form_config\` json NOT NULL,
      \`status\` varchar(40) NOT NULL DEFAULT 'Open',
      \`is_featured\` tinyint(1) NOT NULL DEFAULT 0,
      \`application_deadline\` varchar(60) NOT NULL DEFAULT '',
      \`display_order\` int NOT NULL DEFAULT 0,
      \`created_at\` datetime NOT NULL,
      \`updated_at\` datetime NOT NULL,
      PRIMARY KEY (\`id\`),
      INDEX \`idx_jobs_status\` (\`status\`),
      INDEX \`idx_jobs_department\` (\`department\`),
      INDEX \`idx_jobs_slug\` (\`slug\`),
      INDEX \`idx_jobs_created_at\` (\`created_at\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  const candidatesSql = `
    CREATE TABLE IF NOT EXISTS \`job_candidates\` (
      \`id\` varchar(36) NOT NULL,
      \`job_id\` varchar(36) NOT NULL DEFAULT 'general',
      \`job_title\` varchar(255) NOT NULL DEFAULT 'General Application',
      \`name\` varchar(255) NOT NULL,
      \`email\` varchar(255) NOT NULL,
      \`phone\` varchar(50) NOT NULL DEFAULT '',
      \`location\` varchar(150) NOT NULL DEFAULT '',
      \`experience_years\` varchar(80) NOT NULL DEFAULT '',
      \`expected_salary\` varchar(100) NOT NULL DEFAULT '',
      \`availability\` varchar(100) NOT NULL DEFAULT '',
      \`portfolio_url\` varchar(512) NOT NULL DEFAULT '',
      \`linkedin_url\` varchar(512) NOT NULL DEFAULT '',
      \`resume_url\` text NOT NULL,
      \`resume_file_name\` varchar(255) NOT NULL DEFAULT '',
      \`cover_letter\` text NOT NULL,
      \`custom_answers\` json NOT NULL,
      \`status\` varchar(50) NOT NULL DEFAULT 'New',
      \`is_attended\` tinyint(1) NOT NULL DEFAULT 0,
      \`notes\` text NOT NULL,
      \`attended_at\` datetime NULL,
      \`created_at\` datetime NOT NULL,
      \`updated_at\` datetime NOT NULL,
      PRIMARY KEY (\`id\`),
      INDEX \`idx_candidates_job_id\` (\`job_id\`),
      INDEX \`idx_candidates_status\` (\`status\`),
      INDEX \`idx_candidates_attended\` (\`is_attended\`),
      INDEX \`idx_candidates_created_at\` (\`created_at\`),
      INDEX \`idx_candidates_email\` (\`email\`)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `;

  await conn.query(jobsSql);
  console.log('Table `jobs` created or already exists.');

  await conn.query(candidatesSql);
  console.log('Table `job_candidates` created or already exists.');

  await conn.end();
}

main().catch((err) => {
  console.error('Failed to create jobs tables:', err);
  process.exit(1);
});

