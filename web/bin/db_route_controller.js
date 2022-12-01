const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const togeojson = require("@tmcw/togeojson");
const DOMParser = require("xmldom").DOMParser;
const HCS = require("http-status-codes");

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

    static createRoute = async (req, res) => {
        try {
            //Convert the form data to data the database wants
            const type = req.body.routetype === "walk" ? "WALK" : "BIKE";
            const wheelchair = req.body.wheelchair === "yes" ? true : false;
            const distance = 10;

            //Get the json data from the GPX file
            const gpxString = Buffer.from(req.file.buffer).toString();
            const gpx = new DOMParser().parseFromString(gpxString);
            const route = togeojson.gpx(gpx);

            //Create route
            const new_route = await prisma.route.create({
                data: {
                    name: req.body.name,
                    route: route,
                    description: req.body.description,
                    distance: distance,
                    extra: req.body.extra,
                    type: type,
                    wheelchair: wheelchair,
                },
            });

            //Redirect when done
            if (new_route) {
                res.status(HCS.StatusCodes.OK).redirect(
                    `/routes-editor/register_success`
                );
            } else {
                return res
                    .status(HCS.StatusCodes.BAD_REQUEST)
                    .redirect(`/routes-editor/failed_create_route`);
            }
        } catch (e) {
            return res
                .status(HCS.StatusCodes.BAD_REQUEST)
                .redirect(`/routes-editor/unknown_error`);
        }
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
