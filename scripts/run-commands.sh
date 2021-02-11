#!/bin/sh
# this will contain the code deployment/run commands
# execute this subroutine when the cloning part is done
# this is kept separate because the installation and deployment
# may vary from project to project
VERSION_DIRECTORY=$1

# get inside the version directory
cd $VERSION_DIRECTORY

# install the required dependencies
yarn install

# boot up the installation
yarn start
