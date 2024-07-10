#!/bin/sh
npx prisma generate
npx prisma migrate dev --name=test
# npx prisma db push
npm run start