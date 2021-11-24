#!/bin/bash

cd front-end

docker run --name compfood_frontend --publish 61002:61002 compfood_frontend >/dev/null &
echo "Frontend started"

cd ..
cd back-end

docker run --name compfood_backend --volume $(pwd)/.env:/root/.env --publish 61001:61001 compfood_backend >/dev/null &
echo "Backend started"
