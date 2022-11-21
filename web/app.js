const express = require("express");
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const xmlparser = require('express-xml-bodyparser')

app.use(cors());
app.use(cookieParser());

app.set('view engine', 'pug');
app.set('views', './views');

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use(xmlparser());

app.use('/scripts', express.static('public'));
app.use('/validations', express.static('validation'));
app.use('/images', express.static('public/assets/img'));

app.use('/', require('./routes'));

app.listen(3000, () => {
    console.log("Server running on port 3000")
}).on('error', (err) => {
    process.once('SIGUSR2', () => {
        process.kill(process.pid, 'SIGINT');
    });

    process.on('SIGINT', () => {
        process.kill(process.pid, 'SIGINT');
    });

    process.on('uncaughtException', (err) => {
        console.log('UNCAUGHT EXCEPTION');
        console.log('inside uncaught exception :' + err);
    })
});