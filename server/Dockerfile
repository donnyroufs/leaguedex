#* ###########################
#* ##### Stage 0: Base #######
#* ###########################
FROM node:12.18.1-buster-slim AS base

# Ensure container is up to date
RUN apt-get update && apt-get install --no-install-recommends --yes openssl

# Establish working directory to contain application
WORKDIR /app

#* ###########################
#* #### Stage 1: Builder #####
#* ###########################
FROM base AS builder
COPY package.json yarn.lock ./

# Install Production Dependencies
RUN yarn install --production --pure-lockfile
RUN mkdir tmp && cp -a ./node_modules/. ./tmp/node_modules/

# Install Dev Dependencies
RUN yarn install --pure-lockfile

# Run Migrations
# Note: Uncomment this step if you want to run migrations
#       every time you build a new production version
# COPY prisma/migrations/ ./prisma/migrations/
# RUN npx prisma migrate up --experimental

# Generate Prisma Client
COPY prisma/schema.prisma ./prisma/schema.prisma
RUN npx prisma generate

# Copy source code
COPY /src/ ./src/

# Note: You don't seem to have a build script at the moment
#       If/ when you add one uncomment this step
# RUN yarn build

#* ###########################
#* ##### Stage 2: Runner #####
#* ###########################
FROM base AS runner

# Copy Production Dependencies
COPY --from=builder /app/tmp/node_modules/ ./node_modules/

# Copy Prisma Client files
COPY --from=builder /app/node_modules/@prisma/client/ ./node_modules/@prisma/client/
COPY --from=builder /app/node_modules/.prisma/client/ ./node_modules/.prisma/client/

# Copy compiled code
# If/ when you add a build script uncomment this step
# Note: If your build step outputs to a different location than `dist`,
#       make sure you update this step to reflect that
# COPY --from=builder /app/dist/ ./dist/

# Expose Port 5000 for connections
# Note: I chose 5000 because that is the value you have in your `example.env`,
#       if your app listens on a different port expose that port here instead
EXPOSE 5000

# Start the app using pm2
# Note: I do not personally use pm2 so I'm not 100% sure this is the correct syntax
# Note: Upon inspection of your package.json it seems you list pm2 as a devDependency
#       If you want to use pm2 to serve your app from within Docker (which I'm not sure you need)
#       you will need to move it to your regular dependencies
CMD [ "pm2", "start" "./src/index.js", "--name", "production_leaguedex" ]
