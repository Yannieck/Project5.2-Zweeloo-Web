const express = require("express");
const router = express.Router();
const auth = require('../../../middleware/auth');
const geofencecontroller = require('../../../bin/geofencecontroller');
const HSC = require("http-status-codes");
const XMLRefactor = require('../../../middleware/XMLRefactors');
const ContentTypeCheck = require('../../../middleware/contenttypecheck');

router.get('/:id', async(req, res) => {
    const id = parseInt(req.params.id);
    try {
        const geofence = await geofencecontroller.getGeofenceById(id);
        if(!geofence) {
            if(req.header('accept') === 'application/xml') {
                const xmlres = XMLRefactor.apiErrorBuilder(404, 'Geofence not found');
                return res.set('Content-Type', 'application/xml').send(xmlres);
            } else {
                return res.send({ message: "Geofence not found!" });
            }
        } else {
            if(req.header('accept') === 'application/xml') {
                const xmlres = XMLRefactor.geofenceResponse(geofence);
                return res.set('Content-Type', 'application/xml').status(HSC.Statuscodes.OK).send(xmlres);
            } else {
                return res.status(HSC.StatusCodes.OK).send(geofence);
            }
        }
    } catch (e) {
        if(req.header('accept') === 'application/xml') {
            const xmlres = XMLRefactor.apiErrorBuilder(500, 'Internal server error');
            return res.set('Content-Type', 'application/xml').send(xmlres);
        } else {
            return res.status(500).send({err: 'Internal server error'})
        }
    }
});

router.post('/newgeofence', auth, ContentTypeCheck.checkGeofenceCreate, async(req, res) => {
    let data;
    if(req.is('application/xml')) {
        data = XMLRefactor.geofenceRequestParser(req.rawBody);
    } else {
        data = req.body;
    }

    try {
        await geofencecontroller.createGeofence(data);

        if(req.header('accept') === 'application/xml') {
            const xmlres = XMLRefactor.apisuccessresponse(201, 'Geofence created');
            return res.set('Content-Type', 'application/xml').status(HSC.Statuscodes.OK).send(xmlres);
        } else {
            return res.status(HSC.Statuscodes.OK).json({ message: "Geofence created!" });
        }
    } catch (e) {
        if(req.header('accept') === 'application/xml') {
            const xmlres = XMLRefactor.apiErrorBuilder(400, "Bad request");
            return res.set('Content-Type', 'application/xml').send(xmlres);
        } else {
            return res.status(HSC.Statuscodes.BAD_REQUEST).send(e);
        }
    }
});

router.delete('/deletegeofence/:id', auth, async(req, res) => {
    try {
        const id = parseInt(req.params.id);
        const result = await geofencecontroller.deleteGeofence(id);

        if(result) {
            if(req.header('accept') === 'application/xml') {
                const xmlres = XMLRefactor.succesfulDeleteResponse({code: 200, message: 'Geofence deleted succesfully!'});
                return res.set('Content-Type', 'application/xml').status(HSC.Statuscodes.OK).send(xmlres);
            } else {
                return res.status(HSC.Statuscodes.OK).send({message: 'Geofence deleted succesfully!'})
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
            return res.status(HSC.Statuscodes.BAD_REQUEST).send(e);
        }
    }
})

router.get('/geofencesfromroute/:route_id', async(req, res) => {
    const route_id = parseInt(req.params.route_id);

    try {
        const geofences = await geofencecontroller.getGeofencesFromRoute(route_id);

        if (!geofences || geofences.length === 0) {
            if(req.header('accept') === 'application/xml') {
                const xmlres = XMLRefactor.apiErrorBuilder(404, 'Geofences not found!');
                return res.set('Content-Type', 'application/xml').send(xmlres);
            } else {
                return res.send({ message: "Geofences not found!" });
            }
        } else {
            const geofences = await geofencecontroller.getGeofencesFromRoute(route_id);
            if(req.header('accept') === 'application/xml') {
                const xmlres = XMLRefactor.allGeofencesAtRouteResponse(geofences);
                return res.set('Content-Type', 'application/xml').status(HSC.Statuscodes.OK).send(xmlres);
            } else {
                return res.status(HSC.StatusCodes.OK).send(geofences);
            }
        }
    } catch (e) {
        if(req.header('accept') === 'application/xml') {
            const xmlres = XMLRefactor.apiErrorBuilder(500, 'Internal server error');
            return res.set('Content-Type', 'application/xml').send(xmlres);
        } else {
            return res.status(500).send({err: 'Internal server error'})
        }
    }
});

router.post('/editgeofence/:id', auth, ContentTypeCheck.checkGeofenceEdit, async(req, res) => {
    const id = parseInt(req.params.id);
    let data;
    if(req.is('application/xml')) {
        data = XMLRefactor.geofenceUpdateRequestParser(req.rawBody);
    } else {
        data = req.body;
    }

    try {
        await geofencecontroller.updateGeofence(id, {
            order_number: data.order_number,
            name: data.name,
            description: data.description,
            location: data.location,
            artist: data.artist,
            technique: data.technique,
            size: data.size,
            collection: data.collection,
            route_id: data.route_id
        });
        const geofence = await geofencecontroller.getGeofenceById(id);

        if(req.header('accept') === 'application/xml') {
            const xmlres = XMLRefactor.geofenceResponse(geofence);
            return res.set('Content-Type', 'application/xml').status(HSC.Statuscodes.OK).send(xmlres);
        } else {
            return res.status(HSC.Statuscodes.OK).send(geofence);
        }
    } catch (e) {
        if(req.header('accept') === 'application/xml') {
            const xmlres = XMLRefactor.apiErrorBuilder(500, 'Updating data failed');
            return res.set('Content-Type', 'application/xml').send(xmlres);
        } else {
            return res.status(500).send({err: 'Updating data failed!'})
        }
    }
});


module.exports = router;