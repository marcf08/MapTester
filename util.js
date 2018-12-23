let addGeoFences = function() {
  for (let i = 0; i < geofences.length; i++) {
    let id = "geofence" + i;
    map.addSource(id, createGoefence(geofences[i].lng, geofences[i].lat, fenceRadius, fenceSides));
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

let clearMap = function () {
  if (plottedMarkers.length > 0) {
    for (let i = 0; i < plottedMarkers.length; i++) {
      plottedMarkers[i].remove();
    }
    plottedMarkers = [];
  }
  if (map.getLayer(trip) != null) {
    map.removeLayer(trip);
  }
  if (map.getSource(trip) != null) {
    map.removeSource(trip);
  }

}

let addPolyline = function() {
  if (map.getLayer(trip) != null || plottedMarkers.length > 0) {
    alert('Please clear the map first');
    return;
  }
  try {
    incomingPolyline = window.prompt("GeoJSON");
    incomingPolyline = JSON.parse(incomingPolyline);
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
  } catch(e) {
    console.log('JSON Parse Error: ' + e);
  }
}

let addMarkers = function() {
  if (map.getLayer(trip) != null) {
    map.removeLayer(trip);
    for (let i = 0; i < incomingPolyline.features[0].geometry.coordinates.length; i++) {
      console.log(incomingPolyline.features[0].geometry.coordinates[0][1]);
      let lng = incomingPolyline.features[0].geometry.coordinates[i][0];
      let lat = incomingPolyline.features[0].geometry.coordinates[i][1];
      let marker = new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);
      plottedMarkers.push(marker);
    }
  } else {
    alert('Please add a line first.');
  }
}

let setUserCenter = function() {
  let coords = map.getCenter();
  localStorage.setItem(defCenter,coords);
  defCenter  = coords;
}
