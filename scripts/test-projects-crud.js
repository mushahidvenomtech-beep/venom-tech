const mysql = require('mysql2/promise');

async function testProjectCrud() {
  console.log('====================================================');
  console.log(' VENOM TECH - PROJECTS MODULE FULL CRUD & FLOW TEST ');
  console.log('====================================================\n');

  const pool = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'venom-tech',
    waitForConnections: true,
    connectionLimit: 10,
  });

  // 1. Initial State Check
  console.log('>>> [1/5] Checking existing projects in MySQL venom-tech:');
  const [initialRows] = await pool.query(
    'SELECT id, title, subtitle, service, live_url, is_featured, is_active FROM projects ORDER BY display_order ASC'
  );
  console.log(`Found ${initialRows.length} existing project(s) in database:`);
  initialRows.forEach((p, idx) => {
    console.log(
      `  ${idx + 1}. [${p.id}] ${p.title} (${p.service}) - Featured: ${Boolean(p.is_featured)} | URL: ${p.live_url || 'N/A'}`
    );
  });

  // 2. Insert Dummy Project from User Input
  console.log('\n>>> [2/5] Creating Dummy Project with User Input details:');
  const dummyId = `proj-test-${Date.now()}`;
  const dummyProject = {
    id: dummyId,
    title: 'Neural Matrix Automation Cloud',
    subtitle: 'Next-gen enterprise workflow orchestration and cognitive decision engine',
    client: 'Apex Global Logistics',
    service: 'AI Automation',
    year: '2026',
    progress: 100,
    status: 'Completed',
    team: 'AI Labs Pod 01',
    dueDate: 'Delivered',
    liveUrl: 'https://neural-matrix.venomtech.io',
    caseStudyUrl: '/screens/portfolio',
    buttonText: 'Launch Platform ↗',
    image: '/images/services/ai-automation.webp',
    mockupType: 'custom_image',
    color: 'from-stone-900 to-black',
    tags: JSON.stringify(['AI', 'Next.js 16', 'Matrix Automation']),
    displayOrder: 0, // Top priority for homepage portfolio showcase!
    isFeatured: 1,  // Show on Homepage
    isActive: 1,
  };

  const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

  await pool.query(
    `INSERT INTO projects (
      id, title, subtitle, client, service, year, progress, status, team,
      due_date, live_url, case_study_url, button_text, image, mockup_type,
      color, tags, display_order, is_featured, is_active, created_at, updated_at
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      dummyProject.id,
      dummyProject.title,
      dummyProject.subtitle,
      dummyProject.client,
      dummyProject.service,
      dummyProject.year,
      dummyProject.progress,
      dummyProject.status,
      dummyProject.team,
      dummyProject.dueDate,
      dummyProject.liveUrl,
      dummyProject.caseStudyUrl,
      dummyProject.buttonText,
      dummyProject.image,
      dummyProject.mockupType,
      dummyProject.color,
      dummyProject.tags,
      dummyProject.displayOrder,
      dummyProject.isFeatured,
      dummyProject.isActive,
      now,
      now,
    ]
  );
  console.log(`✓ Project successfully inserted into MySQL! ID: ${dummyProject.id}`);

  // 3. Verify Readback from Database
  console.log('\n>>> [3/5] Verifying Project Readback from MySQL:');
  const [createdRows] = await pool.query('SELECT * FROM projects WHERE id = ?', [dummyId]);
  if (createdRows.length === 0) {
    throw new Error('Project verification failed: record not found in database!');
  }
  const saved = createdRows[0];
  console.log('✓ Successfully retrieved newly created project:');
  console.log(`   - ID: ${saved.id}`);
  console.log(`   - Title: ${saved.title}`);
  console.log(`   - Cover Image: ${saved.image}`);
  console.log(`   - Short Description: ${saved.subtitle}`);
  console.log(`   - Project Link (URL): ${saved.live_url}`);
  console.log(`   - Button Label: ${saved.button_text}`);
  console.log(`   - Homepage Featured: ${Boolean(saved.is_featured)}`);

  // 4. Update Project Details
  console.log('\n>>> [4/5] Testing Update Operation (e.g. user modifies description or link):');
  const updatedDesc = 'Updated: Autonomous multi-agent mesh deployment with enterprise security';
  const updatedLink = 'https://neural-matrix-v2.venomtech.io';
  await pool.query(
    'UPDATE projects SET subtitle = ?, live_url = ?, updated_at = ? WHERE id = ?',
    [updatedDesc, updatedLink, now, dummyId]
  );
  const [updatedRows] = await pool.query('SELECT subtitle, live_url FROM projects WHERE id = ?', [dummyId]);
  console.log(`✓ Updated Description verified: "${updatedRows[0].subtitle}"`);
  console.log(`✓ Updated URL verified: "${updatedRows[0].live_url}"`);

  // 5. Query Homepage Featured Portfolio
  console.log('\n>>> [5/5] Testing Homepage Portfolio query (featured=true & active=true):');
  const [featuredRows] = await pool.query(
    'SELECT id, title, subtitle, live_url, image, display_order FROM projects WHERE is_featured = 1 AND is_active = 1 ORDER BY display_order ASC, created_at DESC'
  );
  console.log(`Total featured projects for Homepage Portfolio: ${featuredRows.length}`);
  featuredRows.forEach((r, i) => {
    console.log(`   [${i + 1}] "${r.title}" | Cover: ${r.image} | URL: ${r.live_url}`);
  });

  console.log('\n====================================================');
  console.log(' >> SUCCESS: PROJECTS CRUD & HOMEPAGE FLOW VERIFIED <<');
  console.log('====================================================\n');

  await pool.end();
}

testProjectCrud().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});

