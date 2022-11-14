<!--suppress ALL -->
<h1 align="center" id="logo">
  <a href="https://kunstenaarsdorpzweeloo.nl">
    <img src="https://kunstenaarsdorpzweeloo.nl/wp-content/uploads/2017/06/logohighres.png" alt="Stichting Kunstenaarsdorp Zweeloo" title="Stichting Kunstenaarsdorp Zweeloo" height="60" />
  </a>
</h1>

<p align="center">
    <a href="#about">About</a> •    
    <a href="#getting-started">Getting Started</a> •
    <a href="#documentation">Documentation</a> •
    <a href="#extra">Extra</a>
</p>

<hr/>

<h1 align="center" id="about">About</h1>

<hr/>

<h2 align="center" id="about">Used Techniques</h2>

<p align="center">
    <img src="https://img.shields.io/badge/NPM-%23000000.svg?style=&logo=npm&logoColor=white" alt=""/>
    <img src="https://img.shields.io/badge/JWT-black?style=&logo=JSON%20web%20tokens" alt=""/>
    <img src="https://img.shields.io/badge/node.js-6DA55F?style=&logo=node.js&logoColor=white" alt=""/>
</p>

<p align="center">
    <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=&logo=javascript&logoColor=%23F7DF1E" alt=""/>
    <img src="https://img.shields.io/badge/Prisma-3982CE?style=&logo=Prisma&logoColor=white" alt=""/>
    <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=&logo=tailwind-css&logoColor=white" alt=""/>
    <img src="https://img.shields.io/badge/Pug-FFF?style=&logo=pug&logoColor=A86454" alt=""/>
</p>

<br/>

<h2 align="center" id="about">The Teams</h2>

<p align="center">
  <b>Phase 1</b><br/>
  ⛹ Hylke Sijbesma<br />
  ⛹ Justin Heijne<br />
  ⛹ Niels Stevens <br />
  ⛹ Arjan Loof <br />
  <br />
  <b>Phase 2</b><br/>
  ⛹ Thijs Janse<br />
  ⛹ Robin van Dijk<br />
  ⛹ Dennis Schomaker<br />
  ⛹ Franca Baars<br />
  ⛹ Yannieck Blaauw<br />
  <br/>
</p>

<hr />

<h1 align="center" id="getting-started">Getting Started </h1>

<hr />

<h2>Requirements</h2>

This project runs with Nodejs and NPM.

It also requires you to have a sql server running.

A JAVA_HOME environment variable is required for XSD datavalidations.

You can download the NodeJS runtime and the NPM package manager that comes with Nodejs from [Nodejs downloads page](https://nodejs.org/en/download/). During the first development phase of this project version 16.x of Node was used.

You can download a JDK file from the [Oracle docs website](https://www.oracle.com/java/technologies/downloads/#jdk18-windows).

> **Please note:**
> this project is **not compatible** with NodeJS **versions < 16.x**.
> this project **needs** a **JAVA_HOME** environment variable (which contains a path to a JDK).

<br/>
<h2> Installation </h2>

1. Make sure you meet the requirements.
2. Clone this repository to your local machine.
3. Make sure your JAVA_HOME environment variable is set.
4. Make sure your MySQL server is running.
5. Create a new database called `skz`.
6. CD into the root folder of this project.
7. Add a new file called `.env` to the root folder.
8. Add the <a href="#extra">.env content</a> to the .env file.
9. Run the following command:

```shell
npm install
```

10. If you are pulling new commits, make sure you have the latest version of the project by running the install command again.

<br/>

<h2>Running</h2>

**Please note:**
This project is NOT shipped with an SQL export of the database.
[Prisma ORM](https://www.prisma.io/) handles the database connection and schema management.
This means you should either generate the client, or push the database schema to the server.

To push the database schema to the server, use the following command. Make sure that you have a database called 'skz'.

```shell
npm run database:push
```

<br/>
If you want to pull the schema from the existing database, updating the prisma.schema, run:

```shell
npm run database:pull
```

<br/>
Prisma requires database clients to be generated, and the database schema to be pushed to the server (which you have already done in the first step).
Execute the following command to generate the database client:

```shell
npm run @prismaclient:generate
```

<br/>
We now have set up the database client and the database schema has been pushed to the server. Start the development server by running the following command:

```shell
npm run startdev
```

This will run a development environment server, which uses nodemon for restarting after changes.
<br/>

After you've completed the above steps, you can run the project by running the following command:

```shell
npm run <SCRIPT NAME>
```

**You can also run the scripts from the package.json file, this requires you to have IntelliJ installed.**
<br/><br/>

<hr>

<h1 align="center" id="documentation">Documentation </h1>

<hr />

This project is written in JavaScript (ES6) and uses the JSDoc tool to generate the documentation.

**You can read more advanced info about the used frameworks here.**

http://expressjs.com/en/api.html

https://tailwindcss.com/

https://pugjs.org/

https://ajv.js.org/

https://github.com/nikku/node-xsd-schema-validator

https://sweetalert.js.org/

https://html-to-pug.com/

https://devhints.io/pug

http://www.passportjs.org/

https://axios-http.com/docs/intro

https://nodemon.io/

https://github.com/prettymuchbryce/http-status-codes

https://github.com/kelektiv/node.bcrypt.js#readme

https://github.com/NaturalIntelligence/fast-xml-parser

<hr />

<h1 align="center" id="extra">Extra</h1>

Make sure to change the `.env` file (app secret, domain and database_url) when running the project in a production environment. <br>

Template for a `.env` file:

```shell
DOMAIN = 'localhost'
NODE_ENV = development
APP_SECRET = <app_secret>
DATABASE_URL = "mysql://root@localhost:3306/skz"
```

`DOMAIN`: The server domain
`NODE_ENV`: Express environment variable for production status
`APP_SECRET`: JWS secret
`DATABASE_URL`: Link to the database

<hr />

<p align="center">
  <a href="#logo">Back to top</a>
</p>
