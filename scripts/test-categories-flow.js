const mysql = require('mysql2/promise');

async function testCategoriesFlow() {
  console.log('========================================================');
  console.log(' VENOM TECH - PROJECT CATEGORIES DATABASE & FLOW TEST ');
  console.log('========================================================\n');

  const pool = mysql.createPool({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: '',
    database: 'venom-tech',
  });

  // 1. Read existing categories
  console.log('>>> [1/4] Reading existing project categories from MySQL:');
  const [rows] = await pool.query(
    'SELECT id, name, slug, color, display_order FROM project_categories ORDER BY display_order ASC'
  );
  console.log(`Found ${rows.length} category/categories in database:`);
  rows.forEach((c) => {
    console.log(`  - [${c.display_order}] ${c.name} (${c.slug}) -> Color: ${c.color}`);
  });

  // 2. Add New Test Category
  console.log('\n>>> [2/4] Adding new category "Spatial 3D & Motion":');
  const catId = `cat-test-${Date.now()}`;
  const now = new Date().toISOString().slice(0, 19).replace('T', ' ');
  await pool.query(
    'INSERT INTO project_categories (id, name, slug, description, color, display_order, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)',
    [
      catId,
      'Spatial 3D & Motion',
      'spatial-3d-motion',
      'Interactive WebGL, Three.js shaders, and real-time kinetic canvas platforms',
      '#C07DFF',
      7,
      now,
    ]
  );
  console.log(`✓ Inserted category: ${catId}`);

  // 3. Verify category in MySQL
  const [readRows] = await pool.query('SELECT * FROM project_categories WHERE id = ?', [catId]);
  console.log('✓ Successfully retrieved new category from MySQL:', readRows[0].name, '| slug:', readRows[0].slug);

  // 4. Clean up test category or verify total
  const [totalRows] = await pool.query('SELECT COUNT(*) as count FROM project_categories');
  console.log(`Total categories in MySQL now: ${totalRows[0].count}`);

  // Delete test category to keep database clean
  await pool.query('DELETE FROM project_categories WHERE id = ?', [catId]);
  console.log('✓ Test category deleted successfully.');

  console.log('\n========================================================');
  console.log(' >> SUCCESS: PROJECT CATEGORIES SYSTEM FULLY OPERATIONAL <<');
  console.log('========================================================\n');

  await pool.end();
}

testCategoriesFlow().catch((err) => {
  console.error('Test failed:', err);
  process.exit(1);
});

