
window.onload = init;

function init() {
	var button = document.getElementById("addButton");
	button.onclick = handleButtonClick;
	loadPlayList();
}

function handleButtonClick() {
	var songName = document.getElementById("songTextInput").value;
	var ul = document.getElementById("playlist");
	var li = document.createElement("li");

	if (songName == "") {
		alert("Please enter a song");
	} else {
		li.innerHTML = songName;
		ul.appendChild(li);
	}
	save(songName);
}
