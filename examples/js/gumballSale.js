var lastReportTime = 0;

window.onload = init;

function init() {
		changeCSS();
		checkLuck();
		setInterval(handleRefresh, 3000);
		//showSales();	
		/*
		var button = document.getElementById("check");
		//button.onclick = handleButtonPress;
		button.onclick = function{
				if (
		};
		*/
}

function checkLuck() {

		var url = "luckyornot.txt";
		//cannot get data from the link;
		//var url = "http://gumball.wickedlysmart.com/";

		var request = new XMLHttpRequest();

		request.onload = function() {
				if (request.status == 200) {
						displayLuck(request.responseText);
				}
		};

		request.open("GET", url);
		request.send(null);
}

function displayLuck(luck) {
		var div = document.getElementById("luck");
		div.innerHTML = "Today I am " + luck;
}

function changeCSS() {
		var elems = document.getElementsByTagName("p");
		//alert(elems.length);
		var result = "URL: " + document.URL + "\n";
		for (var i = 0; i < elems.length; i++) {
				result += "Element ID: " + elems[i].id + "\n";
				elems[i].style.border = "medium double black";
				elems[i].style.padding = "4px";
		}
		document.getElementById("parameta").innerHTML = result;
}

function showSales() {
		//var url = "sales.json";
		var url = "http://gumball.wickedlysmart.com";
		var request = new XMLHttpRequest();
		request.open("GET", url);
		request.onload = function() {
				if (request.status == 200) {
						updateSales(request.responseText);
				}
		};
		request.send(null);
}

//function updateSales(responseText) {
//JSONP returns JS object. It has already parse the JSON string.
function updateSales(sales) {
		var salesDiv = document.getElementById("sales");
		//var sales = JSON.parse(responseText);

		for (var i = 0; i < sales.length; i++) {
				var sale = sales[i];
				var div = document.createElement("div");
				//the saleItem class is used by CSS.
				div.setAttribute("class", "saleItem");
				div.innerHTML = sale.name + " sold " + sale.sales + " gumballs";
				salesDiv.appendChild(div);
		}
		//the most recent sale is the last one in the sales array.
		if (sales.length > 0) {
				lastReportTime = sales[sales.length - 1].time;
		}
}

function handleRefresh() {
		//add a random number to the end of URL to prevent browser cache.
		//random is a dummy parameter on the end of the URL. The web server will just
		//ignore it, but it's enought to fake out the browser.
		//be careful the name of dummy parameters.
		var url = "http://gumball.wickedlysmart.com?callback=updateSales" + 
							"&lastreporttime=" + lastReportTime +
							"&random=" + (new Date()).getTime();
	
		//add a new script.
		var newScriptElem = document.createElement("script");
		newScriptElem.setAttribute("src", url);
		newScriptElem.setAttribute("id", "jsonp");

		//replace a script.
		var oldScriptElem = document.getElementById("script");
		var head = document.getElementsByTagName("head")[0];
		if (oldScriptElem == null) {
				head.appendChild(newScriptElem);
		} else {
				head.replace(newScriptElem, oldScriptElem);
		}

}

/*
function handleButtonPress() {
		alert("button pressed");
		//var url = "http://wickedlysmart.com/ifeelluckytoday";
		var url = "luckyornot.txt";
		//var url = "http://someserver.com/data.json";
		var request = new XMLHttpRequest();
		request.onreadystatechange = handleResponse;
		request.open("GET", url);
		request.send();
}

function handleResponse(e) {
		if (e.target.readyState == XMLHttpRequest.DONE &&
				e.target.status == 200) {
						result = "Today I am " + e.target.responseText;
						document.getElementById("luck").innerHTML = result;
		} else {
				alert("Error:" + request.status);
		}
}
*/
