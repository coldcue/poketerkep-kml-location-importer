var fs = require('fs');
var togeojson = require('togeojson');
var jsdom = require('jsdom').jsdom;
var util = require('util');

var kml = jsdom(fs.readFileSync('poketerkep.kml', 'utf8'));
var converted = togeojson.kml(kml);

var points = [];

console.log("Converting locations from poketerkep.kml ...");

for (var i = 0; i < converted.features.length; i++) {
    var feature = converted.features[i]
    var geometry = feature.geometry;

    if (geometry.type === "Point") {
        var point = {
            id: feature.properties.name,
            latitude: geometry.coordinates[1].toFixed(8),
            longitude: geometry.coordinates[0].toFixed(8),
            steps: 10,
            usedBy: null
        }
        points.push(point);
        //console.log(util.inspect(geometry, false, null));
    }
}

console.log("Done. "+points.length+" points were converted");

//console.log(JSON.stringify(points));

//console.log(util.inspect(converted.features[5], false, null));
