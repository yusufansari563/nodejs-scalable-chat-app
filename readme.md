## scalable chat app with `docker` `kafka` `redis`

> Teck stack

* Nodejs
* ejs
* socketIO
* Redis(pub/sub)
* kafka(Store records in DB)
* MongoDB(Docker replicaset)
* Prisma ORM
* Bootstrap

## How to start

```
> npm i
> docker-compose up -d
> npx prisma generate
```
Open `localhost:4555`

If the records not inserted in the DB their might be issue with docker desktop
Follow below Article and enable one setting  which is 

![Screenshot_2](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*yeHnfVx9xOYlx-8C1lCxRQ.png)

[Article to make mongo replicaSet in more detail]("https://medium.com/workleap/the-only-local-mongodb-replica-set-with-docker-compose-guide-youll-ever-need-2f0b74dd8384")

