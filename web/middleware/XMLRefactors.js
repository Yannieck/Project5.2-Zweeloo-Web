const { XMLParser, XMLBuilder } = require('fast-xml-parser');
const parser = new XMLParser();
const builder = new XMLBuilder({
    format: true
});

class XMLRefactor {
    static loginRequestParser = (xml) => {
        const data = parser.parse(xml);
        return {
            email: data.login.user.email,
            password: data.login.user.password
        }
    }

    static registerRequestParser = (xml) => {
        const data = parser.parse(xml);
        return {
            email: data.register.user.email,
            password: data.register.user.password,
            password_repeat: data.register.user.password_repeat,
            first_name: data.register.user.first_name,
            last_name: data.register.user.last_name
        }
    }

    static updateRequestParser = (xml) => {
        const data = parser.parse(xml).user;
        return {
            email: data.email,
            first_name: data.first_name,
            last_name: data.last_name
        }
    }

    static routeRequestParser = (xml) => {
        const data = parser.parse(xml);
        return {
            name: data.name,
            route_type: data.route_type,
            route: data.route,
            user_id: data.user_id
        }
    }

    static geofenceRequestParser = (xml) => {
        const data = parser.parse(xml);
        return {
            order_number: data.geofence.order_number,
            name: data.geofence.name,
            description: data.geofence.description,
            location: data.geofence.location,
            artist: data.geofence.artist,
            technique: data.geofence.technique,
            size: data.geofence.size,
            collection: data.geofence.collection,
            route_id: data.geofence.route_id
        }
    }

    static apisuccessresponse = (code, message) => {
        const resobj = {
            response: {
                code: code,
                message: message
            }
        }

        return builder.build(resobj);
    }

    static responseBuilder = (code, err, redirect) => {
        const resobj = {
            response: {
                code: code,
                error: err,
                redirect: redirect
            }
        }

        return builder.build(resobj);
    }

    static errorBuilder = (code, err, redirect) => {
        const resobj = {
            response: {
                code: code,
                error: err,
                redirect: redirect
            }
        }

        return builder.build(resobj);
    }

    static apiErrorBuilder = (code, err) => {
        const resobj = {
            response: {
                code: code,
                error: err
            }
        }

        return builder.build(resobj);
    }

    static allUsersResponse = (data) => {
        const result = {
            users: {
                user: data
            }
        };

        const userbuilder = new XMLBuilder({
            arrayNodeName: 'user',
            format: true
        });

        return userbuilder.build(result);
    }

    static allRoutesResponse = (data) => {
        const result = {
            routes: {
                route: data
            }
        };

        const routebuilder = new XMLBuilder({
            arrayNodeName: 'route',
            format: true
        });

        return routebuilder.build(result);
    }

    static allRoutesNamesResponse = (data) => {
        const result = {
            routes: {
                route: {
                    data
                }
            }
        }

        const routebuilder = new XMLBuilder({
            arrayNodeName: 'route',
            format: true
        });

        return routebuilder.build(result);
    }

    static allGeofencesAtRouteResponse = (data) => {
        const result = {
            geofences: {
                geofence: data
            }
        }

        const geofencesbuilder = new XMLBuilder({
            arrayNodeName: 'geofence',
            format: true
        });

        return geofencesbuilder.build(result);
    }

    static userResponse = (data) => {
        const resobj = {
            user: {
                id: data.id,
                email: data.email,
                first_name: data.first_name,
                last_name: data.last_name,
                updated_at: data.updated_at,
                created_at: data.created_at
            }
        }

        return builder.build(resobj);
    }

    static routeResponse = (data) => {
        const resobj = {
            route: {
                id: data.id,
                name: data.name,
                route_type: data.route_type,
                route: data.route,
                updated_at: data.updated_at,
                created_at: data.created_at,
                user_id: data.user_id
            }
        }

        return builder.build(resobj);
    }

    static geofenceResponse = (data) => {
        const resobj = {
            geofence: {
                id: data.id,
                order_number: data.order_number,
                name: data.name,
                description: data.description,
                location: data.location,
                artist: data.artist,
                technique: data.technique,
                size: data.size,
                collection: data.collection,
                route_id: data.route_id
            }
        }

        return builder.build(resobj);
    }

    static geofenceUpdateRequestParser = (xml) => {
        const data = parser.parse(xml);
        return {
            order_number: data.geofence.order_number,
            name: data.geofence.name,
            description: data.geofence.description,
            location: data.geofence.location,
            artist: data.geofence.artist,
            technique: data.geofence.technique,
            size: data.geofence.size,
            collection: data.geofence.collection,
            route_id: data.geofence.route_id
        }
    }

    static succesfulDeleteResponse = (data) => {
        const resobj = {
            response: {
                code: data.code,
                message: data.message
            }
        }

        return builder.build(resobj);
    }
}

module.exports = XMLRefactor;