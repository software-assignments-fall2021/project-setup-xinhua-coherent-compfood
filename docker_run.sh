#!/bin/bash

cd front-end

docker run --name compfood_frontend --publish 61002:61002 huangascan/swe474-compfood-frontend:latest >/dev/null &
echo "Frontend started"

cd ..
cd back-end

docker run --name compfood_backend --volume $(pwd)/.env:/root/.env --publish 61001:61001 huangascan/swe474-compfood-backend:latest >/dev/null &
echo "Backend started"
