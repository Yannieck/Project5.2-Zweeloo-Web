const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class NodeController {
    static async getAllNodesFromRoute(route_id) {
        return prisma.node.findMany({
            where: {
                route_id: route_id
            },
            select: {
                id: true,
                index: true,
                lat: true,
                lon: true
            }
        });
    }

    static async createNode(index, lat, lon, route_id) {
        return prisma.node.create({
            data: {
                index: index,
                lat: lat,
                lon: lon,
                route_id: route_id
            }
        })
    }

    static async updateNode(id, index, lat, lon, route_id) {
        return await prisma.node.update({
            where: {
                id: id
            },
            data: {
                index: index,
                lat: lat,
                lon: lon,
                route_id: route_id
            }
        })
    }

    static async deleteNode(id) {
        return await prisma.node.delete({
            where: {
                id: id
            }
        })
    }
}

module.exports = NodeController;