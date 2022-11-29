const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class LogController {
    static async getAllLogs() {
        return prisma.log.findMany({
            select: {
                id: true,
                type: true,
                datetime: true,
                user_id: true,
                route_id: true
            }
        });
    }

    static async getLogByUser(user_id) {
        return prisma.log.findMany({
            where: {
                user_id: user_id
            }
        });
    }

    static async getLogByRoute(route_id) {
        return prisma.log.findMany({
            where: {
                route_id: route_id
            }
        });
    }

    static async createLog(type, datetime, user_id, route_id) {
        return prisma.log.create({
            data: {
                type: type,
                datetime: datetime,
                user_id: user_id,
                route_id: route_id
            }
        })
    }

    static async updateUser(id, type, datetime, user_id, route_id) {
        return await prisma.log.update({
            where: {
                id: id
            },
            data: {
                type: type,
                datetime: datetime,
                user_id: user_id,
                route_id: route_id
            }
        })
    }

    static async deleteUser(id) {
        return await prisma.log.delete({
            where: {
                id: id
            }
        })
    }
}

module.exports = LogController;