#!/bin/bash

COMMAND=$1
BRANCH=$2

case $COMMAND in
  deploy)
    docker-compose -f docker-compose.yml up -d --build
    ;;
  update)
    docker-compose -f docker-compose.yml pull
    docker-compose -f docker-compose.yml up -d --build
    ;;
  remove)
    docker-compose -f docker-compose.yml down
    ;;
esac
