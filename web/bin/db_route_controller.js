const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const togeojson = require("@tmcw/togeojson");
const DOMParser = require("xmldom").DOMParser;
const HCS = require("http-status-codes");
var Distance = require("geo-distance");

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

    static async getBikeRoutes() {
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
            where: {
                type: "BIKE",
            },
        });
    }

    static async getWalkRoutes() {
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
            where: {
                type: "WALK",
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

            //Get the json data from the GPX file
            const gpxString = Buffer.from(req.file.buffer).toString();
            const gpx = new DOMParser().parseFromString(gpxString);
            const route = togeojson.gpx(gpx);

            //Calculate the distance based of the geojson
            const distance = this.getDistanceFromGeoJSON(route);

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
                    `/route-poi-editor/${new_route.id}/1`
                );
            } else {
                return res
                    .status(HCS.StatusCodes.BAD_REQUEST)
                    .redirect(`/route-info-editor/failed_create_route`);
            }
        } catch (e) {
            console.log(e);
            return res
                .status(HCS.StatusCodes.BAD_REQUEST)
                .redirect(`/route-info-editor/route_unknown_error`);
        }
    };

    static async deleteRoute(id) {
        return prisma.route.delete({
            where: {
                id: id,
            },
        });
    }

    static getDistanceFromGeoJSON(json) {
        const coords = json.features[0].geometry.coordinates;
        let totalDist = 0; //In meters
        for (let i = 0; i < coords.length - 1; i++) {
            //Get the current coord and the next coord
            const coord1 = { lat: coords[i][0], lon: coords[i][1] };
            const coord2 = { lat: coords[i + 1][0], lon: coords[i + 1][1] };
            //Compare the two coords and get the distance
            totalDist += parseFloat(
                Distance.between(coord1, coord2).human_readable().distance
            );
        }
        //Take 75% of the distance. Research concluded the calculation was always off by a value around 75%
        const accurateDist = (totalDist / 4) * 3;
        //Convert the distance to kilometers and round to one decimal
        const distInKm = Math.round(accurateDist / 100) / 10;

        return distInKm;
    }
}

module.exports = RouteController;
