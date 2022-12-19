const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class PoiController {
    /**
     * Gets a POI from the database
     * @param {int} id
     * @returns the poi with the id
     */
    static async getPoi(id) {
        return prisma.poi.findUnique({
            where: {
                id,
            },
            include: {
                poi_img: true,
            },
        });
    }

    /**
     * Creates a POI in the database
     * @param {string} name
     * @param {float} lat
     * @param {float} lon
     * @param {string} description
     * @param {string} audio_src
     * @param {int} route_id
     * @param {int} radius
     * @param {Enum(POI, INFO, INVIS, CAFE)} type
     * @returns the created POI
     */
    static async createPoi(name, lat, lon, description, audio_src, route_id, radius, type) {
        return prisma.poi.create({
            data: {
                name: name,
                lat: lat,
                lon: lon,
                description: description,
                audio_src: audio_src,
                route_id: route_id,
                radius: radius,
                type: type,
            },
        });
    }

    static async updatePoi(
        id,
        name,
        lat,
        lon,
        description,
        audio_src,
        route_id
    ) {
        return prisma.poi.update({
            where: {
                id: id,
            },
            data: {
                name: name,
                lat: lat,
                lon: lon,
                description: description,
                audio_src: audio_src,
                route_id: route_id,
            },
        });
    }

    static async deletePoi(id) {
        return prisma.poi.delete({
            where: {
                id: id,
            },
        });
    }
}

module.exports = PoiController;
