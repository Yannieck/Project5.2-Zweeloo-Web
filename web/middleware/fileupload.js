const togeojson = require("@tmcw/togeojson");
const DOMParser = require("xmldom").DOMParser;
const HCS = require("http-status-codes");

class GPXUploader {
    static validateForm = (req, res) => {
        const name = req.body.name;
        const route = GPXUploader.convertXMLtoJSON(req.file.buffer);
        const type = "";
        const distance = "";
        const extra = req.body.extra;
        const description = req.body.description;
        const wheelchair = req.body.wheelchair === "yes" ? true : false;

        console.log(req.file);
        res.send(req.body);
    };

    static convertXMLtoJSON = (buffer) => {
        const xmlString = Buffer.from(buffer).toString();
        const xml = new DOMParser().parseFromString(xmlString);
        const json = togeojson.gpx(xml);

        return json;
    };
}

module.exports = GPXUploader;

// router.post(
//     "/file",
//     auth,
//     multer().single("gpxfileupload"),
//     async (req, res) => {
//         const multerText = Buffer.from(req.file.buffer).toString();

//         const xml = new DOMParser().parseFromString(multerText);
//         const json = togeojson.gpx(xml);

//         res.type("application/json");
//         res.send(json);

//     }
// );
