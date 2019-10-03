const jQuery = require("jquery");

let Gmarkers = [];
let $this = { markers: [], initialized: false };

let mapsmarker = function(
  idmap,
  mapzoom,
  maptype,
  key = "",
  markers = [],
  selectable = false,
  pcenter = { lat: 18.48117202, lng: -69.92138672 }
) {
  //Initialize the markers data container
  $this.idmap = idmap;
  $this.mapzoom = mapzoom;
  $this.maptype = maptype;
  $this.pcenter = pcenter;
  $this.selectable = selectable;
  $this.markers = [];
  initialize(key, markers);
};

mapsmarker.prototype.addMarker = function(plat, plon, ptitle, ptext) {
  if ($this.initialized)
    setMarker({ lat: plat, lon: plon, title: ptitle, text: ptext });
  else $this.markers.push({ lat: plat, lon: plon, title: ptitle, text: ptext });
};

const initialize = function(key = "", pmarkers = []) {
  //Only one parameter and better implementation.
  if (pmarkers.length > 0) $this.markers = pmarkers;

  jQuery(() => {
    // Asynchronously Load the map API
    let script = document.createElement("script");
    script.src =
      "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initMap&key=" +
      key;
    document.body.appendChild(script);
  });

  global.initMap = function() {
    $this.initialized = true;
    $this.bounds = new google.maps.LatLngBounds();
    let mapOptions = {
      zoom: $this.mapzoom,
      mapTypeId: $this.maptype,
      center: { lat: $this.pcenter.lat, lng: $this.pcenter.lng }
    };

    // Display a map on the page
    $this.map = new google.maps.Map(
      document.getElementById($this.idmap),
      mapOptions
    );
    $this.map.setTilt(45);

    // Display multiple markers on a map
    $this.infoWindow = new google.maps.InfoWindow();

    // Loop through our array of markers & place each one on the map
    for (let i = 0; i < $this.markers.length; i++) setMarker($this.markers[i]);

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    let boundsListener = google.maps.event.addListener(
      $this.map,
      "bounds_changed",
      function(event) {
        this.setZoom($this.mapzoom);
        google.maps.event.removeListener(boundsListener);
      }
    );
  };
};

const setMarker = function(pmarker) {
  let position = new google.maps.LatLng(pmarker.lat, pmarker.lon);
  $this.bounds.extend(position);
  let marker = new google.maps.Marker({
    position: position,
    map: $this.map,
    title: pmarker.title
  });

  // Allow each marker to have an info window
  google.maps.event.addListener(marker, "click", function() {
    $this.infoWindow.setContent(pmarker.text);
    $this.infoWindow.open($this.map, marker);
  });

  // Automatically center the map fitting all markers on the screen
  $this.map.fitBounds($this.bounds);
  Gmarkers.push(marker);
};

module.exports = mapsmarker;
