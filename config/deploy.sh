#!/bin/bash
if [ "$TRAVIS_BRANCH" == "master" ]; then
  git config --global user.email "farhioren+travis@gmail.com"
  git config --global user.name "travis-ci"
  npm run build:prod
  git fetch -all
  git checkout -b gh-pages origin/gh-pages
  rm *.*
  rm -rf fonts
  rm -rf assets
  rm -rf coverage
  cp -av dist/ ./
  git status
  git add . -u
  git commit -m "deployed commit ${TRAVIS_COMMIT} from travis"
  git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
fi