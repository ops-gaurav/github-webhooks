#!/bin/sh
# trigger to re-run the pm2 instance
# exit when any command fails
set -e
# keep track of the last executed command
trap 'last_command=$current_command; current_command=$BASH_COMMAND' DEBUG
# echo an error message before exiting
trap 'echo "\"${last_command}\" command filed with exit code $?."' EXIT
# this script file will pull the git repository
DIRECTORY=../versions
BRANCH=$1

echo 'configuring the instance configurations...'
cd ecosystem
node add-process.js config='{"script": "yarn start"}' $BRANCH

cd ../../versions/$BRANCH
echo 'Booting up the instance...'
pm2 start config.json

echo 'Updating the pid of the processes...'
cd ../../scripts/ecosystem/pm2
node update-pid.js $BRANCH