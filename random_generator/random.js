"use strict";

var app = require('express')();
var _ = require('lodash-node');
var Promise = require("bluebird");
var needle = require('needle')
Promise.promisifyAll(needle);


var RandomGenerator = {};
RandomGenerator.getRandomText = function () {
    return needle.getAsync("http://loripsum.net/api/3/short/headers");
};

RandomGenerator.getRandomImage = function (width, height) {
    console.log("Getting Image")
    var imgUrl = "http://lorempixel.com/" + width + "/" + height + "/sports/";

    //"http://loremflickr.com/"+width+"/"+height
    return needle.getAsync(imgUrl);

};
RandomGenerator.getRandomTitle = function () {
    return "Title" + Math.random();
}

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get("/random/title", function (req, res) {
    res.send(RandomGenerator.getRandomTitle());
});

app.get("/random/text", function (req, res) {
    RandomGenerator.getRandomText().then(function (responses) {
        var text = _.trunc(responses[1], {
            'length': 500,
            'separator': /,? +/,
            'omission': ' […]'
        });
        res.send(text);
        res.end();
    });
});

app.get("/random/image/:id/:width/:height", function (req, res) {
    RandomGenerator.getRandomImage(req.params.width, req.params.height).then(function (responses) {
        res.send(responses[1]);
        res.end();
    });

});


app.listen(3000);