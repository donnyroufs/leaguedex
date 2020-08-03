# About

This application will record all the played matchups based on your account. That way you can navigate thru matchups,
and see your winrate, most common build items, and additional notes.

## Developer Notes

Merge development into master:

```
git fetch origin master
git merge master
git push origin development:master
```
Migrate Prisma:

```
npx prisma migrate save --experimental
npx prisma migrate uo --experimental
npx prisma generate

```

### Links

[Home Page, currently not live.](https://leaguedex.com]
[Figma Link](https://www.figma.com/file/LKOTO3yHEvZXIYbJFiIdQk/Untitled?node-id=0%3A1)
