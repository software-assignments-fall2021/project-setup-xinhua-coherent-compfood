#!/bin/bash

cd front-end

echo " >>> Building frontend <<<"
docker build -t compfood_frontend -f Dockerfile .
echo " >>> Frontend built <<<"

cd ..
cd back-end

echo " >>> Building backend <<<"
docker build -t compfood_backend -f Dockerfile .
echo " >>> Backend built <<<"
