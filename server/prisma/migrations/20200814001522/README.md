# Migration `20200814001522`

This migration has been generated by Donny Roufs at 8/14/2020, 2:15:22 AM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
ALTER INDEX "public"."Token.user_id_unique" RENAME TO "Token_user_id"
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20200813235026..20200814001522
--- datamodel.dml
+++ datamodel.dml
@@ -2,9 +2,9 @@
 // learn more about it in the docs: https://pris.ly/d/prisma-schema
 datasource db {
   provider = "postgresql"
-  url = "***"
+  url = "***"
 }
 generator client {
   provider = "prisma-client-js"
@@ -58,9 +58,9 @@
 model Token {
   id        Int      @id @default(autoincrement())
   token     String
-  user_id   Int      @unique
+  user_id   Int
   createdAt DateTime @default(now())
   updatedAt DateTime @updatedAt
   user      User     @relation(fields: [user_id], references: [id])
 }
```

