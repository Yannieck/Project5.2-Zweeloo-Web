const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class RouteController {
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

    static async createRoute(
        name,
        route,
        description,
        distance,
        extra,
        type,
        wheelchair
    ) {
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
    }

    static async deleteRoute(id) {
        return prisma.route.delete({
            where: {
                id: id,
            },
        });
    }
}

module.exports = RouteController;
