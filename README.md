## How to running the app

1. install package
```bash
$ pnpm install
```

2. Change env DB
```
DATABASE_URL="mysql://USERNAME:PASSWORD@localhost:3306/DATABASE_NAME"
```

3. prisma migrate db (ensure your db server active)
``` bash
$ pnpm dlx prisma migrate dev
```

4. Running the app
``` bash
$ pnpm start:dev
```

5. Go to graphql playground http://localhost:3000/graphql 