$ErrorActionPreference = 'Stop'
$repos = (Get-Content src/data/githubRepositories.json -Raw | ConvertFrom-Json).repositories
$curated = Get-Content src/data/portfolioData.ts -Raw
$checks = (Get-Content src/data/projectLinkStatus.json -Raw | ConvertFrom-Json).results
foreach ($repo in $repos) {
  $name = $repo.name.ToLower()
  $url = $repo.homepage
  if (!$url) {
    $pattern = "githubUrl: 'https://github.com/workofcharan/" + [regex]::Escape($repo.name) + "',\s*liveUrl: '([^']+)'"
    $match = [regex]::Match($curated, $pattern, 'IgnoreCase')
    if ($match.Success) { $url = $match.Groups[1].Value }
  }
  if ($url -and $url -notmatch '^https?://') { $url = 'https://' + $url }
  $check = $checks | Where-Object { $_.name -ieq $repo.name -and $_.url -eq $url -and $_.status -ge 400 }
  if (!$url -or $check) { $url = $repo.html_url }
  & npm.cmd exec --yes --package=@playwright/test -- playwright screenshot --channel chrome --viewport-size '1440,900' --wait-for-timeout 5000 --timeout 45000 $url "public/project-previews/$name.png"
  if ($LASTEXITCODE -ne 0) { Write-Warning "Preview capture failed for $name" }
}
