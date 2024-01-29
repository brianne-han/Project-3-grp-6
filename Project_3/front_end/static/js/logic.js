let url = "http://127.0.0.1:5000/api/v1.0/population/2018"
// Creating the map object
let myMap = L.map("map", {
    center: [63.5888, -154.4931],
    zoom: 5
  });
  
  // Adding the tile layer
 let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
// Create a chooseradius function:
function markerSize(population) {
    return Math.sqrt(population) * 200;
}

let zipCodeMarker = []
 

// Get geoJson Data:
d3.json(url).then(data => { 
    console.log(data)
    for (let i= 0; i<data.length; i++) {
        zipCodeMarker.push(
            L.circle([data[i]['lat'], data[i]['lon']], {
                stroke: false,
                fillOpacity: 0.75,
                color: "green",
                fillColor: "green",
                radius: markerSize(data[i]['population'])
            }).bindPopup(`<h2>ZIP Code: ${data[i]["zip_code"]}</h2> <hr> <h3>Population: ${data[i]['population'].toLocaleString()}</h3> <hr> <h3>Year: ${data[i]['year']}</h3>`)
        ) 

    } 
    let zipCodes = L.layerGroup(zipCodeMarker)
    zipCodes.addTo(myMap);

    

  
})  
