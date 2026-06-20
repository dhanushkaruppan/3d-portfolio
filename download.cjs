const fs = require('fs');
const https = require('https');

const urls = {
  "home.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzkyZjU5MDViMmI3ODRlYjg5YmY3M2Q5MTQzZmQyODMwEgsSBxDLhYKl2AUYAZIBIwoKcHJvamVjdF9pZBIVQhMxNTcwNTYwODc5OTY0NjcyNTE4&filename=&opi=89354086",
  "experience.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzMwYTRiMDRiZGRhMzRlM2I4NmQ0NjcxYjI5YTg4MmIxEgsSBxDLhYKl2AUYAZIBIwoKcHJvamVjdF9pZBIVQhMxNTcwNTYwODc5OTY0NjcyNTE4&filename=&opi=89354086",
  "projects.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2RlNzE3YWY4MzIwMzRjODNhMjNjZTQ5NDViMmY4NDU5EgsSBxDLhYKl2AUYAZIBIwoKcHJvamVjdF9pZBIVQhMxNTcwNTYwODc5OTY0NjcyNTE4&filename=&opi=89354086",
  "contact.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzc2MjhlOTdiMWUyNjQ2M2U4YWE4Yzk3NzgyZGQ0ZDUzEgsSBxDLhYKl2AUYAZIBIwoKcHJvamVjdF9pZBIVQhMxNTcwNTYwODc5OTY0NjcyNTE4&filename=&opi=89354086"
};

fs.mkdirSync('stitch_screens', { recursive: true });

Object.entries(urls).forEach(([filename, url]) => {
  https.get(url, (res) => {
    const file = fs.createWriteStream(`stitch_screens/${filename}`);
    res.pipe(file);
    file.on('finish', () => {
      file.close();
      console.log(`Downloaded ${filename}`);
    });
  });
});
