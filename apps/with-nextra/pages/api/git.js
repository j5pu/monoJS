// Extendable client for GitHub's REST & GraphQL APIs:
// https://github.com/octokit/core.js
// GitHub REST API Reference: https://docs.github.com/en/rest/reference

const { Octokit } = require("@octokit/core");
const { shaurl } = require("shaurl");

function parameters(req, res, route= "") {
  switch (req.query.index) {
    case "repos":
      req.query.key ??= "description";
      req.query.repo ??= "actions";
      return {
        "route": `GET /${req.query.index}/{owner}/{repo}${route}`,
        "options": {
          owner: req.query.owner,
          repo: req.query.repo
        }};
    case "search":
      if (req.query.key == null) {
        req.query.key ??= "repositories";
        req.query.map ??= "name";
      }
      req.query.prefix = "homebrew-";
      req.query.q ??= `${req.query.prefix}+user:${req.query.owner}`;
      req.query.q = 'q=' + encodeURIComponent(req.query.q)
      if (!req.query.q.includes(req.query.prefix)) {
        req.query.prefix = ""
      }
      return {
        "route": `GET /${req.query.index}/${req.query.key}${route}`,
        "options": {
          q: req.query.q
        }};
    case "users":
      req.query.key ??= "id";
      return {
        "route": `GET /${req.query.index}/{username}${route}`,
        "options": {
          username: req.query.owner
        }};
  }
}


async function request(req, res, route= "", exit = true) {

  const params = parameters(req, res, route);
  if (req.query.log !== "0") {
    console.log(req.query, params)
  }

  const octokit = new Octokit({ auth: process.env.TOKEN });
  await octokit.request(params.route, params.options)
  .then( function (response) {
    if (req.query.log !== "0") {
      console.log(response.data)
    }
    return response.data
  })
  .catch( function (response) {
    if (exit) {
      res.status(response.status).end()
    }
    return {}
  });

}

export default async function handler(req, res) {
  if (
    req.query.formula !== null ||
    req.query.latest !== null ||
    req.query.sha256 !== null ||
    req.query.tag !== null
  ) {
    req.query.index ??= "repos";
  }
  req.query.formula ??= "0";
  req.query.latest ??= "0";
  req.query.sha256 ??= "0";
  req.query.tag ??= "0";
  req.query.index ??= "search";
  req.query.owner ??= process.env.VERCEL_GIT_REPO_OWNER;
  req.query.log ??= "0";

  const data = await request(req, res);

  switch (req.query.index) {
    case "search":
      const arr = data.map(x => x[req.query.map].replace(req.query.prefix, ""));
      if (req.query.log !== "0") {
        console.log(arr)
      }
      res.status(200).end(arr.join('\n'));
      break;
    default:
      if (
        req.query.formula === "0" &&
        req.query.latest === "0" &&
        req.query.sha256 === "0" &&
        req.query.tag === "0"
      ) {
        res.status(200).end(data[req.query.key]);
      } else {
        const latest = await request(
          req, res, "/releases/latest", false
        )

        let tag = ""
        if (latest !== {}) {
          tag = latest["tag_name"]
        } else {
          const tags = await request(req, res,"/tags")
          tag = tags[0].name
        }

        const desc = data["description"]
        const homepage = data["html_url"]
        const url = `${data["html_url"]}/archive/${tag}.tar.gz`
        const sha256 = shaurl(url)

        if (req.query.log !== "0") {
          console.log(desc)
          console.log(homepage)
          console.log(url)
          console.log(sha256)
          console.log(tag)
        }

        if (req.query.formula !== "0") {
          res.status(200).end(`${desc}\n${homepage}\n${url}\n${sha256}\n`);
        } else if (req.query.latest !== "0") {
          res.status(200).end(url);
        } else if (req.query.sha256 !== "0") {
          res.status(200).end(sha256);
        } else if (req.query.tag !== "0") {
          res.status(200).end(sha256);
        }
      }
  }
}
