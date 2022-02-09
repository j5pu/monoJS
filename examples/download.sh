#!/bin/bash

set -eu

REPOS="$(cat <<EOF
https://github.com/timlrx/tailwind-nextjs-starter-blog
EOF
)"
DIRS="$(cat <<EOF
https://github.com/vercel/next.js/tree/canary/examples/with-mdx-remote
EOF
)"

cd "$(dirname "$0")"
cd "$(git top)"
mkdir -p examples 
cd examples 

for i in ${REPOS}; do 
  name="$(basename "${i}" .git)"
  test -d "${name}" || git clone --quiet "${i}"
done

while read -r i; do
  name="$(basename "${i}" .git)"
  test -d "${name}" || svn export --quiet "${i}"
done < <(sed 's|tree/main|trunk|; s|tree/master|trunk|; s|tree/canary|trunk|' <<< "${DIRS}")
