#!/bin/zsh
set -e
cd "$(dirname "$0")"
if ! command -v xcodegen >/dev/null 2>&1; then
  echo "XcodeGen이 없습니다. Homebrew로 설치합니다."
  if ! command -v brew >/dev/null 2>&1; then
    echo "Homebrew가 필요합니다: https://brew.sh"
    exit 1
  fi
  brew install xcodegen
fi
xcodegen generate
open ELDYNWatchTest.xcodeproj
