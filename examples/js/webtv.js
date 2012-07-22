var video;

window.onload = function() {
	video = document.getElementById("video");
	video.addEventListener("error", errorHandler, false);
	//alert(getFormatExtension());
};

function getFormatExtension() {
	if(video.canPlayType("video/mp4") != "") {
		return ".mp4";
	} else if (video.canPlayType("video/webm") != "") {
			return ".webm";
	} else if (video.canPlayType("video/ogg") != "") {
			return ".ogv";
	}
}

function errorHandler() {
		if (video.error) {
				alert(video.error.code);
		}
}
