// GitHub REST API client for JavaScript: https://github.com/octokit/rest.js
// GitHub REST API Reference: https://docs.github.com/en/rest/reference
// Full documentation: https://octokit.github.io/rest.js/v18

const { Octokit } = require("@octokit/rest");

async function request(owner = process.env.VERCEL_GIT_REPO_OWNER, repo){
  const octokit = new Octokit({ auth: process.env.TOKEN });
  octokit.rest.repos
  .listForUser({
    username: owner,
    type: 'owner',
  })
  .then(({ data }) => {
    // handle data
  });
}

export default async function handler(req, res) {
  const response = await request(req.query.owner, req.query.repo)
  await request(req.query.owner, req.query.repo)
  console.log(response)
  res.status(200).json({ value: `${req.query.owner}/${req.query.repo}`,
    description: response.data[req.query.data] })
}
// TODO: User, default values
