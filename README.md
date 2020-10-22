![Leaguedex Home](https://i.imgur.com/nS3L6Mb.png)

# About

Leaguedex is created for users that either are terrible in remembering how to play a given matchup,
or want to write guides for other users to use with ease. It detects when you are in a game and
allows you to write really specific notes for that given matchup.

## Developer Notes

**NOTICE**: There will be a docker env setup in the near future.

### Setup

There are 2 required .env files within the server folder, look for the example.env files and save those as `.env`.
When that's done, make sure to create a database and then run our migrations:

```
npx prisma migrate save --experimental
npx prisma migrate up --experimental
npx prisma generate
```

> Run both the server and client

```
yarn global add concurrently

> leaguedex/
yarn run:dev
```

Our development branch is our default branch which is also linked to our staging url. Everything that gets merged
will be updated live. Incase you want to help us out, look thru the issues, and make a pull request.

### Links

- [Production](https://leaguedex.com)
- [Staging](https://staging.leaguedex.com)
- [Design](https://www.figma.com/file/LKOTO3yHEvZXIYbJFiIdQk/Untitled?node-id=0%3A1)
- [Twitter](https://twitter.com/league_dex)
