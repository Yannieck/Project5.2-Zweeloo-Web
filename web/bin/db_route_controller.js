const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class RouteController {
    /**
     * Get a specific route from the database
     * @param {int} id
     * @returns a route object
     */
    static async getRouteById(id) {
        return prisma.route.findUnique({
            where: {
                id,
            },
            include: {
                poi: true,
                node: true,
            },
        });
    }

    /**
     * Get all bike routes from the database
     * @returns an array with all bike route objects
     */
    static async getBikeRoutes() {
        return prisma.route.findMany({
            select: {
                id: true,
                name: true,
                route: true,
                description: true,
                distance: true,
                extra: true,
                type: true,
                wheelchair: true,
            },
            where: {
                type: "BIKE",
            },
        });
    }

    /**
     * Get all walk routes from the database
     * @returns an array with all walk route objects
     */
    static async getWalkRoutes() {
        return prisma.route.findMany({
            select: {
                id: true,
                name: true,
                route: true,
                description: true,
                distance: true,
                extra: true,
                type: true,
                wheelchair: true,
            },
            where: {
                type: "WALK",
            },
        });
    }

    /**
     * Get all routes from the database
     * @returns an array with all route objects
     */
    static async getAllRoutes() {
        return prisma.route.findMany({
            select: {
                id: true,
                name: true,
                route: true,
                description: true,
                distance: true,
                extra: true,
                type: true,
                wheelchair: true,
            },
        });
    }

    /**
     * Creates a route in the database
     * @param {string} name
     * @param {GeoJSON object} route
     * @param {string} description
     * @param {float} distance
     * @param {string} extra
     * @param {Enum(WALK, BIKE)} type
     * @param {boolean} wheelchair
     * @returns the created route object
     */
    static createRoute = async (
        name,
        route,
        description,
        distance,
        extra,
        type,
        wheelchair
    ) => {
        return prisma.route.create({
            data: {
                name: name,
                route: route,
                description: description,
                distance: distance,
                extra: extra,
                type: type,
                wheelchair: wheelchair,
            },
        });
    };

    static async deleteRoute(id) {
        return prisma.route.delete({
            where: {
                id: id,
            },
        });
    }
}

module.exports = RouteController;
