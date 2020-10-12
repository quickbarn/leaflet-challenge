// mapbox accessToken:apiKey
//tile layers variables of map(s)
var mapGrayScale = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 20,
  accessToken:apiKey
});

var mapSatellite = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}",{
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 20,
    accessToken: apiKey
});

// outdoors background.
var mapOutdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}",{
    attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
    maxZoom: 20,
    accessToken: apiKey
});



//map to created layer
var map =L.map("map", {
    center: [25,-100],
    zoom:3,
    layers: [mapGrayScale]
});

//mapGrayScale added into the created layer array
mapGrayScale.addTo(map);

//layer for earthquake data from USGS
var earthquakeData = new L.LayerGroup(),
tectonicPlateData = new L.LayerGroup();

var mapOptions = {
    Grayscale: mapGrayScale,
    Satellite: mapSatellite,
    Outdoors: mapOutdoors
},
overLays = {
    "Tectonic Plates":tectonicPlateData,
    'Earthquake Epicenter': earthquakeData
};

L.control.layers(mapOptions,overLays).addTo(map);


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

    // Color function for earthquake scale, color palette from color-hex.com/
    function colorFxn(mag) {
        switch (true){
            case mag > 5: return "#ff0000";
            case mag > 4: return "#ff4d00";
            case mag > 3: return "#ff7400";
            case mag > 2: return "#ff9a00";
            case mag > 1: return "#97ebdb";
            default: return "#adff00";
        }
    }

    // radius sized from magnitude scale
    function radiusFxn(mag) {
        if (mag == 0) {
            return 1;
        }
        return mag * 4;
    }

    //geoJson to map layers
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng);
        },
        style: styleFxn,
        onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br> Estimated Epicenter: " + feature.properties.place);
        }
    }).addTo(earthquakeData);

    //make data visible by adding to map array
    earthquakeData.addTo(map);
    
    //legend
    var legend = L.control({position: "bottomright"});

    legend.onAdd = function() {
        var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 4, 5],
        labels = [];

        for (var i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + colorFxn(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }
    
        return div;
    };
    
    legend.addTo(map);

    //Tectonic plates geojson from github user fraxen
    d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_plates.json",
    function(plates) {L.geoJson(plates,{color:"orange", weight:1})
    .addTo(tectonicPlateData);
    tectonicPlateData.addTo(map);
    });
});