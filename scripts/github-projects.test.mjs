import { readFile } from 'node:fs/promises';
import assert from 'node:assert/strict';
import test from 'node:test';
import ts from 'typescript';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';

const dataUrl = source => `data:text/javascript;base64,${Buffer.from(ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.React } }).outputText).toString('base64')}`;
const helpersUrl = dataUrl(await readFile(new URL('../src/data/githubProjects.ts', import.meta.url), 'utf8'));
const { repositoryHomepage, mergeGitHubProjects, applyProjectLinkChecks } = await import(helpersUrl);
const snapshot = JSON.parse(await readFile(new URL('../src/data/githubRepositories.json', import.meta.url), 'utf8'));
const linkStatus = JSON.parse(await readFile(new URL('../src/data/projectLinkStatus.json', import.meta.url), 'utf8'));
const portfolioSource = (await readFile(new URL('../src/data/portfolioData.ts', import.meta.url), 'utf8'))
  .replace(/import \{ Project, Door, TimelineMilestone, SkillCategory \} from '..\/types';/, '')
  .replace(/import githubSnapshot from '.\/githubRepositories.json';/, `const githubSnapshot = ${JSON.stringify(snapshot)};`)
  .replace(/import \{ mergeGitHubProjects, applyProjectLinkChecks \} from '.\/githubProjects';/, `import { mergeGitHubProjects, applyProjectLinkChecks } from '${helpersUrl}';`)
  .replace(/import projectLinkStatus from '.\/projectLinkStatus.json';/, `const projectLinkStatus = ${JSON.stringify(linkStatus)};`);
const portfolioUrl = dataUrl(portfolioSource);
const { PROJECTS } = await import(portfolioUrl);

test('the directory supplies every working live link and GitHub link to the deck', async () => {
  // Render every virtual card to verify the complete data contract, independent
  // of the carousel's browser-only geometry and recycled visible card pool.
  const deckUrl = dataUrl(`import React from '${import.meta.resolve('react')}'; export default function Deck({cards}) { return React.createElement('div', null, cards.map((card, index) => React.createElement('div', {key:index}, card.content))); }`);
  const iconsUrl = dataUrl((await readFile(new URL('../src/components/Icons.tsx', import.meta.url), 'utf8')).replace("from 'react'", `from '${import.meta.resolve('react')}'`));
  const source = (await readFile(new URL('../src/components/ProjectLinksDirectory.tsx', import.meta.url), 'utf8'))
    .replace("from 'react'", `from '${import.meta.resolve('react')}'`)
    .replace("from 'lucide-react'", `from '${import.meta.resolve('lucide-react')}'`)
    .replace("from './Icons'", `from '${iconsUrl}'`)
    .replace("from '../data/portfolioData'", `from '${portfolioUrl}'`)
    .replace("from './ui/tumble-deck-showcase'", `from '${deckUrl}'`);
  const { ProjectLinksDirectory } = await import(dataUrl(source));
  const html = renderToStaticMarkup(React.createElement(ProjectLinksDirectory));
  assert.ok(html.includes('id="project-links"'));
  for (const project of PROJECTS) {
    assert.ok(html.includes(`href="${project.githubUrl}"`), `GitHub anchor missing: ${project.title}`);
    if (project.liveUrl) assert.ok(html.includes(`href="${project.liveUrl}"`), `Live anchor missing: ${project.title}`);
  }
  for (const check of linkStatus.results.filter(item => item.status >= 400)) {
    assert.ok(!html.includes(`href="${repositoryHomepage(check.url)}"`), `Broken URL rendered: ${check.name}`);
  }
});

test('every public GitHub repository appears exactly once, including forks and profile repositories', () => {
  assert.equal(PROJECTS.length, snapshot.repositories.length);
  assert.equal(new Set(PROJECTS.map(project => project.id)).size, PROJECTS.length);
  for (const repo of snapshot.repositories) {
    assert.equal(PROJECTS.filter(project => project.githubUrl === repo.html_url).length, 1, repo.name);
  }
});

test('curated case studies stay first and YAADRI points to its current repository', () => {
  assert.equal(PROJECTS[0].id, 'credit-ledger');
  const yaadri = PROJECTS.find(project => project.id === 'yaadri');
  assert.equal(yaadri.githubUrl, 'https://github.com/workofcharan/yaadri2');
  assert.equal(yaadri.liveUrl, 'https://yaadri2.vercel.app/');
});

test('homepages normalize bare domains and reject unsafe schemes', () => {
  assert.equal(repositoryHomepage('charanpf.vercel.app'), 'https://charanpf.vercel.app/');
  assert.equal(repositoryHomepage('javascript:alert(1)'), undefined);
  assert.equal(repositoryHomepage(null), undefined);
  assert.equal(repositoryHomepage('https://example.com/path'), 'https://example.com/path');
});

test('future repositories appear without inventing a demo, stack, or product features', () => {
  const repo = { name: 'new-experiment', description: null, html_url: 'https://github.com/workofcharan/new-experiment', homepage: null, language: null, topics: [], fork: true, archived: true };
  const [project] = mergeGitHubProjects([], [repo]);
  assert.equal(project.previewType, 'repository');
  assert.equal(project.category, 'other');
  assert.equal(project.liveUrl, undefined);
  assert.deepEqual(project.techStack, []);
  assert.ok(project.highlights.some(text => text.includes('Forked')));
  assert.ok(project.highlights.some(text => text.includes('Archived')));
});

test('confirmed broken sites are excluded while source links remain available', () => {
  const original = { ...PROJECTS[0], liveUrl: 'https://broken.example.com/' };
  const name = original.githubUrl.split('/').pop();
  for (const status of [401, 404, 500]) {
    const [project] = applyProjectLinkChecks([original], [{ name, url: original.liveUrl, status, working: false }]);
    assert.equal(project.liveUrl, undefined);
    assert.equal(project.liveUnavailable, true);
    assert.equal(project.githubUrl, original.githubUrl);
  }
});

test('stale checks and temporary network failures do not remove current links', () => {
  const project = { ...PROJECTS[0], liveUrl: 'https://new.example.com/' };
  const name = project.githubUrl.split('/').pop();
  assert.equal(applyProjectLinkChecks([project], [{ name, url: 'https://old.example.com', status: 404, working: false }])[0].liveUrl, project.liveUrl);
  assert.equal(applyProjectLinkChecks([project], [{ name, url: project.liveUrl, status: null, working: false }])[0].liveUrl, project.liveUrl);
});
