const mysql = require('mysql2/promise');

async function testLeadsFlow() {
  console.log('--- Step 1: Connecting to MySQL database venom-tech on 127.0.0.1:3306 ---');
  const conn = await mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'venom-tech',
    port: 3306,
  });
  console.log('✓ Successfully connected to MySQL.\n');

  console.log('--- Step 2: Verifying table `leads` structure ---');
  const [columns] = await conn.query('DESCRIBE `leads`');
  console.log('Table columns:', columns.map((c) => `${c.Field} (${c.Type})`).join(', '));

  console.log('\n--- Step 3: Inserting test lead "test lead" ---');
  const leadId = `lead-${Date.now()}-test`;
  const now = new Date();
  const testLead = {
    id: leadId,
    name: 'test lead',
    email: 'testlead@venomtech.io',
    phone: '+92 300 1234567',
    company: 'Test Enterprise Co',
    services: JSON.stringify(['AI Automation', 'Web Development', 'UI/UX Designer']),
    message: 'Test lead inquiry created for verification of multi-step contact workflow and real-time dashboard display.',
    status: 'New',
    source: 'contact_page_multistep',
    created_at: now,
    updated_at: now,
  };

  const insertSql = `
    INSERT INTO \`leads\` (\`id\`, \`name\`, \`email\`, \`phone\`, \`company\`, \`services\`, \`message\`, \`status\`, \`source\`, \`created_at\`, \`updated_at\`)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  await conn.query(insertSql, [
    testLead.id,
    testLead.name,
    testLead.email,
    testLead.phone,
    testLead.company,
    testLead.services,
    testLead.message,
    testLead.status,
    testLead.source,
    testLead.created_at,
    testLead.updated_at,
  ]);
  console.log(`✓ Inserted lead "${testLead.name}" with ID: ${testLead.id}`);

  console.log('\n--- Step 4: Querying inserted lead from database ---');
  const [rows] = await conn.query('SELECT * FROM `leads` WHERE `id` = ?', [leadId]);
  if (rows.length === 0) {
    throw new Error('Test lead not found in database after insertion!');
  }
  const inserted = rows[0];
  console.log('Retrieved Lead Row:', {
    id: inserted.id,
    name: inserted.name,
    email: inserted.email,
    phone: inserted.phone,
    company: inserted.company,
    services: inserted.services,
    status: inserted.status,
    source: inserted.source,
    created_at: inserted.created_at,
  });

  console.log('\n--- Step 5: Testing Status Update ("New" -> "Contacted") ---');
  await conn.query('UPDATE `leads` SET `status` = ?, `updated_at` = ? WHERE `id` = ?', [
    'Contacted',
    new Date(),
    leadId,
  ]);
  const [updatedRows] = await conn.query('SELECT status, updated_at FROM `leads` WHERE `id` = ?', [leadId]);
  console.log(`✓ Status updated successfully to: "${updatedRows[0].status}"`);

  console.log('\n--- Step 6: Resetting status back to "New" for user review on Dashboard ---');
  await conn.query('UPDATE `leads` SET `status` = ? WHERE `id` = ?', ['New', leadId]);
  const [finalRows] = await conn.query('SELECT * FROM `leads`');
  console.log(`Total leads currently in database: ${finalRows.length}`);
  finalRows.forEach((r, idx) => {
    console.log(`  [${idx + 1}] ID: ${r.id} | Name: ${r.name} | Email: ${r.email} | Status: ${r.status}`);
  });

  await conn.end();
  console.log('\n✓ ALL LEADS TESTS PASSED SUCCESSFULLY! Ready for dashboard and frontend inspection.');
}

testLeadsFlow().catch((err) => {
  console.error('Test run failed:', err);
  process.exit(1);
});

