const express = require("express");
const router = express.Router();
const routecontroller = require('../../../bin/routecontroller');
const Statuscodes = require("http-status-codes");
const XMLRefactor = require("../../../middleware/XMLRefactors");
const auth = require('../../../middleware/auth');
const ContentTypeCheck = require('../../../middleware/contenttypecheck');

router.get('/route/:id', async(req, res) => {
    const id = parseInt(req.params.id);

    try {
        const route = await routecontroller.getRouteById(id);
        if(!route) {
            return res.status(Statuscodes.NOT_FOUND).json({ message: "A route with this id does not exist!" });
        }

        if(req.header('accept') === 'application/xml') {
            const xmlres = XMLRefactor.routeResponse(route);
            return res.set('Content-Type', 'application/xml').status(Statuscodes.OK).send(xmlres);
        } else {
            return res.status(Statuscodes.OK).send(route);
        }
    } catch (e) {
        if(req.header('accept') === 'application/xml') {
            const xmlres = XMLRefactor.apiErrorBuilder(500, "Internal server error");
            return res.set('Content-Type', 'application/xml').send(xmlres);
        } else {
            console.log(e)
            return res.status(Statuscodes.INTERNAL_SERVER_ERROR).send(e);
        }
    }
});


router.get('/allroutes', async(req, res) => {
    try {
        const routes = await routecontroller.getAllRoutes();
        if(!routes || routes.length === 0) {
            if(req.header('accept') === 'application/xml') {
                const xmlres = XMLRefactor.apiErrorBuilder(404, 'Routes not found!');
                return res.set('Content-Type', 'application/xml').status(Statuscodes.NOT_FOUND).send(xmlres);
            } else {
                return res.send({ message: "Routes not found!" });
            }
        } else {
            if (req.header('accept') === 'application/xml') {
                const xmlres = XMLRefactor.allRoutesResponse(routes);
                return res.set('Content-Type', 'application/xml').status(Statuscodes.OK).send(xmlres);
            } else {
                return res.status(Statuscodes.OK).json(routes);
            }
        }
    } catch (e) {
        if(req.header('accept') === 'application/xml') {
            const xmlres = XMLRefactor.apiErrorBuilder(500, 'Getting all routes failed');
            return res.set('Content-Type', 'application/xml').send(xmlres);
        } else {
            return res.status(Statuscodes.INTERNAL_SERVER_ERROR).send({ err: 'Getting all routes failed'});
        }
    }
});

router.get('/allroutesnames', async(req, res) => {
    try {
        const routes = await routecontroller.getAllRoutesNames();
        if(!routes || routes.length === 0) {
            if(req.header('accept') === 'application/xml') {
                const xmlres = XMLRefactor.apiErrorBuilder(404, 'Routes not found!');
                return res.set('Content-Type', 'application/xml').status(Statuscodes.NOT_FOUND).send(xmlres);
            } else {
                return res.send({ message: "Routes not found!" });
            }
        } else {
            if (req.header('accept') === 'application/xml') {
                const xmlres = XMLRefactor.allRoutesNamesResponse(routes);
                return res.set('Content-Type', 'application/xml').status(Statuscodes.OK).send(xmlres);
            } else {
                return res.status(Statuscodes.OK).json(routes);
            }
        }
    } catch (e) {
        if(req.header('accept') === 'application/xml') {
            const xmlres = XMLRefactor.apiErrorBuilder(500, 'Getting all routes with names failed');
            return res.set('Content-Type', 'application/xml').send(xmlres);
        } else {
            return res.status(Statuscodes.INTERNAL_SERVER_ERROR).send({ err: 'Getting all routes with names failed'});
        }
    }
});

router.post('/createroute', auth, ContentTypeCheck.checkRouteCreate, async(req, res) => {
    let data;
    if(req.is('application/xml')) {
        data = XMLRefactor.routeRequestParser(req.rawBody);
    } else {
        data = req.body;
    }

    try {
        const route = await routecontroller.getRoute(data);
        if(route) {
            if(req.header('accept') === 'application/xml') {
                const xmlres = XMLRefactor.apiErrorBuilder(409, "Route already exists!");
                return res.set('Content-Type', 'application/xml').send(xmlres);
            } else {
                return res.send({
                    code: 409,
                    error: "Route already exists!"
                });
            }
        }
        const new_route = await routecontroller.createRoute(data.name, data.route_type, data.route, data.user_id);
        if(new_route) {
            const created_route = await routecontroller.getRouteById(data.id);
            if(req.header('accept') === 'application/xml') {
                const xmlres = XMLRefactor.routeResponse(created_route);
                return res.set('Content-Type', 'application/xml').status(Statuscodes.OK).send(xmlres);
            } else {
                return res.status(Statuscodes.OK).json(created_route);
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
            const xmlres = XMLRefactor.apiErrorBuilder(400, "Bad request");
            return res.set('Content-Type', 'application/xml').send(xmlres);
        } else {
            return res.status(Statuscodes.BAD_REQUEST).send(e);
        }
    }
});

router.delete('/deleteroute/:id', async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await routecontroller.deleteRoute(id);

        if(result) {
            if(req.header('accept') === 'application/xml') {
                const xmlres = XMLRefactor.succesfulDeleteResponse({code: 200, message: 'User deleted succesfully!'});
                return res.set('Content-Type', 'application/xml').status(Statuscodes.OK).send(xmlres);
            } else {
                return res.status(Statuscodes.OK).send({message: 'User deleted succesfully!'})
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
            return res.status(Statuscodes.BAD_REQUEST).send(e);
        }
    }
});

module.exports = router;