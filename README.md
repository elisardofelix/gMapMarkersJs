# gMapMarkersJs

gMapMarkersJs is a js library that simplified the use of markers with Google Maps API for embed maps inside your site.

    -Requeriments
        +JQuery

## CDN Script Tag

```
<script src="https://cdn.rawgit.com/elisardofelix/gMapMarkersJs/1.2/gMapMarkersJs.js"></script>
```

## Example demo on codepen playground
If you want see the Demo please click [HERE](http://codepen.io/elisardo/pen/ENwdWJ)

# Example with only show mode (Can't select a position on the Map)


```html
<html>
<head>

<!--First you need include the JQuery Lib  -->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<!--Add the lib gMapMarkersJs -->
<script src="https://cdn.rawgit.com/elisardofelix/gMapMarkersJs/1.2/gMapMarkersJs.js"></script>

<style type="text/css">

#map_wrapper {
    height: 400px;
}

#map_canvas {
    width: 100%;
    height: 100%;
}
</style>

</head>
<body>

<!-- Container div for show the map on html -->
<div id="map_wrapper">
    <div id="map_canvas" class="mapping">
    </div>
</div>


<script type="text/javascript">
/*
    Instance the new object with any name and set the parameters in the creation like:
    new mapsmarker('id of div html object', Zoom number 1 - 20 (Greater number and more magnification),'type of map [roadmap, satellite, terrain or hybrid]');
*/
var mk = new mapsmarker('map_canvas',14,'roadmap');
// add any markers with the method addMarker(lat,lon, 'Title', 'Text on Html or Plain that show when click on the marker')
mk.addMarker(14.058324, 108.277199,'Vietnan','<h2>Vietnan</h2>');
mk.addMarker(43.798329, -79.5079073,'Concord','Concord, Vaughan, ON, Canada');
// at last the initializate method that needs to be pass to a varible named "initialize" with your Google Maps API Key
var initialize = mk.initialize('YOUR GOOGLE MAPS API KEY');
</script>

</body>


</html>
```

# Example with write mode (You can select a unique position on the Map)
```html
<html>
<head>

<!--First you need include the JQuery Lib  -->
<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<!--Add the lib gMapMarkersJs -->
<script src="https://cdn.rawgit.com/elisardofelix/gMapMarkersJs/1.2/gMapMarkersJs.js"></script>

<style type="text/css">

#map_wrapper {
    height: 400px;
}

#map_canvas {
    width: 100%;
    height: 100%;
}
</style>

</head>
<body>

<!-- Container div for show the map on html -->
<div id="map_wrapper">
    <div id="map_canvas" class="mapping">
    </div>
</div>


<script type="text/javascript">
/*
    Instance the new object with any name and set the parameters in the creation like:
    new mapsmarker('id of div html object', Zoom number 1 - 20 (Greater number and more magnification),'type of map [roadmap, satellite, terrain or hybrid]', selectable can be true if you want on write mode or false that is on default.);
*/
var mk = new mapsmarker('map_canvas',14,'roadmap', true);
// If you want to show and star marker only need apply the method addMarker one time(lat,lon, 'Title', 'Text on Html or Plain that show when click on the marker')
mk.addMarker(14.058324, 108.277199,'Vietnan','<h2>Vietnan</h2>');

//If you want to make somethig with the locationselected you can create a function with the statement that you want to excecute with the method markerFunction.  The global variable Gmarkers contain on the position 0 the actual marker with all the configurations.
mk.markerFunction(function () { 
      alert("Actual Position : LAT : " + Gmarkers[0].position.lat() + " , LNG : " + Gmarkers[0].position.lng());
});


// at last the initializate method that needs to be pass to a varible named "initialize" with your Google Maps API Key
var initialize = mk.initialize('YOUR GOOGLE MAPS API KEY');
</script>

</body>


</html>
```


