# About

Keep track of your played matchup(s) in any role, have an overview of most common build items, used runes,
personalized notes, share your leaguedex with other players and more!

## Developer Notes

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

- [Production Website](https://leaguedex.com)
- [Staging Website](https://staging.leaguedex.com)
- [Design Figma](https://www.figma.com/file/LKOTO3yHEvZXIYbJFiIdQk/Untitled?node-id=0%3A1)
