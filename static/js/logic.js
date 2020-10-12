// mapbox accessToken:apiKey
//tile layers variables of map(s)
var mapGrayScale = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 20,
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
var earthquakeData = new L.LayerGroup();

// d3 pull for geoJson from USGS
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", function(data) {
    function styleFxn(feature) {
         return {
             opacity: 0.75,
             fillOpacity: 1,
             fillColor: colorFxn(feature.properties.mag),
             radius: radiusFxn(feature.properties.mag),
             stroke:true, 
             weight: 1
         };
    }

    // Color function for earthquake scale, color palette from color-hex.com/color-palette/27541 
    function colorFxn(mag) {
        switch (true){
            case mag > 5: return "#ee3e32";
            case mag > 4: return "#f68838";
            case mag > 3: return "#fbb021";
            case mag > 2: return "#1b8a5a";
            case mag > 1: return "#1d4877";
            default: return "#1d4878";
        }
    }

    // radius sized from magnitude scale
    function radiusFxn(mag) {
        if (mag == 0) {
            return 1;
        }
        return mag * 2;
    }

    //geoJson to map layers
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: styleFxn,
        onEachFeature: function(feature, layer) {
            layer.bindPopup("mag: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
        }
    }).addTo(earthquakeData);

    earthquakeData.addTo(map);
    
});