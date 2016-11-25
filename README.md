# gMapMarkersJs

gMapMarkersJs is a js library that simplified the use of markers with Google Maps API for embed maps inside your site.

    -Requeriments
        +JQuery

# Example
```html
<html>
<head>

<!--First you need include the JQuery Lib  -->
<script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
<!--Add the lib gMapMarkersJs -->
<script src="//cdn.rawgit.com/elisardofelix/gMapMarkersJs/master/gMapMarkersJs.js"></script>

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
    new mapsmarker('id of div html object', Zoom number 1 - 20 ,'type of map [roadmap, satellite, terrain or hybrid]');
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

