var app = require('../server.js');
var async = require('async');
var https = require('https');

var host = 'earthquake.usgs.gov';
var endpoint = '/earthquakes/feed/v1.0/summary/all_month.geojson';
var method = 'GET'
var headers = {'Content-Type': 'application/json'};

console.log('Start updating earthquake data...');

var updateSource = function(app, callback){
  console.log('importing data');
  var Earthquake = app.models.earthquake;

  var options = {
    host: host,
    path: endpoint,
    method: method,
    headers: headers
  };

  var req = https.request(options, function(res) {
    res.setEncoding('utf-8');
    var responseString = '';
    res.on('data', function(data) {
      responseString += data;
    });

    res.on('end', function() {
      var responseObject = JSON.parse(responseString);
      async.each(responseObject.features, function(feed, callback){
        // console.log(feed);
        var eq = {};
        eq.recordId = feed.properties.ids;
        eq.timeZone = feed.properties.tz;
        eq.mag = feed.properties.mag;
        eq.magType = feed.properties.magType;
        eq.type = feed.properties.type;
        eq.title = feed.properties.title;
        eq.createTime = feed.properties.time;
        eq.updateTime = feed.properties.updated;
        eq.coordinates = feed.geometry.coordinates;

        // if (feed.properties.time) {
        //   // since epoch
        //   eq.createTime = new Date(0);
        //   // milliseconds to seconds
        //   eq.createTime.setUTCSeconds(feed.properties.time/1000);
        // };

        // if (feed.properties.updated) {
        //   // since epoch
        //   eq.updateTime = new Date(0);
        //   // milliseconds to seconds
        //   eq.updateTime.setUTCSeconds(feed.properties.updated/1000);
        // };

        if (feed.properties.place) {
          // get the reported area name, it's either US State or other Country
          var str = feed.properties.place;
          var arr = str.split(", ").map(val => val);
          eq.area = arr.pop();
        };

        if (feed.properties.mag) {
          // E = (10)^(1.5 * MW + 11.8)
          eq.energyRelease = Math.pow(10, (1.5*feed.properties.mag+11.8));
        };

        Earthquake.create(eq, function(err, earthquake) {
          if (err) return callback(err);
        });

      }, callback);
    });
  });
  req.end();
};

updateSource(app, function(err/*, results*/) {
  if (err) {
    console.error('Update source failed: ', err);
  }
  else {
    console.log('Successfully updated earthquake source.');
  }
  process.exit(0);
});