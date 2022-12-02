# Stichting Kunstenaarsdorp Zweeloo Route Editor

The Stichting Kunstenaarsdorp Zweeloo Route Editor is a web editor for creating routes. These routes will be used in the [Stichting Kunstenaarsdorp Zweeloo Mobile App](https://github.com/BroederToon/Project5.2-Zweeloo).

![NPM](https://img.shields.io/badge/NPM-%23000000.svg?style=&logo=npm&logoColor=white) ![JWT](https://img.shields.io/badge/JWT-black?style=&logo=JSON%20web%20tokens) ![NODE](https://img.shields.io/badge/node.js-6DA55F?style=&logo=node.js&logoColor=white)

![JS](https://img.shields.io/badge/javascript-%23323330.svg?style=&logo=javascript&logoColor=%23F7DF1E) ![PRISMA](https://img.shields.io/badge/Prisma-3982CE?style=&logo=Prisma&logoColor=white) ![TAILWIND](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=&logo=tailwind-css&logoColor=white) ![PUG](https://img.shields.io/badge/Pug-FFF?style=&logo=pug&logoColor=A86454)

## Requirements

This project runs with Nodejs and NPM.
You can download NodeJS and NPM (comes with Nodejs) from the [Nodejs downloads page](https://nodejs.org/en/download/). During the development phase, version [v16.17.0](https://nodejs.org/download/release/v16.17.0/) of Node was used.
You will also need an Apache Webserver and a MySQL database. For this we recommend using [XAMPP](https://www.apachefriends.org/).

## Installation

1. Make sure you have read and meet the requirements.
2. Clone this repository to your local machine.
3. Make sure your MySQL and Apache servers are running.
4. Create a new database called `skz`. If you use XAMPP you can create it via PHPMyAdmin.
5. Open the terminal and CD into the root folder of this project.
6. Import the database by running:

```shell
npm run database:push

npm run @prismaclient:generate
```

7. Add a new file called `.env` to the root folder.
8. Add the content to the .env file following the [.env-template](#env-template).
9. Run the following command:

```shell
npm i
```

> If you are pulling new commits, make sure you have the latest version of the project by running the install command again.

## Running

Start the development server by running the following command:

```shell
npm run startdev
```

To start the production server, use the following command:

```shell
npm run <NAME>
```

## Stakeholders

### Organisers

- Stichting Kunstenaarsdorp Zweeloo
- NHL Stenden Emmen - Informatica

#### Project Group Phase 1

- Hylke Sijbesma
- Justin Heijne
- Niels Stevens
- Arjan Loof

#### Project Group Phase 2

- Thijs Janse
- Robin van Dijk
- Dennis Schomaker
- Franca Baars
- Yannieck Blaauw

## References

- [Node.js](https://nodejs.org/en/)
- [Node.js v16.17.0](https://nodejs.org/download/release/v16.17.0/)
- [XAMPP](https://www.apachefriends.org/)
- [Json Web Tokens](https://jwt.io/)
- [Express docs](http://expressjs.com/en/api.html)
- [Prisma docs](https://www.prisma.io/)
- [Tailwind docs](https://tailwindcss.com/)
- [Pug docs](https://pugjs.org/)
- [Joi docs](https://joi.dev/api/?v=17.7.0)
- [Sweet Alert docs](https://sweetalert.js.org/)
- [Passport docs](http://www.passportjs.org/)
- [Nodemon docs](https://nodemon.io/)
- [HTTP Status Codes](https://www.npmjs.com/package/http-status-codes)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js#readme)
- [Axios docs](https://axios-http.com/docs/intro)

### .env Template

```shell
DOMAIN = 'localhost'
NODE_ENV = development
APP_SECRET = <app_secret>
DATABASE_URL = "mysql://username:password@domain:port/db-name"
```

- `DOMAIN`: The server domain
- `NODE_ENV`: Will be either `production` or `development` depending on the status of the project
- `APP_SECRET`: [JWS secret](https://jwt.io/)
- `DATABASE_URL`: Link to the database. In the case of this project, it will be `mysql://root@localhost:3306/skz`
