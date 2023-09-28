#! /usr/bin/bash

# backend
docker run -d -p 4444:3333 --env-file .env question-service

# frontend
pushd frontend
npm run dev
popd
