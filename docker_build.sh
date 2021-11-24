#!/bin/bash

cd front-end

echo " >>> Building frontend <<<"
podman build -t compfood_frontend -f Dockerfile .
echo " >>> Frontend built <<<"

cd ..
cd back-end

echo " >>> Building backend <<<"
podman build -t compfood_backend -f Dockerfile .
echo " >>> Backend built <<<"
