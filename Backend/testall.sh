#!/usr/bin/env bash
################################################################################
# Environmental setup for backend                                              #
# Feel free to add other env things here, please dont break something :)       #
# Run `chmod -x envsetup.sh` to give the script perms                          #
# Run `. envsetup.sh` to run the script                                        #
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

# Run all the tests
if mocha Fractal-AI-Game/game/test/gameScreen.test.js && mocha Fractal-AI-Game/game/test/startScreen.test.js; then
  echo -e "${GREEN}Frontend Test Success\n${NC}"
else
  echo -e "${RED}FAILURE, frontend tests failed\n${NC}"
fi


echo -e "${BLUE}Running Tests${NC}"
# Run all the tests
if go test ./...; then
  echo -e "${GREEN}Success\n${NC}"
else
  echo -e "${RED}FAILURE, tests did not pass\n${NC}"
fi
cd src/gameLogic
if python agents_test.py && python callDatabases_test.py && python environment_test.py && python game_test.py && python AELinker.py; then
  echo -e "${GREEN}Success\n${NC}"
else
  echo -e "${RED}FAILURE, tests did not pass\n${NC}"
fi

cd ../..
