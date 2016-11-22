var mapsmarker = function (key) {

				jQuery(function($) {
			    // Asynchronously Load the map API 
			    var script = document.createElement('script');
			    script.src = "//maps.googleapis.com/maps/api/js?sensor=false&callback=initialize&key="+key;
			    document.body.appendChild(script);
			    });

				//Initialize the markers data container
				this.markers = {};

				return (function () {
								    var map;
								    var bounds = new google.maps.LatLngBounds();
								    var mapOptions = {
								        mapTypeId: 'roadmap'
								    }});
};

mapsmarker.prototype.addMarker = function(plon, plat, ptitle, ptext){
			this.markers.push({lon : plon, lat : plat, title : ptitle, text : ptext});
};

mapsmarker.prototype.showMap = function () {
			// Display a map on the page
		    map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
		    map.setTilt(45);
		        
		    // Display multiple markers on a map
		    var infoWindow = new google.maps.InfoWindow(), marker, i;
		    
		    // Loop through our array of markers & place each one on the map  
		    for( i = 0; i < this.markers.length; i++ ) {
		        var position = new google.maps.LatLng(this.markers[i].lon, this.markers[i].lat);
		        bounds.extend(position);
		        marker = new google.maps.Marker({
		            position: position,
		            map: map,
		            title: this.markers[i].title
		        });
		        
		        // Allow each marker to have an info window    
		        google.maps.event.addListener(marker, 'click', (function(marker, i) {
		            return function() {
		                infoWindow.setContent(this.markers[i].text);
		                infoWindow.open(map, marker);
		            }
		        })(marker, i));

		        // Automatically center the map fitting all markers on the screen
		        map.fitBounds(bounds);
		    }

		    // Override our map zoom level once our fitBounds function runs (Make sure it only runs once)
		    var boundsListener = google.maps.event.addListener((map), 'bounds_changed', function(event) {
		        this.setZoom(14);
		        google.maps.event.removeListener(boundsListener);
		    });

};