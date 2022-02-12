#!/bin/bash

set -eu

dev() {
  errors="$(cat <<EOF
nextjs/cms-drupal
EOF
)"
  export NODE_OPTIONS=--openssl-legacy-provider
  for i in ${errors}; do rm -rf "${i}"; done
  name="$(find . -not -path "*/node_modules/*" -type f -name next.config.js -exec dirname "{}" \;| sort -u | fzf --color=dark --border=rounded --header="Select Example to Start Server (only one allowed)" --cycle --ansi --select-1)"
  cd "${name}" || { echo Invalid: "${name}"; exit 1; }
  pkill --full "${name}" || true
  echo "> updating: ${PWD}"
  pnpm update --silent
  pnpm run dev
}

external() {
  external="$(cat <<EOF
https://github.com/ChangoMan/nextjs-typescript-mdx-blog.git
https://github.com/ebenezerdon/nextjs-graphql-morty-app
https://github.com/ebenezerdon/nextjs-mdx-blog

https://github.com/JS-DevTools/next-mdx.git
https://github.com/hashicorp/next-mdx-remote.git
https://github.com/leerob/nextjs-prism-markdown
https://github.com/Rose-stack/static-nextjs-blog-with-typescript-mdx-tailwindcss.git
https://github.com/santhalakshminarayana/santhalakshminarayana.github.io
https://github.com/shuding/nextra.git
https://github.com/timlrx/tailwind-nextjs-starter-blog
EOF
)"
  mkdir -p external 
  cd external
  for i in ${external}; do 
    name="$(basename "${i}" .git)"
    test -d "${name}" || git clone --quiet "${i}"
  done
  cd - >/dev/null
}

nextjs() { test -d nextjs || svn export --quiet https://github.com/vercel/next.js/trunk/examples nextjs; }

setup() {
  cd "$(dirname "$0")"
  top="$(git top)"
  repo="${0##*/}"
  if ! grep -qR "export PATH=\"${PWD}:" /etc/profile.d; then 
    echo "# created by: ${PWD}/${0##*/}"| sudo tee "/etc/profile.d/${repo}.sh" >/dev/null
    echo "export PATH=\"${PWD}:\${PATH}\"" | sudo tee -a "/etc/profile.d/${repo}.sh" >/dev/null
  fi
  cd "${top}"
  mkdir -p examples 
  cd examples 
}

vercel() { 
  clone="$(cat <<EOF
nextjs-portfolio-starter 
next-rsc-demo 
next-server-components
preview-mode-demo
platforms
static-fun
vrs
EOF
)"
  tmp="$(mktemp -d)"
  if ! test -d vercel; then 
    git clone --quiet https://github.com/vercel/examples.git "${tmp}"; 
    mkdir -p vercel
    mv "${tmp}/edge-functions" vercel
    mv "${tmp}/solutions" vercel
    svn export --quiet https://github.com/vercel/vercel/trunk/examples/nextjs vercel/nextjs
    svn export --quiet https://github.com/vercel/commerce/trunk/site vercel/commerce
    for i in ${clone}; do 
      test -f vercel/"${i}" || git clone --quiet https://github.com/vercel/"${i}".git vercel/"${i}"
    done
  fi
}

main() {
  setup
  external
  nextjs
  vercel
  dev
}

main