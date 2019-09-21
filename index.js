import jQuery from "jquery";

var Gmarkers = [];
var unique = false;

const mapsmarker = (
  idmap,
  mapzoom,
  maptype,
  selectable = false,
  pcenter = { lat: 18.48117202, lng: -69.92138672 }
) => {
  //Initialize the markers data container
  this.idmap = idmap;
  this.mapzoom = mapzoom;
  this.maptype = maptype;
  this.pcenter = pcenter;
  this.selectable = selectable;
  this.markers = [];
};

mapsmarker.prototype.addMarker = (plat, plon, ptitle, ptext) => {
  this.markers.push({ lat: plat, lon: plon, title: ptitle, text: ptext });
};

mapsmarker.prototype.markerFunction = fun => {
  this.fun = fun;
};

mapsmarker.prototype.initialize = key => {
  //Only one parameter and better implementation.
  var markers = this.markers;
  var idmap = this.idmap;
  var mapzoom = this.mapzoom;
  var maptype = this.maptype;
  var pcenter = this.pcenter;
  var selectable = this.selectable;
  if (typeof this.fun === "undefined")
    var fun = function() {
      null;
    };
  else var fun = this.fun;

  jQuery(function($) {
    // Asynchronously Load the map API
    var script = document.createElement("script");
    script.src =
      "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initialize&key=" +
      key;
    document.body.appendChild(script);
  });

  return () => {
    var map;
    var bounds = new google.maps.LatLngBounds();
    var mapOptions = {
      zoom: mapzoom,
      mapTypeId: maptype,
      center: { lat: pcenter.lat, lng: pcenter.lng }
    };

    // Display a map on the page
    map = new google.maps.Map(document.getElementById(idmap), mapOptions);
    map.setTilt(45);

    // Display multiple markers on a map
    var infoWindow = new google.maps.InfoWindow(),
      marker,
      i;
    var until = -1;

    if (selectable && jQuery.isEmptyObject(markers) == false) until = 1;
    else if (!selectable) until = markers.length;

    // Loop through our array of markers & place each one on the map
    for (i = 0; i < until; i++) {
      var position = new google.maps.LatLng(markers[i].lat, markers[i].lon);
      bounds.extend(position);
      marker = new google.maps.Marker({
        position: position,
        map: map,
        title: markers[i].title
      });

      // Allow each marker to have an info window
      google.maps.event.addListener(
        marker,
        "click",
        (function(marker, i) {
          return function() {
            infoWindow.setContent(markers[i].text);
            infoWindow.open(map, marker);
          };
        })(marker, i)
      );

      // Automatically center the map fitting all markers on the screen

      map.fitBounds(bounds);
      Gmarkers.push(marker);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    var boundsListener = google.maps.event.addListener(
      map,
      "bounds_changed",
      function(event) {
        this.setZoom(mapzoom);

        google.maps.event.removeListener(boundsListener);
      }
    );

    if (selectable) {
      google.maps.event.addListener(map, "click", function(event) {
        if (Gmarkers.length == 0) {
          marker = new google.maps.Marker({
            position: event.latLng,
            map: map
          });
          Gmarkers.push(marker);
        } else Gmarkers[0].setPosition(event.latLng);

        fun();
      });
    }
  };
};

export default mapsmarker;
