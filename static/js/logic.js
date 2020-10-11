// mapbox accessToken:apiKey

//base layer of map(s)
var mapGrayScale = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    accessToken:apiKey
});

var mapSatellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    accessToken:apiKey
});

var mapOutdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
    accessToken:apiKey
});

var map = L.map("#map", {
    center: [40, -96],
    zoom: 6,
    layers: [mapGrayScale, mapSatellite, mapOutdoors]
  });

//data objects for map layer
mapGrayScale.addTo(map);

//layer(s) to map
var mapLayers = {
    Satellite: mapSatellite,
    Grayscale: mapGrayScale,
    Outdoors: mapOutdoors
  };

//desired datasets




