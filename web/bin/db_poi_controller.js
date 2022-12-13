const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const HCS = require("http-status-codes");

class PoiController {
    static async getAllPoisFromRoute(route_id) {
        return prisma.poi.findMany({
            where: {
                route_id: route_id,
            },
            select: {
                name: true,
                lat: true,
                lon: true,
                description: true,
                audio_src: true,
                route_id: true,
            },
        });
    }

    static async createPoiWithAudio(req, res) {
        try {
            //Create the poi
            const poi = await prisma.poi.create({
                data: {
                    name: req.body.name,
                    lat: parseFloat(req.body.lat),
                    lon: parseFloat(req.body.lon),
                    description: req.body.desc,
                    audio_src: req.file.filename,
                    route_id: parseInt(req.body.routeid),
                    radius: parseInt(req.body.radius),
                    type: req.body.type,
                },
            });
            //Redirect when done
            if (poi) {
                //Redirect to the selected point by adding the routeid and selected point to the url
                res.status(HCS.StatusCodes.OK).redirect(`/route-poi-editor/${req.body.routeid}/${req.body.selected}/poi_success`);
            } else {
                return res
                    .status(HCS.StatusCodes.BAD_REQUEST)
                    .redirect(`/route-poi-editor/${req.body.routeid}/${req.body.selected}/failed_create_poi`);
            }
        } catch (e) {
            console.log(e);
            return res
                .status(HCS.StatusCodes.BAD_REQUEST)
                .redirect(`/route-poi-editor/${req.body.routeid}/${req.body.selected}/poi_unknown_error`);
        }
    }

    static async createPoiNoAudio(
        name,
        lat,
        lon,
        description,
        route_id,
        radius,
        type
    ) {
        return prisma.poi.create({
            data: {
                name: name,
                lat: lat,
                lon: lon,
                description: description,
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
        return await prisma.poi.update({
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
        return await prisma.poi.delete({
            where: {
                id: id,
            },
        });
    }
}

module.exports = PoiController;
