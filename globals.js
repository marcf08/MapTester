//PROGRAM GLOBALS DO NOT MODIFY
var trip = "trip";
var defCenter = "center";
var incomingPolyline;
var plottedMarkers = [];
var fenceRadius = 0.1; //Radius in KM, using 100m
var fenceSides = 50; //We're not technically using circles here, but a polygon with many sides

var getCenter = function() {
    return [-80.8431,35.2271];
}

//Add any additional geofences to this list
var geofences =
[
  {
    "name": "Krislyn Woods X Seascape Ln",
    "lat" : 35.123497,
    "lng" : -80.986676
  },
  {
    "name": "Krislyn Woods X Sam Neely",
    "lat" : 35.125690,
    "lng" : -80.987855
  },
  {
    "name": "Sam Neely X Steele Creek Rd",
    "lat" : 35.125870,
    "lng" :  -80.980543
  },
  {
    "name": "Steele Creed Rd X Sledge Rd",
    "lat" : 35.116106,
    "lng" : -80.986875
  },
  {
    "name": "Steele Creek Rd X Steelecroft Pky",
    "lat" : 35.104262,
    "lng" : -80.989116
  }
  //Add more here...
];
