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



# Pulling drivers and deleteing their tests
echo -e "${BLUE}Installing Needed Drivers${NC}"
go get -u github.com/go-sql-driver/mysql
cd src/github.com/go-sql-driver/mysql/
if test -f "auth_test.go"; then
    rm auth_test.go benchmark_test.go conncheck_test.go driver_go110_test.go driver_test.go dsn_test.go errors_test.go packets_test.go statement_test.go utils_test.go
fi
cd -
echo -e "${GREEN}Success\n${NC}"



echo -e "${BLUE}Pulling latest version of code${NC}"
# Pull the latest version of the codebase
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



# Running go fmt on all files
echo -e "${BLUE}Formatting all .go files${NC}"
go fmt ./...
echo -e "${GREEN}Success\n${NC}"




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
