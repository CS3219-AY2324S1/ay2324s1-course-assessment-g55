# Simple TypeScript Script Example

This example shows how to use [Prisma Client](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client) in a **simple TypeScript script** to read and write data in a PostgreSQL in AWS RDS

## Getting started

Copy `.env.example` and rename the file to `.env`

Get the connection string from the telegram chat and replace the sample local host with the dev connection string.

```
cd ./backend/sample-prisma-test
npm install
npm run generate
npm run reset
y
npm run dev
```

If the output looks like this means you've successfully connected to the database!

```shell
francisyzy@Pro14 sample-prisma-test % npm run dev

> dev
> ts-node ./script.ts

Created users: Alice (1 post) and Bob (2 posts)
Retrieved all published posts: [object Object],[object Object]
Created a new post: [object Object]
Published the newly created post: [object Object]
```

## Next steps

- Check out the [Prisma docs](https://www.prisma.io/docs)
- Share your feedback in the [`#product-wishlist`](https://prisma.slack.com/messages/CKQTGR6T0/) channel on the [Prisma Slack](https://slack.prisma.io/)
- Create issues and ask questions on [GitHub](https://github.com/prisma/prisma/)
- Watch our biweekly "What's new in Prisma" livestreams on [Youtube](https://www.youtube.com/channel/UCptAHlN1gdwD89tFM3ENb6w)
