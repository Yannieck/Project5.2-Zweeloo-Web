const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class Routecontroller {
    static async getRoute(route) {
        return prisma.route.findUnique({
            where: {
                route
            }
        })
    }

    static async getAllRoutes() {
        return prisma.route.findMany({
            select: {
                id: true,
                name: true,
                route: true,
                updated_at: true,
                created_at: true,
                user_id: true
            }
        })
    }

    static async getAllRoutesNames() {
        return prisma.route.findMany({
            select: {
                id: true,
                name: true
            }
        })
    }

    static async getRouteById(id) {
        return prisma.route.findUnique({
            where: {
                id
            }
        });
    }

    static async createRoute(name, route_type, route, user_id) {
        return prisma.route.create({
            data: {
                name,
                route_type,
                route,
                user_id
            }
        })
    }

    static async deleteRoute(id) {
        return prisma.route.delete({
            where: {
                id
            }
        });
    }
}

module.exports = Routecontroller;