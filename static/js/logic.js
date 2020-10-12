// mapbox accessToken:apiKey
//tile layers variables of map(s)
var mapGrayScale = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  accessToken:apiKey
});

//map to created layer
var map =L.map("map", {
    center: [25,-100],
    zoom:3
});

//mapGrayScale added into the created layer array
mapGrayScale.addTo(map);

//layer for earthquake data from USGS
var earthquakeData = new L.layerGroup();