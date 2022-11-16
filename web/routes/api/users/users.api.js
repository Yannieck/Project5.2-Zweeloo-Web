const express = require('express');
const router = express.Router();
const usercontroller = require('../../../bin/usercontroller');
const auth = require('../../../middleware/auth');
const authservice = require('../../../config/authservice');
const HCS = require('http-status-codes');
const XMLRefactor = require("../../../middleware/XMLRefactors");
const ContentTypeCheck = require('../../../middleware/contenttypecheck');

router.get('/allUsers', auth, async(req, res) => {
    try {
        const users = (await usercontroller.getAllUsers());
        if(!users || users.length === 0) {
            if(req.header('accept') === 'application/xml') {
                const xmlres = XMLRefactor.apiErrorBuilder(404, "Could not find any users!");
                return res.set('Content-Type', 'application/xml').send(xmlres);
            } else {
                return res.json({ message: "No users found!" });
            }
        } else {
            if(req.header('accept') === 'application/xml') {
                const xmlres = XMLRefactor.allUsersResponse(users);
                return res.set('Content-Type', 'application/xml').status(HSC.StatusCodes.OK).send(xmlres);
            } else {
                return res.status(HSC.StatusCodes.OK).json(users);
            }
        }
    } catch (e) {
        if(req.header('accept') === 'application/xml') {
            const xmlres = XMLRefactor.apiErrorBuilder(500, "Internal server error");
            return res.set('Content-Type', 'application/xml').send(xmlres);
        } else {
            return res.status(HSC.StatusCodes.INTERNAL_SERVER_ERROR).send();
        }
    }
});

router.get('/:id', auth, async(req, res) => {
    const id = parseInt(req.params.id);

    try {
        const user = await usercontroller.getUserById(id);
        if (user) {
            const safe_user = authservice.getSafeData(user);
            if(req.header('accept') === 'application/xml') {
                const xmlres = XMLRefactor.userResponse(safe_user);
                return res.set('Content-Type', 'application/xml').status(HSC.StatusCodes.OK).send(xmlres);
            } else {
                return res.status(HSC.StatusCodes.OK).json(safe_user);
            }
        } else {
            if(req.header('accept') === 'application/xml') {
                const xmlres = XMLRefactor.apiErrorBuilder(404, "User not found");
                return res.set('Content-Type', 'application/xml').send(xmlres);
            } else {
                return res.send({message: "User not found"});
            }
        }
    } catch (e) {
        if(req.header('accept') === 'application/xml') {
            const xmlres = XMLRefactor.apiErrorBuilder(500, "Internal server error");
            return res.set('Content-Type', 'application/xml').send(xmlres);
        } else {
            return res.status(HSC.StatusCodes.INTERNAL_SERVER_ERROR).send();
        }
    }
});

router.post('/edit/:id', auth, ContentTypeCheck.checkUserEdit, async(req, res) => {
    const id = parseInt(req.params.id);
    let data;
    if(req.is('application/xml')) {
        data = XMLRefactor.updateRequestParser(req.rawBody);
    } else {
        data = req.body;
    }

    try {
        await usercontroller.updateUser(id, data);
        const user = await usercontroller.getUserById(id);

        if(req.header('accept') === 'application/xml') {
            const xmlres = XMLRefactor.userResponse(user);
            return res.set('Content-Type', 'application/xml').status(HSC.StatusCodes.OK).send(xmlres);
        } else {
            return res.status(HSC.StatusCodes.OK).send(user);
        }
    } catch(e) {
        if(req.header('accept') === 'application/xml') {
            const xmlres = XMLRefactor.apiErrorBuilder(500, 'Updating data failed');
            return res.set('Content-Type', 'application/xml').send(xmlres);
        } else {
            return res.status(500).send({err: 'Updating data failed!'})
        }
    }
});

router.delete('/deleteuser/:id', auth, async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await usercontroller.deleteUser(id);

        if(result) {
            if(req.header('accept') === 'application/xml') {
                const xmlres = XMLRefactor.succesfulDeleteResponse({code: 200, message: 'User deleted succesfully!'});
                return res.set('Content-Type', 'application/xml').status(HSC.StatusCodes.OK).send(xmlres);
            } else {
                return res.status(HSC.StatusCodes.OK).send({message: 'User deleted succesfully!'})
            }
        } else {
            if(req.header('accept') === 'application/xml') {
                const xmlres = XMLRefactor.apiErrorBuilder(400, "Bad request");
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
            const xmlres = XMLRefactor.apiErrorBuilder(400, "Bad request");
            return res.set('Content-Type', 'application/xml').send(xmlres);
        } else {
            return res.status(HSC.StatusCodes.BAD_REQUEST).send(e);
        }
    }
});

module.exports = router;
