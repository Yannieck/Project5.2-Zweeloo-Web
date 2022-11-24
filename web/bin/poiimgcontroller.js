const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PoiImgController {
    static async getAllImgFromPoi(poi_id) {
        return prisma.poi_img.findMany({
            where: {
                poi_id: poi_id
            },
            select: {
                src: true
            }
        });
    }

    static async createPoi(poi_id, src) {
        return prisma.poi_img.create({
            data: {
                poi_id: poi_id,
                src: src
            }
        })
    }

    static async updatePoi(poi_id, src) {
        return await prisma.poi_img.update({
            where: {
                poi_id: poi_id
            },
            data: {
                src: src
            }
        })
    }

    static async deletePoi(poi_id, src) {
        return await prisma.poi_img.delete({
            where: {
                poi_id: poi_id,
                src: src
            }
        })
    }
}

module.exports = PoiImgController;