const mongoose = require("mongoose");
const UrlShorten = mongoose.model("UrlShorten");
const shortId = require("shortid")
const validUrl = require("valid-url");
const debug=require("debug")


module.exports = app => {

    app.get("/originalUrl", async (req, res) => {
        var shortUrl = req.body.shortUrl;
        var result = await UrlShorten.findOne({ shortUrl: shortUrl });
        if (result) {
            res.json({ "success": true, originalUrl: result.originalUrl })
        }
        res.json({ "success": false, "msg": "error in finding originalurl" })
    })

    app.post("/shortUrl", async (req, res) => {
        const {originalUrl,baseUrl}= req.body;
        try {
            if (validUrl.isUri(baseUrl) && validUrl.isUri(originalUrl)) {

                const result = await UrlShorten.findOne({ originalUrl: originalUrl });
                if (result) {
                    res.json({ "success": true, "shortUrl": result.shortUrl })
                }
                else {

                    var urlCode = shortId.generate();
                    var shortUrl = baseUrl+"/"+urlCode;
                    await UrlShorten.create({originalUrl:originalUrl,urlCode:urlCode,shortUrl:shortUrl})
                    res.json({"success":true,"shortUrl":shortUrl})
                }
            }
            else {
                res.json({ "success": false, "msg": "please provide correct base url" })
            }

        }
        catch(err){
            res.json({"success":false,"Error":err})
        }

})

}