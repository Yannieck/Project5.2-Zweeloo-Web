const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const HCS = require("http-status-codes");

class NodeController {
    static async getAllNodesFromRoute(route_id) {
        return prisma.node.findMany({
            where: {
                route_id: route_id,
            },
            select: {
                id: true,
                index: true,
                lat: true,
                lon: true,
            },
        });
    }

    static async createNode(req, res) {
        try {
            const node = await prisma.node.create({
                data: {
                    index: parseInt(req.body.nodenr),
                    lat: parseFloat(req.body.lat),
                    lon: parseFloat(req.body.lon),
                    route_id: parseInt(req.body.routeid),
                },
            });
            //Redirect when done
            if (node) {
                res.status(HCS.StatusCodes.OK).redirect(`/route-poi-editor/${req.body.routeid}/${req.body.selected}/poi_success`);
            } else {
                return res
                    .status(HCS.StatusCodes.BAD_REQUEST)
                    .redirect(`/route-poi-editor/${req.body.routeid}/${req.body.selected}/failed_create_poi`);
            }
        } catch (e) {
            return res
                .status(HCS.StatusCodes.BAD_REQUEST)
                .redirect(`/route-poi-editor/${req.body.routeid}/${req.body.selected}/poi_unknown_error`);
        }
    }

    static async updateNode(id, index, lat, lon, route_id) {
        return await prisma.node.update({
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
        return await prisma.node.delete({
            where: {
                id: id,
            },
        });
    }
}

module.exports = NodeController;
