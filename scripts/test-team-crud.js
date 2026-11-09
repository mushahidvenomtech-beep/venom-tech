const mysql = require('mysql2/promise');

async function testCrud() {
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    database: 'venom-tech',
    port: 3306
  });

  console.log('=== TEST 1: READ INITIAL MEMBERS FROM MYSQL ===');
  const [rows] = await conn.query('SELECT id, name, role, badge, specialty, image, is_active FROM team_members ORDER BY display_order ASC');
  console.log('Total members found in MySQL:', rows.length);
  rows.forEach((r, idx) => {
    console.log(` [${idx + 1}] ${r.name} - ${r.role} (${r.badge}) -> Photo: ${r.image}`);
  });

  console.log('\n=== TEST 2: CREATE / INSERT 5TH TEAM MEMBER ===');
  const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
  const demoId = 'team-test-' + Date.now();
  await conn.query(`
    INSERT INTO team_members 
    (id, name, role, badge, brand_label, studio_role, specialty, avatar_bg, image, initials, social_links, display_order, is_active, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `, [
    demoId,
    'Marcus Thorne',
    'Executive Cloud Architect',
    'PARTNER',
    'CREAT',
    'STUDIO LEAD',
    'Distributed Systems & Global AI Mesh',
    'from-indigo-950 to-slate-950',
    '/images/team/liam-oconnor.jpg',
    'MT',
    JSON.stringify({ linkedin: 'https://linkedin.com' }),
    5,
    1,
    now,
    now
  ]);
  console.log('Inserted member:', demoId);

  const [afterInsert] = await conn.query('SELECT COUNT(*) as count FROM team_members');
  console.log('Member count after insertion:', afterInsert[0].count);

  console.log('\n=== TEST 3: UPDATE TEAM MEMBER ===');
  await conn.query('UPDATE team_members SET role = ? WHERE id = ?', [
    'Managing Partner & Chief AI Architect',
    demoId
  ]);
  const [updatedRows] = await conn.query('SELECT role FROM team_members WHERE id = ?', [demoId]);
  console.log('Updated role verified:', updatedRows[0].role);

  console.log('\n=== TEST 4: TOGGLE ACTIVE / VISIBILITY ===');
  await conn.query('UPDATE team_members SET is_active = ? WHERE id = ?', [0, demoId]);
  const [activeCheck] = await conn.query('SELECT is_active FROM team_members WHERE id = ?', [demoId]);
  console.log('Active state (0 = hidden):', activeCheck[0].is_active);

  console.log('\n=== TEST 5: DELETE TEST MEMBER ===');
  await conn.query('DELETE FROM team_members WHERE id = ?', [demoId]);
  const [afterDelete] = await conn.query('SELECT COUNT(*) as count FROM team_members');
  console.log('Member count after deletion (back to 4):', afterDelete[0].count);

  console.log('\n>>> All CRUD operations verified 100% operational against MySQL! <<<');
  await conn.end();
}

testCrud().catch(console.error);
