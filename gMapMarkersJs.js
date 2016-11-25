function mapsmarker(idmap, mapzoon, maptype) {

        //Initialize the markers data container 
        this.idmap = idmap;
        this.mapzoon = mapzoon;
        this.maptype = maptype;
};


mapsmarker.prototype.addMarker = function (plat, plon, ptitle, ptext){

      if(jQuery.isEmptyObject(this.markers))
        this.markers = [{lat : plat, lon : plon, title : ptitle, text : ptext}];
      else
        this.markers.push({lat : plat, lon : plon, title : ptitle, text : ptext});
};

mapsmarker.prototype.initialize = function (key, markers = this.markers, idmap = this.idmap, mapzoon = this.mapzoon, maptype = this.maptype) {

  jQuery(function($) {
      // Asynchronously Load the map API 
      var script = document.createElement('script');
      script.src = "//maps.googleapis.com/maps/api/js?sensor=false&callback=initialize&key="+key;
      document.body.appendChild(script);
      });

    return function () {
                          var map;
                          var bounds = new google.maps.LatLngBounds();
                          var mapOptions = {
                              mapTypeId: maptype
                          };

                        // Display a map on the page
                          map = new google.maps.Map(document.getElementById(idmap), mapOptions);
                          map.setTilt(45);
                              
                          // Display multiple markers on a map
                          var infoWindow = new google.maps.InfoWindow(), marker, i;
                          
                          // Loop through our array of markers & place each one on the map  
                          for( i = 0;markers[i]; i++ ) {
                              var position = new google.maps.LatLng(markers[i].lat, markers[i].lon);
                              bounds.extend(position);
                              marker = new google.maps.Marker({
                                  position: position,
                                  map: map,
                                  title: markers[i].title
                              });
                              
                              // Allow each marker to have an info window    
                              google.maps.event.addListener(marker, 'click', (function(marker, i) {
                                  return function() {
                                      infoWindow.setContent(markers[i].text);
                                      infoWindow.open(map, marker);
                                  }
                              })(marker, i));

                              // Automatically center the map fitting all markers on the screen
                              map.fitBounds(bounds);
                          }

                          // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
                          var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
                              this.setZoom(mapzoon);
                              google.maps.event.removeListener(boundsListener);
                          });

                  };

};