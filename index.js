let jQuery = require("jquery");

let Gmarkers = [];

let mapsmarker = (
  idmap,
  mapzoom,
  maptype,
  key = "",
  markers = [],
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

  if (markers.length > 0) mapsmarker.initialize(key, markers);
};

mapsmarker.prototype.addMarker = (plat, plon, ptitle, ptext) => {
  this.markers.push({ lat: plat, lon: plon, title: ptitle, text: ptext });
};

mapsmarker.prototype.markerFunction = fun => {
  this.fun = fun;
};

mapsmarker.prototype.initialize = (key, pmarkers) => {
  key = typeof key !== "undefined" ? key : "";
  pmarkers = typeof pmarkers !== "undefined" ? pmarkers : [];

  //Only one parameter and better implementation.
  if (typeof this.fun === "undefined")
    let fun = () => { };
  else let fun = this.fun;

  jQuery(() => {
    // Asynchronously Load the map API
    let script = document.createElement("script");
    script.src =
      "http://maps.googleapis.com/maps/api/js?sensor=false&callback=initMap&key=" +
      key;
    document.body.appendChild(script);
  });

  global.initMap = function () {
    let map;
    let bounds = new google.maps.LatLngBounds();
    let mapOptions = {
      zoom: this.mapzoom,
      mapTypeId: this.maptype,
      center: { lat: this.pcenter.lat, lng: this.pcenter.lng }
    };

    // Display a map on the page
    map = new google.maps.Map(document.getElementById(this.idmap), mapOptions);
    map.setTilt(45);

    // Display multiple markers on a map
    let infoWindow = new google.maps.InfoWindow(),
      marker,
      i;
    let until = -1;

    if (this.selectable && jQuery.isEmptyObject(this.markers) == false) until = 1;
    else if (!this.selectable) until = this.markers.length;

    // Loop through our array of markers & place each one on the map
    for (i = 0; i < until; i++) {
      let position = new google.maps.LatLng(this.markers[i].lat, this.markers[i].lon);
      bounds.extend(position);
      marker = new google.maps.Marker({
        position: position,
        map: map,
        title: this.markers[i].title
      });

      // Allow each marker to have an info window
      google.maps.event.addListener(
        marker,
        "click",
        (function (marker, i) {
          return function () {
            infoWindow.setContent(this.markers[i].text);
            infoWindow.open(map, marker);
          };
        })(marker, i)
      );

      // Automatically center the map fitting all markers on the screen

      map.fitBounds(bounds);
      Gmarkers.push(marker);
    }

    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
    let boundsListener = google.maps.event.addListener(
      map,
      "bounds_changed",
      event => {
        this.setZoom(this.mapzoom);
        google.maps.event.removeListener(boundsListener);
      }
    );


    if (this.selectable) {
      google.maps.event.addListener(map, "click", event => {
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

module.exports = mapsmarker;
