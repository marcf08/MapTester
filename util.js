let circleGen = function(lng, lat, radiusInKm, points) {
  let coords = {
    latitude: lat,
    longitude: lng
  };

  let km = radiusInKm;

  let ret = [];
  let distanceX = km / (111.320 * Math.cos(coords.latitude * Math.PI / 180));
  let distanceY = km / 110.574;

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

let clearPolyLine = function () {
  if (map.getLayer(trip) != null) {
    map.removeLayer(trip);
  }
  if (map.getSource(trip) != null) {
    map.removeSource(trip);
  }
  if (plottedMarkers != null) {
    for (let i = 0; i < plottedMarkers.length; i++) {
      plottedMarkers[i].remove();
    }
  }
}

let addPolyline = function() {
  incomingPolyline = prompt("Enter geoJSON");
  incomingPolyline = JSON.parse(incomingPolyline);
  console.log(incomingPolyline);
  map.addLayer({
      "id": trip,
      "type": "line",
      "source": {
          "type": "geojson",
          "data": {
              "type": "Feature",
              "properties": {},
              "geometry": {
                  "type": "LineString",
                  "coordinates": incomingPolyline.features[0].geometry.coordinates
              }
          }
      },
      "layout": {
          "line-join": "round",
          "line-cap": "round"
      },
      "paint": {
          "line-color": "#000",
          "line-width": 5
      }
  });
}

let addMarkers = function() {
  if (map.getLayer(trip) != undefined) {
    map.removeLayer(trip);
    for (let i = 0; i < incomingPolyline.features[0].geometry.coordinates.length; i++) {
      console.log(incomingPolyline.features[0].geometry.coordinates[0][1]);
      let lng = incomingPolyline.features[0].geometry.coordinates[i][0];
      let lat = incomingPolyline.features[0].geometry.coordinates[i][1];
      let marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
      plottedMarkers.push(marker);
    }
  }
}
