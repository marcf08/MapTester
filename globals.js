var fenceRadius = 0.1; //Set geofence radius to 100m
var fenceSides = 100; //We're not technically using fences here, but a polygon with this many sides
var center = [-80.987623, 35.123127]

//Add any additional geofences to this list ;
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
