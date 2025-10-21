import { app } from './http/server';

const PORT = process.env.PORT || 3000;

setInterval(() => {
  const memUsage = process.memoryUsage();

  console.log('=== Memory Report ===');
  console.log('Process Memory (Total):');
  console.log(
    `  RSS (Total Process): ${(memUsage.rss / 1024 / 1024).toFixed(
      2
    )} MB ← TOTAL memory used`
  );
  console.log('');
  console.log('JavaScript Heap:');
  console.log(
    `  Heap Total: ${(memUsage.heapTotal / 1024 / 1024).toFixed(2)} MB`
  );
  console.log(
    `  Heap Used: ${(memUsage.heapUsed / 1024 / 1024).toFixed(
      2
    )} MB ← Your app's JS objects`
  );
  console.log(`  External: ${(memUsage.external / 1024 / 1024).toFixed(2)} MB`);
  console.log('====================\n');
}, 5000);

export default {
  port: PORT,
  fetch: app.fetch,
};

console.log(`🚀 Server running at http://localhost:${PORT}`);
