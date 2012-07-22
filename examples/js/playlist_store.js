function save(item) {
		var playlistArray = getStoreArray("playlist");
		playlistArray.push(item);
		localStorage.setItem("playlist", JSON.stringify(playlistArray));
}

function loadPlayList() {
		var playListArray = getSaveSongs();
		var ul = document.getElementById("playlist");
		if (playListArray != null ) {
				for (var i = 0; i < playListArray.length; i++) {
						var li = document.createElement("li");
						li.innerHTML = playListArray[i];
						ul.appendChild = li;
				}
		}
}

function getSaveSongs() {
		return getStoreArray("playlist");
}

function getStoreArray(key) {
		var playlistArray = localStorage.getItem(key);
		if (playlistArray == null || playlistArray == "") {
				playlistArray = new Array();
		} else {
				playlistArray = JSON.parse(playlistArray);
		}
		return playlistArray;
}
