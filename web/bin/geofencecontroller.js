const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Geofencecontroller {
    static async getGeofence(geofence) {
        return prisma.geofence.findUnique({
            where: {
                geofence
            }
        });
    }

    static async getGeofenceById(id) {
        return prisma.geofence.findUnique({
            select: {
                id: true,
                order_number: true,
                name: true,
                description: true,
                location: true,
                artist: true,
                technique: true,
                size: true,
                collection: true,
                route_id: true
            },
            where: {
                id: id
            }
        });
    }

    static async getGeofencesFromRoute(route_id) {
        return prisma.geofence.findMany({
            select: {
                id: true,
                order_number: true,
                name: true,
                description: true,
                location: true,
                artist: true,
                technique: true,
                size: true,
                collection: true,
                route_id: true
            },
            where: {
                route_id: route_id
            }
        });
    }

    static async createGeofence(geofence) {
        const {order_number, name, description, location, artist, technique, size, collection, route_id} = geofence;
        return prisma.geofence.create({
            data: {
                order_number,
                name,
                description,
                location,
                artist,
                technique,
                size,
                collection,
                route_id
            }
        })
    }

    static async updateGeofence(id, data) {
        return await prisma.geofence.update({
            where: {
                id
            },
            data
        });
    }

    static async deleteGeofence(id) {
        return await prisma.geofence.delete({
            where: {
                id
            }
        })
    }
}

module.exports = Geofencecontroller;