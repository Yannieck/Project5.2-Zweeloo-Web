const usercontroller = require('./usercontroller');
const authservice = require('../config/authservice');
const Statuscodes = require('http-status-codes');
const XMLRefactor = require('../middleware/XMLRefactors');

class Authcontroller {
    static login = async(req, res) => {
        let data;
        if(req.is('application/xml')) {
            data = XMLRefactor.loginRequestParser(req.rawBody);
        } else {
            data = req.body;
        }

        try {
            const user = await usercontroller.getUser(data.email);
            if(!user) {
                if(req.header('accept-type') === 'application/xml') {
                    const xmlres = XMLRefactor.errorBuilder(404, "Could not find this user!", '/login');
                    return res.set('Content-Type', 'application/xml').send(xmlres);
                } else {
                    return res.send({
                        code: 404,
                        error: "Could not find this user!"
                    });
                }
            }

            const entered_password = data.password;
            const users_password = user.password;

            if(await authservice.isValid(entered_password, users_password)) {
                const tokenObject = authservice.issueJWT(user);

                if(req.header('accept') === 'application/xml') {
                    const xmlres = XMLRefactor.responseBuilder(200, 'no errors found', '/routeselection');
                    return res.cookie('jwt', tokenObject.token, {
                        signed: false,
                        httpOnly: true,
                        sameSite: 'Strict',
                        secure: true
                    }).set('Content-Type', 'application/xml').send(xmlres);
                } else {
                    const redirect = { code: 200, redirect: "/routeselection" };
                    return res.cookie('jwt', tokenObject.token, {
                        signed: false,
                        httpOnly: true,
                        sameSite: 'Strict',
                        secure: true
                    }).json(redirect);
                }
            } else {
                if(req.header('accept') === 'application/xml') {
                    const xmlres = XMLRefactor.responseBuilder(401, 'Invalid password', '/login');
                    return res.set('Content-Type', 'application/xml').send(xmlres);
                } else {
                    const redirect = { code: 401, redirect: '/login', error: 'invalid password' }
                    return res.json(redirect);
                }
            }
        } catch(e) {
            if(req.header('accept') === 'application/xml') {
                const xmlres = XMLRefactor.errorBuilder(400, "Bad request", '/login');
                return res.set('Content-Type', 'application/xml').send(xmlres);
            } else {
                return res.status(Statuscodes.BAD_REQUEST).send(e);
            }
        }
    }

    static register = async(req, res) => {
        let data;
        if(req.is('application/xml')) {
            data = XMLRefactor.registerRequestParser(req.rawBody);
        } else {
            data = req.body;
        }

        try {
            const user = await usercontroller.getUser(data.email);
            if (user) {
                if(req.header('accept') === 'application/xml') {
                    const xmlres = XMLRefactor.errorBuilder(409, "Email already taken", '/register');
                    return res.set('Content-Type', 'application/xml').send(xmlres);
                } else {
                    return res.send({
                        code: 409,
                        error: "This email is already taken!"
                    });
                }
            }

            const password = data.password;
            const password_rp = data.password_repeat;

            if (!authservice.comparePasswords(password, password_rp)) {
                if(req.header('accept') === 'application/xml') {
                    const xmlres = XMLRefactor.errorBuilder(403, "Passwords are not equal", '/register');
                    return res.set('Content-Type', 'application/xml').send(xmlres);
                } else {
                    return res.send({
                        code: 401,
                        message: "Passwords are not equal!"
                    });
                }
            }

            const hashed_password = authservice.hashPassword(password);

            const new_user = await usercontroller.createUser(data.email, hashed_password, data.first_name, data.last_name);
            if (new_user) {
                if(req.header('accept') === 'application/xml') {
                    const redirect = { redirect: '/login' };
                    const xmlres = XMLRefactor.responseBuilder(200, redirect)
                    return res.set('Content-Type', 'application/xml').status(Statuscodes.OK).send(xmlres);
                } else {
                    const redirect = { code: 200, redirect: '/login'};
                    res.status(Statuscodes.OK).json(redirect)
                }
            } else {
                if(req.header('accept') === 'application/xml') {
                    const xmlres = XMLRefactor.errorBuilder(400, "Bad request", '/register');
                    return res.set('Content-Type', 'application/xml').send(xmlres);
                } else {
                    return res.send({
                        code: 400,
                        message: "Bad request!"
                    });
                }
            }
        } catch (e) {
            if(req.header('accept') === 'application/xml') {
                const xmlres = XMLRefactor.errorBuilder(400, "Bad request", '/register');
                return res.set('Content-Type', 'application/xml').send(xmlres);
            } else {
                return res.status(Statuscodes.BAD_REQUEST).send(e);
            }
        }
    }
}

module.exports = Authcontroller;