window.onload=detectFeatures;

function detectFeatures() {
	if (Modernizr.geolocation) {
			alert("support geolocation");
	} else {
			alert("NO support for geolocation.");
	}
}
