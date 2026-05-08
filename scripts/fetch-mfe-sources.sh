#!/usr/bin/env bash
set -euo pipefail

TOKEN="${GITHUB_TOKEN:-}"
BASE_URL="https://github.com/gsrosa"

if [ -n "$TOKEN" ]; then
  BASE_URL="https://${TOKEN}@github.com/gsrosa"
fi

clone_src() {
  local repo="$1"
  local dest="$2"

  echo "[fetch-mfe] cloning $repo/src → .mfe-sources/$dest"
  rm -rf ".mfe-sources/$dest"

  git clone \
    --depth=1 \
    --filter=blob:none \
    --sparse \
    --no-tags \
    "${BASE_URL}/${repo}.git" \
    ".mfe-sources/$dest"

  cd ".mfe-sources/$dest"
  git sparse-checkout set src
  cd ../..
}

mkdir -p .mfe-sources

clone_src "nexploring-ai-assistant" "ai-assistant"
clone_src "nexploring-user"         "user"
clone_src "nexploring-payment"      "payment"

echo "[fetch-mfe] done"
