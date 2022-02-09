// Extendable client for GitHub's REST & GraphQL APIs:
// https://github.com/octokit/core.js
// GitHub REST API Reference: https://docs.github.com/en/rest/reference

const { Octokit } = require("@octokit/core");

async function request(owner = process.env.VERCEL_GIT_REPO_OWNER, repo){
  const octokit = new Octokit({ auth: process.env.TOKEN });
  return await octokit.request("GET /repos/{owner}/{repo}", {
    owner: owner,
    repo: repo,
  });
}

// curl -fsL "https://mnopi.com/api/git?owner=j5pu&repo=actions&data=description" | jq -r .description
export default async function handler(req, res) {
  const response = await request(req.query.owner, req.query.repo)
  await request(req.query.owner, req.query.repo)
  console.log(response)
  res.status(200).json({ value: `${req.query.owner}/${req.query.repo}`,
    description: response.data[req.query.data] })
}
