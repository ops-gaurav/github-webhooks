#!/bin/sh
# exit when any command fails
set -e
# keep track of the last executed command
trap 'last_command=$current_command; current_command=$BASH_COMMAND' DEBUG
# echo an error message before exiting
trap 'echo "\"${last_command}\" command filed with exit code $?."' EXIT
# this script file will pull the git repository
DIRECTORY=../versions
REPOSITORY=$1
BRANCH=$2

# cd $DIRECTORY
# cd versions
# echo "Cloning the branch into the directory..."
# git clone --branch $BRANCH $REPOSITORY $BRANCH

# # cd $DIRECTORY/$BRANCH
# cd $BRANCH
# echo "Configuring the instance..."
# yarn install

# cd ../../scripts/ecosystem

# echo "configure the process configuration"
# node add-process.js config='{"script": "yarn start"}' $BRANCH
# sleep 5
# echo "Booting up the instance"
# cd ../../versions/$BRANCH
cd versions/$BRANCH
pwd
echo 'Launching the server instance...'
pm2 start config.json
# echo "instance version is now running...updating the process information..."
# cd ../../scripts/ecosystem/pm2
# node update-pid.js $BRANCH