#!/bin/sh
# this script file will pull the git repository
DIRECTORY=../versions
REPOSITORY=$1
BRANCH=$2

cd $DIRECTORY
echo "Cloning the branch into the directory..."
git clone --branch $BRANCH $REPOSITORY $BRANCH

echo "Configuring the instance..."
yarn install
echo "Booting up the instance"
yarn start