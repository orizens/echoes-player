#!/bin/bash
if [ "$TRAVIS_BRANCH" == "master" ]; then
  git config --global user.email "farhioren+travis@gmail.com"
  git config --global user.name "travis-ci"
  npm run build:prod
  npm run copy:domain
  npm run copy:heroku
  if [ -d "./dist" ]; then
    echo "PRODUCTION BUILD CREATED";
    cd dist
    git init
    git add .
    git commit -m "deployed commit ${TRAVIS_COMMIT} from travis"
    git push --force --quiet "https://${GH_TOKEN}@${GH_REF}" master:gh-pages > /dev/null 2>&1
  else
    echo "!!! PRODUCTION BUILD FAILED !!!";
  fi
fi