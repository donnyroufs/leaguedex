#!/bin/bash

  GREEN='\033[0;32m'
  NC='\033[0m'

  echo -e "${GREEN}Step 1: Starting docker-compose.yml"
    docker-compose up -d
    sleep 1

  echo -e "${GREEN}Step 2: Migrating database"
    yarn prisma migrate up --experimental
    yarn prisma generate

  echo -e "${GREEN}Step 3: Seeding database"
    node ./prisma/seeders/index.js

  echo -e "${GREEN}Step 4: Starting application (front/back)"
    cd ../
    yarn run:dev

