#!/bin/bash

docker stop compfood_frontend
echo " >>> Frontend stopped <<<"
docker stop compfood_backend
echo " >>> Backend stopped <<<"

docker container rm compfood_frontend
docker container rm compfood_backend
echo " >>> Cleaned up containers <<<"
