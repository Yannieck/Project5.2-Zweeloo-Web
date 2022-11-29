const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PoiController {
    static async getAllPoisFromRoute(route_id) {
        return prisma.poi.findMany({
            where: {
                route_id: route_id
            },
            select: {
                name: true,
                lat: true,
                lon: true,
                description: true,
                audio_src: true,
                route_id: true
            }
        });
    }

    static async createPoi(name, lat, lon, description, audio_src, route_id) {
        return prisma.poi.create({
            data: {
                name: name,
                lat: lat,
                lon: lon,
                description: description,
                audio_src: audio_src,
                route_id: route_id
            }
        })
    }

    static async updatePoi(id, name, lat, lon, description, audio_src, route_id) {
        return await prisma.poi.update({
            where: {
                id: id
            },
            data: {
                name: name,
                lat: lat,
                lon: lon,
                description: description,
                audio_src: audio_src,
                route_id: route_id
            }
        })
    }

    static async deletePoi(id) {
        return await prisma.poi.delete({
            where: {
                id: id
            }
        })
    }
}

module.exports = PoiController;