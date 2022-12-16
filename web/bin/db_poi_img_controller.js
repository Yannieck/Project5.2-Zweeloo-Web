const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

class PoiImgController {
    /**
     * Get the images for a specific POI
     * @param {int} poi_id
     * @returns all images for the POI
     */
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

    /**
     * Create a image for a POI
     * @param {int} poi_id 
     * @param {string} src
     * @returns the created image
     */
    static async createPoiImg(poi_id, src) {
        return prisma.poi_img.create({
            data: {
                poi_id: poi_id,
                src: src
            }
        })
    }

    static async updatePoiImg(poi_id, src) {
        return prisma.poi_img.update({
            where: {
                poi_id: poi_id
            },
            data: {
                src: src
            }
        })
    }

    static async deletePoiImg(poi_id, src) {
        return prisma.poi_img.delete({
            where: {
                poi_id: poi_id,
                src: src
            }
        })
    }
}

module.exports = PoiImgController;