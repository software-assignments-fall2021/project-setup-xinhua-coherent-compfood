#!/bin/bash

cd front-end

podman run --name compfood_frontend --publish 61002:61002 compfood_frontend >/dev/null &
echo "Frontend started"

cd ..
cd back-end

podman run --name compfood_backend --volume .env:/root/.env --publish 61001:61001 compfood_backend >/dev/null &
echo "Backend started"
