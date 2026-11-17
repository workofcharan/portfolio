import type { Project } from '../types';

export interface GitHubRepository {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics: string[];
  fork: boolean;
  archived: boolean;
}

export function repositoryHomepage(value: string | null): string | undefined {
  if (!value?.trim()) return undefined;
  try {
    const url = new URL(/^[a-z][a-z\d+.-]*:/i.test(value) ? value : `https://${value}`);
    return ['http:', 'https:'].includes(url.protocol) ? url.href : undefined;
  } catch { return undefined; }
}

export function applyProjectLinkChecks(projects: Project[], checks: { name: string; url: string | null; status: number | null; working: boolean }[]): Project[] {
  return projects.map(project => {
    const name = project.githubUrl.split('/').filter(Boolean).pop()!.toLowerCase();
    const check = checks.find(item => item.name.toLowerCase() === name);
    // Only hide a URL when its exact deployment returned an HTTP error.
    // A temporary network failure must not remove otherwise valid demos.
    if (check?.url && check.status !== null && check.status >= 400 && repositoryHomepage(check.url) === repositoryHomepage(project.liveUrl ?? null)) {
      return { ...project, liveUrl: undefined, liveUnavailable: true };
    }
    return project;
  });
}

export function mergeGitHubProjects(curated: Project[], repositories: GitHubRepository[]): Project[] {
  const byName = new Map(curated.map(project => [project.githubUrl.split('/').filter(Boolean).pop()!.toLowerCase(), project]));
  const projects = repositories.map(repo => {
    const existing = byName.get(repo.name.toLowerCase());
    if (existing) return {
      ...existing,
      githubUrl: repo.html_url,
      liveUrl: repositoryHomepage(repo.homepage) ?? existing.liveUrl,
      categoryBadge: `${existing.categoryBadge}${repo.fork ? ' · FORK' : ''}${repo.archived ? ' · ARCHIVED' : ''}`,
    };
    return {
      id: `github-${repo.name.toLowerCase()}`,
      title: repo.name,
      subtitle: repo.fork ? 'Public GitHub repository · Fork' : 'Public GitHub repository',
      category: 'other' as const,
      categoryBadge: repo.archived ? 'GITHUB · ARCHIVED' : repo.fork ? 'GITHUB · FORK' : 'GITHUB PROJECT',
      description: repo.description || `Explore the source code${repo.language ? ` written primarily in ${repo.language}` : ''}, files, and project documentation on GitHub.`,
      highlights: [
        ...(repo.language ? [`Primary language reported by GitHub: ${repo.language}`] : []),
        ...(repo.topics.length ? [`Repository topics: ${repo.topics.join(', ')}`] : []),
        ...(repo.fork ? ['Forked repository; see GitHub for the original project and contribution history.'] : []),
        ...(repo.archived ? ['Archived repository, available for reference.'] : []),
      ],
      techStack: [repo.language, ...repo.topics].filter((value): value is string => Boolean(value)),
      githubUrl: repo.html_url,
      liveUrl: repositoryHomepage(repo.homepage),
      accentColor: '#ffffff',
      iconName: 'Code2',
      previewType: 'repository' as const,
    };
  });
  // Keep the authored case studies first, followed by all additional repositories.
  const order = new Map(curated.map((project, index) => [project.id, index]));
  return projects.sort((a, b) => (order.get(a.id) ?? curated.length) - (order.get(b.id) ?? curated.length));
}
