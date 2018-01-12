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

function updateSource
{
    node ./server/bin/update-earthquake-data.js &
}   # end of updateSource


function usage
{
    echo "usage: boot [-i] [-b] | [-e] [-d] [-u] | [-h]"
    echo "  Options:
                    [-i | --api]                    : run API server
                    [-b | --bgrun]                  : run API server in background
                    [-e | --env]                    : env setup, install dependences
                    [-d | --db]                     : start mongoDB
                    [-u | --source]                 : update data source
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
        -u | --source )                 updateSource
                                        ;;
        -h | --help )                   usage
                                        # exit
                                        ;;
        * )                             usage
                                        # exit 1
    esac
    shift
done
