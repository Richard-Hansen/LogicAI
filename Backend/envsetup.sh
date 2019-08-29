#!/usr/bin/env bash
################################################################################
# Environmental setup for backend                                              #
# Feel free to add other env things here, please dont break something :)       #
# Run `chmod -x envsetup.sh` to give the script perms
# Run `. envsetup.sh` to run the script                                      #
################################################################################
export GOPATH=$PWD
# Should set your GOPATH to your working directory where package main is
printenv | grep GOPATH
