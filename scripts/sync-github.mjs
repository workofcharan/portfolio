import { mkdir, readFile, writeFile } from 'node:fs/promises';

const target = new URL('../src/data/githubRepositories.json', import.meta.url);
const username = 'workofcharan';

try {
  const repositories = [];
  for (let page = 1; ; page++) {
    const response = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated&type=owner&page=${page}`, {
      headers: { Accept: 'application/vnd.github+json', 'User-Agent': 'charan-portfolio-sync' },
      signal: AbortSignal.timeout(15000),
    });
    if (!response.ok) throw new Error(`GitHub returned ${response.status}`);
    const batch = await response.json();
    if (!Array.isArray(batch)) throw new Error('Unexpected repository response');
    for (const repo of batch) {
      repositories.push({
        name: repo.name, description: repo.description, html_url: repo.html_url,
        homepage: repo.homepage, language: repo.language, topics: repo.topics ?? [],
        fork: repo.fork, archived: repo.archived,
      });
    }
    if (batch.length < 100) break;
  }
  if (!repositories.length) throw new Error('Refusing to replace the saved list with an empty response');
  await mkdir(new URL('../src/data/', import.meta.url), { recursive: true });
  await writeFile(target, JSON.stringify({ username, syncedAt: new Date().toISOString(), repositories }, null, 2) + '\n');
  console.log(`Synced ${repositories.length} public GitHub repositories, including forks and archived repositories.`);
} catch (error) {
  try {
    const saved = JSON.parse(await readFile(target, 'utf8'));
    if (!saved.repositories?.length) throw new Error('No saved repositories');
    console.warn(`GitHub sync unavailable (${error.message}); using ${saved.repositories.length} saved repositories from ${saved.syncedAt}.`);
  } catch {
    console.error(`GitHub sync failed and no saved list exists: ${error.message}`);
    process.exitCode = 1;
  }
}
