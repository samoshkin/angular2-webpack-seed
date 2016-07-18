#!/usr/bin/env bash

set -euo pipefail
IFS=$'\n\t'

# cd to repository root dir
cd "$(dirname "$0")/.."

printf "Copy git hooks to .git directory";
[ -d .git/hooks/ ] && cp -p "bin/pre-commit-hook.sh" ".git/hooks/pre-commit";
