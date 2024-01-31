// Initialize the map
var map = L.map('map').setView([71, -149.9003], 5);

// Add OpenStreetMap as the base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Create layer groups
var pb2010Layer = L.layerGroup().addTo(map);
var pb2011Layer = L.layerGroup().addTo(map);
var pb2012Layer = L.layerGroup().addTo(map);
var pb2013Layer = L.layerGroup().addTo(map);
var pb2014Layer = L.layerGroup().addTo(map);
var pb2015Layer = L.layerGroup().addTo(map);
var pb2017Layer = L.layerGroup().addTo(map);
var pb2018Layer = L.layerGroup().addTo(map);

// Modify the function to accept a layer group parameter
function loadAndAddData(dataUrl, color, layerGroup) {
    fetch(dataUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                var latitude = item.latitude_mcp || item.Latitude;
                var longitude = item.longitude_mcp || item.Longitude;
            
                if (latitude !== undefined && longitude !== undefined) {
                    var marker = L.circleMarker([latitude, longitude], {
                        color: color,
                        fillColor: color,
                        fillOpacity: 0.5,
                        radius: 15
                    });
                    marker.addTo(layerGroup); // Add the marker to the specified layer group
                }
            });
            
        })
        .catch(error => {
            console.error(`Error loading or adding data from ${dataUrl}: ${error}`);
        });
}

// Load data for all layers
loadAndAddData('2010_pb_dens.json', 'blue', pb2010Layer);
loadAndAddData('2011_pb_dens.json', 'red', pb2011Layer);
loadAndAddData('2012_pb_dens.json', 'green', pb2012Layer);
loadAndAddData('2013_pb_dens.json', 'purple', pb2013Layer);
loadAndAddData('2014_pb_dens.json', 'orange', pb2014Layer);
loadAndAddData('2015_pb_dens.json', 'yellow', pb2015Layer);
loadAndAddData('2017_pb_dens.json', 'cyan', pb2017Layer);
loadAndAddData('2018_pb_dens.json', 'magenta', pb2018Layer);


// Basic settings for layer control
var baseLayers = {};
var overlays = {
    "2010": pb2010Layer,
    "2011": pb2011Layer,
    "2012": pb2012Layer,
    "2013": pb2013Layer,
    "2014": pb2014Layer,
    "2015": pb2015Layer,
    "2017": pb2017Layer,
    "2018": pb2018Layer,
};

// Add layer control to the map
L.control.layers(baseLayers, overlays, { collapsed: false, position: 'topright' }).addTo(map);

// Add a legend
var legend = L.control({ position: 'bottomright' });
legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        categories = ['2010', '2011', '2012', '2013', '2014', '2015', '2017', '2018'],
        colors = ['blue', 'red', 'green', 'purple', 'orange', 'yellow', 'cyan', 'magenta' ];
    // Loop through colors and category labels to generate legend items
    for (var i = 0; i < categories.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors[i] + '; width: 18px; height: 18px; float: left; opacity: 0.7; margin-right: 8px; border-radius: 50%;"></i> ' +
            categories[i] + '<br>';
    }
    return div;
};
legend.addTo(map);





