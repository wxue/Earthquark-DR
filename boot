#!/bin/bash

function runServer
{
    node .
}   # end of runServer

function backgroundRunServer
{
    node . &
}   # end of backgroundRunServer

function installDependences
{
    npm install
}   # end of installDependences

function runDB
{
    service mongod start
}   # end of runDB


function usage
{
    echo "usage: boot [-i] [-b] | [-e] [-d] | [-h]"
    echo "  Options:
                    [-i | --api]                    : run API server
                    [-b | --bgrun]                  : run API server in background
                    [-e | --env]                    : env setup, install dependences
                    [-d | --db]                     : start mongoDB
                    [-h | --help]                   : check script usage
        "
}

#####
##### Main
#####

if [ "$1" = "" ]; then
   usage
fi

while [ "$1" != "" ]; do
    case $1 in
        -i | --api )                    runServer
                                        ;;
        -b | --bgrun )                  backgroundRunServer
                                        ;;
        -e | --env )                    installDependences
                                        ;;
        -d | --db )                     runDB
                                        ;;
        -h | --help )                   usage
                                        # exit
                                        ;;
        * )                             usage
                                        # exit 1
    esac
    shift
done
