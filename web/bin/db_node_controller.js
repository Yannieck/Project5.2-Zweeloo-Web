const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class NodeController {
    /**
     * Creates a node in the database
     * @param {int} index 
     * @param {float} lat 
     * @param {float} lon 
     * @param {int} route_id 
     * @returns the created node
     */
    static async createNode(index, lat, lon, route_id) {
        return prisma.node.create({
            data: {
                index: index,
                lat: lat,
                lon: lon,
                route_id: route_id,
            },
        });
    }

    static async updateNode(id, index, lat, lon, route_id) {
        return prisma.node.update({
            where: {
                id: id,
            },
            data: {
                index: index,
                lat: lat,
                lon: lon,
                route_id: route_id,
            },
        });
    }

    static async deleteNode(id) {
        return prisma.node.delete({
            where: {
                id: id,
            },
        });
    }
}

module.exports = NodeController;
