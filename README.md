# About

Keep track of your played matchup(s) in any role, have an overview of most common build items, used runes,
personalized notes, share your leaguedex with other players and more!

## Developer Notes

### Setup

There are 2 requires .env files, look for the example env files and fill them in. When that's done,
you need to run the migrations:

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

- [Home Page](https://leaguedex.com)
- [Staging Page](https://staging.leaguedex.com)
- [insecure Staging Page](http://staging.leaguedex.com)
- [Design Figma](https://www.figma.com/file/LKOTO3yHEvZXIYbJFiIdQk/Untitled?node-id=0%3A1)
