window.onload = init;

function init() {

		var button = document.getElementById("add_button");
		button.onclick = createSticky;

		/*
		//display sticky_* in localStorage.
		for (var i = 0; i < localStorage.length; i++) {
						var key = localStorage.key(i);
						if (key.substring(0, 6) == "sticky") {
								var value = localStorage[key];
								addStickyToDom(value);
						}
		}
		*/
		//show all stickies in the localStorage array.
		var stickyArray = getStickyArray();
		for (var i = 0; i < stickyArray.length; i++) {
				var key = stickyArray[i];
				var value = JSON.parse(localStorage[key]);
				addStickyToDom(key, value);
		}

}

function addStickyToDom(key, stickyObj) {
		if (!stickyObj.text) 
				return;

		var stick_list = document.getElementById("stick_list");
		var sticky = document.createElement("li");
		sticky.setAttribute("id", key);
		sticky.style.backgroundColor = stickyObj.color;

		var span = document.createElement("span");
		span.setAttribute("class", "sticky");
		span.innerHTML = stickyObj.text;
		sticky.appendChild(span);
		sticky.onclick = deleteSticky;
		stick_list.appendChild(sticky);
}

//an sticky object contains color and text.
function createSticky() {
		var sticky = document.getElementById("note_text").value;
		var colorSelect = document.getElementById("note_color");
		var index = colorSelect.selectedIndex;
		var color = colorSelect[index].value;

		var stickyObj = {
				"text": sticky,
				"color": color
		};
		/*not using array.
		var key = "sticky_" + localStorage.length;
		localStorage[key] = sticky;
		*/
		//if using localStorage array.
		var currentDate = new Date();
		var time = currentDate.getTime();
		var key = "sticky_" + time;

		var stickyArray = getStickyArray();
		stickyArray.push(key);

		//check if out of 5MB limit.
		try {
				localStorage.setItem(key, JSON.stringify(stickyObj));
		} catch(e) {
				if (e == QUOTA_EXCEEDED_ERR) {
						alert("out of storage.");
				}
		}

		localStorage["stickyArray"] = JSON.stringify(stickyArray);
    //var test = JSON.parse(localStorage[key]);
		//alert("text:" + test.text + ", color:" + test.color);
		//show sticky on the page.
		addStickyToDom(key, stickyObj);

}

function getStickyArray() {

		var stickyArray = localStorage["stickyArray"];
		if (!stickyArray) {
				stickyArray = [];
				localStorage["stickyArray"] = JSON.stringify(stickyArray);
		} else {
				stickyArray = JSON.parse(stickyArray);
		}
		return stickyArray;
}

function deleteSticky(e) {
		var key = e.target.id;
		if (e.target.tagName.toLowerCase() == "span") {
				key = e.target.parentNode.id;
		}

		localStorage.removeItem(key);

		stickyArray = getStickyArray();
		if (stickyArray) {
				var stickyArray = getStickyArray();
				for (var i = 0; i < stickyArray.length; i++) {
						if (stickyArray[i] == key)
								//remove elements starting from 1st args, the number of elememnts 
								//to be removed is given as 2nd args.
								stickyArray.splice(i, 1);
				}
				localStorage.setItem("stickyArray", JSON.stringify(stickyArray));
				removeStickyFromDom(key);
		}
}

function removeStickyFromDom(key) {
		var sticky = document.getElementById(key);
		sticky.parentNode.removeChild(sticky);
}
