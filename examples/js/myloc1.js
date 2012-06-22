window.onload = getMylocation;

//global variable.
//the coords of the Wickedly Smart HQ.
var wickCoords = {
		latitude: 47.624851,
		longitude: -122.52099
}

//hold the Google map after being created.
var map;

function getMylocation() {
		if (navigator.geolocation) {
				//navigator.geolocation.getCurrentPosition(displayLocation, displayError);
				navigator.geolocation.getCurrentPosition(displayLocation);
		} else {
				alert("no geolocation support");
		}
}

function displayLocation(position) {
		var latitude = position.coords.latitude;
		var longitude = position.coords.longitude;

		var div = document.getElementById("location");
		div.innerHTML = "You are at Latitude: " + latitude + ", Longitude: " + longitude;

		var km = computeDistance(position.coords, wickCoords);
		var distance = document.getElementById("distance");
		distance.innerHTML = "You are " + km + " km from the WickedlySmart HQ";

		showMap(position.coords);
}

//The Geolocation API passes an error object. The error object contains a code 
//property with a number from 0 to 3.
function displayError(error) {
		//create an object with three properties named 0 to 3.
		var errorType = {
				0: "Unknown error",
				1: "Permission denied by user",
				2: "Position is not available",
				3: "Request timed out"
		};
		var errorMessage = errorType[error.code];
		//in case of error 0 and 2, there is sometimes additional information
		//in the error.message property.
		if (error.code == 0 || error.code == 2) {
				errorMessage = errorMessage + " " + error.message;
		}
		var div = document.getElementById("location");
		div.innerHTML = errorMessage;
}		

function computeDistance(startCoords, destCoords) {
		var startLatRads = degreeToRadians(startCoords.latitude);
		var startLongRads = degreeToRadians(startCoords.longitude);
		var destLatRads = degreeToRadians(destCoords.latitude);
		var destLongRads = degreeToRadians(destCoords.longitude);

		var Radius = 6371; //radius of the Earth in km.
		var distance = Math.acos(Math.sin(startLatRads) * Math.sin(destLatRads) +
										Math.cos(startLatRads) * Math.cos(destLatRads) *
										Math.cos(startLongRads - destLongRads)) * Radius;
		return distance;
}

function degreeToRadians(degrees) {
		var radians = (degrees * Math.PI) / 180;
		return radians;
}

function showMap(coords) {
		var googleLatAndLong = new google.maps.LatLng(coords.latitude,
						coords.longitude);
		//create the mapOptions object with the options we want to set for the map.
		var mapOptions = {
				zoom: 15,
				center: googleLatAndLong,
				mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var mapDiv = document.getElementById("map");
		//assign the new Map object to the global var map.
		map = new google.maps.Map(mapDiv, mapOptions);

		//var title = "haiqiong location";
		//var content = "I am here: " + coords.latitude + ", " + coords.longitude;
		//addMarker(map, googleLatAndLong, title, content);
}

function addMarker(map, latlong, title, content) {
		var markerOptions = {
				position: latlong,
				map: map,
				title: title,
				clickable: true
		};
		var marker = new google.maps.Marker(markerOptions);

		var infoWindowOptions = {
				content: content,
				position: latlong
		};
		var infoWindow = new google.maps.InfoWindow(infoWindowOptions);

		google.maps.event.addListener(marker, "click", function() {
				infoWindow.open(map);
		});
}
