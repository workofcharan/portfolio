import fs from 'node:fs/promises';
const snapshot = JSON.parse(await fs.readFile('src/data/githubRepositories.json','utf8'));
const results=[];
for(let offset=0;offset<snapshot.repositories.length;offset+=4){
 await Promise.all(snapshot.repositories.slice(offset,offset+4).map(async repo=>{
  const raw=repo.homepage;
  if(!raw){results.push({name:repo.name,url:null,status:null,working:false,reason:'No public deployment listed'});return;}
  const url=/^https?:\/\//.test(raw)?raw:'https://'+raw;
  try{
   const response=await fetch(url,{signal:AbortSignal.timeout(20000),redirect:'follow'});
   const body=await response.text();
   const requiresLogin = new URL(response.url).hostname === 'vercel.com' && new URL(response.url).pathname.startsWith('/login');
   results.push({name:repo.name,url,finalUrl:response.url,status:requiresLogin ? 401 : response.status,working:response.ok&&!requiresLogin&&!/DEPLOYMENT_NOT_FOUND|The deployment could not be found/i.test(body),title:body.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1]?.trim()??null});
  }catch(error){results.push({name:repo.name,url,status:null,working:false,reason:error.message});}
 }));
}
const report={checkedAt:new Date().toISOString(),results};
await fs.writeFile('src/data/projectLinkStatus.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report,null,2));
