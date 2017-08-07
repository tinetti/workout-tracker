#!/usr/bin/env bash

set -e

docker run --rm -i -e MONGO_URL=mongodb://$(minikube ip):27017 mongoclient/mongoclient

