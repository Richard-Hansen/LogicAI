#!/usr/bin/env bash
################################################################################
# Environmental setup for backend                                              #
# Feel free to add other env things here, please dont break something :)       #
# Run `chmod -x envsetup.sh` to give the script perms
# Run `. envsetup.sh` to run the script                                      #
################################################################################
# Colors
RED='\033[0;31m'
NC='\033[0m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'

echo -e "${BLUE}Setting GOPATH${NC}"
export GOPATH=$PWD
# Should set your GOPATH to your working directory where package main is
printenv | grep GOPATH
echo -e "${GREEN}Success\n${NC}"

echo -e "${BLUE}Pulling latest version of code${NC}"

# Pull the latest version of the codebase and checking output
if git pull; then
    echo -e "${GREEN}Success\n${NC}"
else
    echo -e "${RED}FAILURE, could not pull most recent code${NC}"
fi

echo -e "${BLUE}Running Tests${NC}"

# Run all the tests
if go test ./... -bench=...; then
  echo -e "${GREEN}Success\n${NC}"
else
  echo -e "${RED}FAILURE, tests did not pass\n${NC}"
fi

# For fun.
if which coinmon; then
  echo -e "${RED}Would you like to check crypto prices?${NC}"
  read -p "(Y/n):" answer
  if [ "$answer" = "y" ]; then
    coinmon
  else
    echo -e "${RED}OK :(\n${NC}"
  fi
else
  echo -e "${RED}Would you like to check crypto prices?${NC}"
  read -p "(Y/n):" answer
  if [ "$answer" = "y" ]; then
    sudo npm install -g coinmon
    coinmon
  else
    echo -e "${RED}OK :(${NC}"
  fi
fi
