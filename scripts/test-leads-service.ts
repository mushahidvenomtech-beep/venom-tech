import { LeadDbService } from '../lib/leads/services/leadDbService';

async function main() {
  console.log('--- Testing LeadDbService.create ---');
  const created = await LeadDbService.create({
    name: 'test lead 2',
    email: 'testlead2@venomtech.io',
    phone: '+1 555 0199',
    company: 'NextGen Solutions',
    services: ['AI Automation', 'E-Commerce'],
    message: 'Second test lead through LeadDbService',
    status: 'New',
  });
  console.log('Created lead:', created);

  console.log('--- Testing LeadDbService.getById ---');
  const fetched = await LeadDbService.getById(created.id);
  console.log('Fetched lead:', fetched);

  console.log('--- Testing LeadDbService.update ---');
  const updated = await LeadDbService.update(created.id, { status: 'Contacted' });
  console.log('Updated lead status:', updated?.status);

  console.log('--- Testing LeadDbService.delete ---');
  const deleted = await LeadDbService.delete(created.id);
  console.log('Deleted lead 2:', deleted);

  const remaining = await LeadDbService.getAll();
  console.log('Remaining leads count in MySQL:', remaining.length);
  console.log('Remaining lead names:', remaining.map((l) => l.name));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
