let circleGen = function(lng, lat, radiusInKm, points) {
  if(!points) points = 64;

  let coords = {
    latitude: lat,
    longitude: lng
  };

  let km = radiusInKm;

  let ret = [];
  let distanceX = km/(111.320*Math.cos(coords.latitude*Math.PI/180));
  let distanceY = km/110.574;

  let theta, x, y;
  for(let i = 0; i < points; i++) {
    theta = (i / points)*( 2 * Math.PI);
    x = distanceX * Math.cos(theta);
    y = distanceY * Math.sin(theta);

    ret.push([coords.longitude + x, coords.latitude + y]);
  }
  ret.push(ret[0]);

  return {
    "type": "geojson",
    "data": {
      "type": "FeatureCollection",
      "features": [{
        "type": "Feature",
        "geometry": {
          "type": "Polygon",
          "coordinates": [ret]
        }
      }]
    }
  };
};

//Add geofences to the map
let addGeoFences = function() {
  for (let i = 0; i < geofences.length; i++) {
    let id = "geofence" + i;
    map.addSource(id, circleGen(geofences[i].lng, geofences[i].lat, fenceRadius, fenceSides));
    map.addLayer( {
      "id": id,
      "type": "fill",
      "source": id,
      "layout": {},
      "paint": {
        "fill-color": "blue",
        "fill-opacity": 0.5
      }
    });
  }
};
