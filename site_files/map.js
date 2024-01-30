// Initialize the map
var map = L.map('map').setView([61.2181, -149.9003], 5); 

// Add OpenStreetMap as the base layer
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Create layer groups
var tourismLayer = L.layerGroup().addTo(map);
var factoriesLayer = L.layerGroup().addTo(map);
var outdoorLayer = L.layerGroup().addTo(map);
var activityLayer = L.layerGroup().addTo(map);
var polarBears1985to1990Layer = L.layerGroup().addTo(map);
var polarBears2011to2016Layer = L.layerGroup().addTo(map);

// Modify the function to accept a layer group parameter
function loadAndAddData(dataUrl, color, layerGroup) {
    fetch(dataUrl)
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                var marker = L.circleMarker([item.latitude_mcp || item.Latitude, item.longitude_mcp || item.Longitude], {
                    color: color,
                    fillColor: color,
                    fillOpacity: 0.5,
                    radius: 15
                });
                var popupContent = '';
                if (item['Factory Name']) {
                    popupContent = item['Factory Name'];
                } else if (item['Tourism Name']) {
                    popupContent = item['Tourism Name'];
                } else if (item['Business Name']) {
                    popupContent = item['Business Name'];
                } else if (item['BearID_mcp']) {
                    popupContent = 'Bear ID: ' + item['BearID_mcp'] + '<br>DateTime: ' + item['DateTimeUTC_mcp'];
                }
                marker.bindPopup(popupContent);
                marker.addTo(layerGroup);
            });
        })
        .catch(error => console.error('Error loading data:', error));
}

// Load data for all layers
loadAndAddData('tourism_data.json', 'blue', tourismLayer);
loadAndAddData('factories_data.json', 'red', factoriesLayer);
loadAndAddData('outdoor_and_sport_data.json', 'green', outdoorLayer);
loadAndAddData('activity_data.json', 'purple', activityLayer);
loadAndAddData('polar_bear_1985_to_1990.json', 'orange', polarBears1985to1990Layer);
loadAndAddData('polar_bear_2011_to_2016.json', 'yellow', polarBears2011to2016Layer);

// Basic settings for layer control
var baseLayers = {};
var overlays = {
    "Tourism": tourismLayer,
    "Factories": factoriesLayer,
    "Outdoor and Sport": outdoorLayer,
    "Activity": activityLayer,
    "Polar Bears 1985-1990": polarBears1985to1990Layer,
    "Polar Bears 2011-2016": polarBears2011to2016Layer
};

// Add layer control to the map
L.control.layers(baseLayers, overlays, { collapsed: false, position: 'topright' }).addTo(map);

// Add a legend
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'info legend'),
        categories = ['Tourism', 'Factories', 'Outdoor and Sport', 'Activity', 'Polar Bears 1985-1990', 'Polar Bears 2011-2016'],
        colors = ['blue', 'red', 'green', 'purple', 'orange', 'yellow'];

    // Loop through colors and category labels to generate legend items
    for (var i = 0; i < categories.length; i++) {
        div.innerHTML +=
            '<i style="background:' + colors[i] + '; width: 18px; height: 18px; float: left; opacity: 0.7; margin-right: 8px; border-radius: 50%;"></i> ' +
            categories[i] + '<br>';
    }

    return div;
};

legend.addTo(map);
