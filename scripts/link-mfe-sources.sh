#!/usr/bin/env bash
set -euo pipefail

mkdir -p .mfe-sources/ai-assistant .mfe-sources/user .mfe-sources/payment

ln -sfn "$(pwd)/../nexploring-ai-assistant/src" .mfe-sources/ai-assistant/src
ln -sfn "$(pwd)/../nexploring-user/src"         .mfe-sources/user/src
ln -sfn "$(pwd)/../nexploring-payment/src"      .mfe-sources/payment/src

echo "[link-mfe] symlinks created in .mfe-sources/"
