# Design Doc

## My task list (personal sprints):

##### 1. Use LoopBack CLI tool to kick start

This project's kick start by using [loopback-cli](http://loopback.io/getting-started/):

install cli:
```
npm install -g loopback-cli
```

Kick start:
```
lb
```

##### 2. Set up data model to store useful entries in [Earthquake Geojson](http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson) from earthquake.usgs.gov

Reminder:

    * use properties.ids as unique __recordId__
    * need an extra entry to store __energyRelease__
    * need an extra entries to store __area__ (parse from properties.place) 
    * we assume in one state city name is unique
    * We provide time in UTC (Coordinated Universal Time).

From [earthquake.usgs.gov](https://earthquake.usgs.gov/data/comcat/data-eventterms.php#ids):
> 
* IDS
 From
* Data Type
String
* Typical Values
",ci15296281,us2013mqbd,at00mji9pf,"
* Description
A comma-separated list of event ids that are associated to an event.



Example Data for one record 

(I comment up those might not be very import for the current system design, but we can easily add in the future as more features are needed.):

```
"type":"Feature",
"properties":{
    "ids":",ak18029781,",
    "mag":2.6,
    "place":"53km SSE of Homer, Alaska",
    "time":1515657020512,
    "updated":1515657356774,
    "tz":-540,
    "magType":"ml",
    "type":"earthquake",
    "title":"M 2.6 - 53km SSE of Homer, Alaska"

    // "url":"https://earthquake.usgs.gov/earthquakes/eventpage/ak18029781",
    // "detail":"https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/ak18029781.geojson",
    // "felt":null,
    // "cdi":null,
    // "mmi":null,
    // "alert":null,
    // "status":"automatic",
    // "tsunami":0,
    // "sig":104,
    // "net":"ak",
    // "code":"18029781",
    // "sources":",ak,",
    // "types":",geoserve,origin,",
    // "nst":null,
    // "dmin":null,
    // "rms":0.57,
    // "gap":null,
},
"geometry":{
    "coordinates":[-151.3191,59.1791,31.5]},

    // "type":"Point",
    // "id":"ak18029781"
},
```

Check the format here: [GeoJSON](http://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php).


##### 3. Update db by calling [GeoJSON API](http://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson).

    1. Write a script to update;
    2. Update/run by every INTERVAL_TIME(=15x60) seconds;

Reminder:

    * set -- "base": "PersistedModel"
        Extends Model with basic query and CRUD support.

###### Gutenberg-Richter magnitude-energy relation

log10 E = 1.5 MW + 11.8

E = (10)^(1.5 * MW + 11.8)

* moment magnitude (MW)

> Reference:
[calculate earthquake energy](https://earthquake.usgs.gov/learn/topics/measure.php)
[http://www.jclahr.com](http://www.jclahr.com/alaska/aeic/magnitude/energy_calc.html)

##### 4. Build endpoint ___/regions___ to query most dangerous regions by given _time_period_ and _region_type_.
    
    * How to determine region?
        by __city__, __state__, __timezone__

    * Need to convert total __energyRelease__ back to total __magnitude__


TODO:

[ ] Add [ACL](https://loopback.io/doc/en/lb2/Controlling-data-access.html). 
[ ] Use [loopback-connector-rest](https://loopback.io/doc/en/lb2/REST-connector.html) to bind data source api.
[ ] I found out in the original report place, same state name are not store as same name. For example, it could be CA, or California. Need to map them together in the future.
[x] Use MongoDB to store date instead of using memory.