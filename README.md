# gMapMarkersJs

gMapMarkersJs is a js library that simplified the use of markers with Google Maps API for embed maps inside your site.

# How to Install

In your project folder just simply type:
`npm install myjspolyfills`

# How to Use

Just follow the following example:

```javascript
//Import the library
let mapsmarker = require("gmapmarkersjs");

/* 
Instance the new object with any name and set the parameters in the creation like:

new mapsmarker('id of div html object', Zoom number 1 - 20 (Greater number and more magnification),'type of map [roadmap, satellite, terrain or hybrid]', 'YOUR GOOGLE MAPS API KEY');

*/

var mk = new mapsmarker(
  "map_canvas",
  14,
  "roadmap",
  "YOUR GOOGLE MAPS API KEY"
);

// add any markers with the method addMarker(lat,lon, 'Title', 'Text on Html or Plain that show when click on the marker')
mk.addMarker(14.058324, 108.277199, "Vietnan", "<h2>Vietnan</h2>");
mk.addMarker(43.798329, -79.5079073, "Concord", "Concord, Vaughan, ON, Canada");
```
