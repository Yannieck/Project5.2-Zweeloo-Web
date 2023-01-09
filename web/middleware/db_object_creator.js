const RouteController = require("../bin/db_route_controller.js");
const PoiController = require("../bin/db_poi_controller.js");
const PoiImgController = require("../bin/db_poi_img_controller.js");
const NodeController = require("../bin/db_node_controller.js");
const UserController = require("../bin/db_user_controller");
const AuthService = require("../config/authservice");
const SponsorController = require("../bin/db_sponsor_controller");

const DOMParser = require("xmldom").DOMParser;
const togeojson = require("@tmcw/togeojson");
const HCS = require("http-status-codes");
const GeoDistance = require("geo-distance");

class DBObjectCreator {
    /**
    * middleware to create a sponsor in the database
    * @param {*} req
    * @param {*} res
    */
    static createSponsor = async (req, res) => {
        try {
            const createdSponsor = await SponsorController.createSponsor(
                req.body.sponsor_name,
                req.body.sponsor_address,
                req.file.filename,
                req.body.link
            );

            if (!createdSponsor) {
                return res
                    .status(HCS.StatusCodes.BAD_REQUEST)
                    .redirect(`/sponsor-editor/failed_create_route`);
            }

            res.status(HCS.StatusCodes.OK).redirect(
                `/sponsor-editor/sponsor_create_succes`
            );
        } catch (e) {
            console.log(e);
            return res
                .status(HCS.StatusCodes.BAD_REQUEST)
                .redirect(`/sponsor-editor/sponsor_unkown_error`);
        }
    }

    /**
     * Middleware to create a route in the database
     * @param {*} req
     * @param {*} res
     */
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
            const createdRoute = await RouteController.createRoute(
                req.body.name,
                route,
                req.body.description,
                distance,
                req.body.extra,
                type,
                wheelchair
            );

            //Redirect when done
            if (createdRoute) {
                //Send user to the poi editor and select the first poi
                res.status(HCS.StatusCodes.OK).redirect(
                    `/route-poi-editor/${createdRoute.id}/1`
                );
            } else {
                return res
                    .status(HCS.StatusCodes.BAD_REQUEST)
                    .redirect(`/route-info-editor/failed_create_route`);
            }
        } catch (e) {
            return res
                .status(HCS.StatusCodes.BAD_REQUEST)
                .redirect(`/route-info-editor/route_unknown_error`);
        }
    };

    /**
     * Middleware to create a node in the database
     * @param {*} req
     * @param {*} res
     */
    static async createNode(req, res) {
        try {
            //Create node in database, with the values from the form
            const node = await NodeController.createNode(
                parseInt(req.body.nodenr),
                parseFloat(req.body.lat),
                parseFloat(req.body.lon),
                parseInt(req.body.routeid)
            );

            //Redirect if succeeded
            if (node) {
                return res
                    .status(HCS.StatusCodes.OK)
                    .redirect(
                        `/route-poi-editor/${req.body.routeid}/${req.body.selected}/poi_success`
                    );
            } else {
                return res
                    .status(HCS.StatusCodes.BAD_REQUEST)
                    .redirect(
                        `/route-poi-editor/${req.body.routeid}/${req.body.selected}/failed_create_poi`
                    );
            }
        } catch (e) {
            return res
                .status(HCS.StatusCodes.BAD_REQUEST)
                .redirect(
                    `/route-poi-editor/${req.body.routeid}/${req.body.selected}/poi_unknown_error`
                );
        }
    }

    /**
     * Middleware to create a POI in the database
     * @param {*} req
     * @param {*} res
     */
    static async createPoi(req, res) {
        try {
            //If audio file is uploaded, set 'file' to the src, if no file was uploaded, set 'file' to null
            let file =
                typeof req.files.audio_src !== "undefined"
                    ? req.files.audio_src[0].filename
                    : null;

            //If the form data contained an autoplay, set the autoplay to true
            let autoplay = false;

            if (req.body.autoplay) {
                autoplay = true;
            }

            //Create the poi in the database
            const poi = await PoiController.createPoi(
                req.body.name,
                parseFloat(req.body.lat),
                parseFloat(req.body.lon),
                req.body.desc,
                file,
                autoplay,
                parseInt(req.body.routeid),
                parseInt(req.body.radius),
                req.body.type
            );

            //If no image is uploaded, return an error
            if (typeof req.files.img_src == "undefined") {
                return res
                    .status(HCS.StatusCodes.BAD_REQUEST)
                    .redirect(
                        `/route-poi-editor/${req.body.routeid}/${req.body.selected}/failed_create_poi`
                    );
            }

            //Put all images in the database
            req.files.img_src.forEach(async (img) => {
                const image = PoiImgController.createPoiImg(
                    poi.id,
                    img.filename
                );

                //If file creation failed throw error
                if (!image) {
                    return res
                        .status(HCS.StatusCodes.BAD_REQUEST)
                        .redirect(
                            `/route-poi-editor/${req.body.routeid}/${req.body.selected}/failed_create_poi`
                        );
                }
            });

            //Redirect when done
            if (poi) {
                //Redirect to the selected point by adding the routeid and selected point to the url
                res.status(HCS.StatusCodes.OK).redirect(
                    `/route-poi-editor/${req.body.routeid}/${req.body.selected}/poi_success`
                );
            } else {
                return res
                    .status(HCS.StatusCodes.BAD_REQUEST)
                    .redirect(
                        `/route-poi-editor/${req.body.routeid}/${req.body.selected}/failed_create_poi`
                    );
            }
        } catch (e) {
            console.log(e);
            return res
                .status(HCS.StatusCodes.BAD_REQUEST)
                .redirect(
                    `/route-poi-editor/${req.body.routeid}/${req.body.selected}/poi_unknown_error`
                );
        }
    }

    /**
     * Calculates the distance form the geomerty of a GeoJSON object
     * @param {GeoJSON} json
     * @returns the distance in kilometers
     */
    static getDistanceFromGeoJSON(json) {
        const coords = json.features[0].geometry.coordinates;
        let totalDist = 0; //In meters
        for (let i = 0; i < coords.length - 1; i++) {
            //Get the current coord and the next coord
            const coord1 = { lat: coords[i][0], lon: coords[i][1] };
            const coord2 = { lat: coords[i + 1][0], lon: coords[i + 1][1] };
            //Compare the two coords and get the distance
            totalDist += parseFloat(
                GeoDistance.between(coord1, coord2).human_readable().distance
            );
        }
        //Take 75% of the distance. Research concluded the calculation was always off by a value around 75%
        const accurateDist = (totalDist / 4) * 3;
        //Convert the distance to kilometers and round to one decimal
        const distInKm = Math.round(accurateDist / 100) / 10;

        return distInKm;
    }

    /**
     * Middleware to edit a user in the database
     * @param {*} req
     * @param {*} res
     */
    static async editUser(req, res) {
        try {
            //Update the user in the database
            const user = await UserController.updateUser(
                parseInt(req.user.user.id),
                req.body.email,
                req.body.firstname,
                req.body.lastname
            );

            //Redirect if succeeded
            if (user) {
                return res
                    .status(HCS.StatusCodes.OK)
                    .redirect(`/profile/profile_updated`);
            } else {
                return res
                    .status(HCS.StatusCodes.BAD_REQUEST)
                    .redirect(`/profile/failed_update_credentials`);
            }
        } catch (e) {
            return res
                .status(HCS.StatusCodes.BAD_REQUEST)
                .redirect(`/profile/profile_unknown_error`);
        }
    }

    /**
     * Middleware to edit a user's password in the database
     * @param {*} req
     * @param {*} res
     */
    static async editPassword(req, res) {
        try {
            // Get user data from the database
            const user = await UserController.getUserById(
                parseInt(req.user.user.id)
            );

            if (!user) {
                // Return an error if the user is not in the database
                return res
                    .status(HCS.StatusCodes.BAD_REQUEST)
                    .redirect(`/profile/invalid_current_pass`);
            }

            // Check if the entered passwordt matches the user password
            if (
                await AuthService.validatePasswords(
                    req.body.currentPass,
                    user.password
                )
            ) {
                // Check if the new passwords are the same
                if (req.body.newPass !== req.body.newPassRepeat) {
                    return res
                        .status(HCS.StatusCodes.BAD_REQUEST)
                        .redirect(`/profile/invalid_edit_pass_match`);
                } else {
                    // Hash the password
                    const hashed_password = AuthService.hashPassword(
                        req.body.newPass
                    );

                    // Update the password in the database
                    const user = await UserController.updatePass(
                        parseInt(req.user.user.id),
                        hashed_password
                    );

                    // Redirect if successfull
                    if (user) {
                        return res
                            .status(HCS.StatusCodes.OK)
                            .redirect(`/profile/edit_password_changed`);
                    } else {
                        return res
                            .status(HCS.StatusCodes.BAD_REQUEST)
                            .redirect(`/profile/failed_update_pass`);
                    }
                }
            } else {
                return res
                    .status(HCS.StatusCodes.BAD_REQUEST)
                    .redirect(`/profile/edit_incorrect_password`);
            }
        } catch (e) {
            console.log(e);
            return res
                .status(HCS.StatusCodes.BAD_REQUEST)
                .redirect(`/profile/profile_unknown_error`);
        }
    }
}

module.exports = DBObjectCreator;
