#!/bin/bash

podman stop compfood_frontend
echo " >>> Frontend stopped <<<"
podman stop compfood_backend
echo " >>> Backend stopped <<<"

podman container rm compfood_frontend
podman container rm compfood_backend
echo " >>> Cleaned up containers <<<"
