window.onload = function() {
		//drawRect();
		handlePreviewButt();
};

function drawRect() {
		var canvas = document.getElementById("tshirtCanvas");

		//not call getContext method, just seeing if it has a value.
		if (canvas.getContext) {
			//2d context from the canvas.
			var context = canvas.getContext("2d");
			context.fillRect(10, 10, 100, 100);
			context.strokeRect(120, 20, 100, 100);
		} else {
			alert("please upgrade your browser!");	
		}
}

function handlePreviewButt() {
		var button = document.getElementById("previewButton");
		button.onclick = previewHandler;
		makeImage();
}	

function previewHandler() {
		var canvas = document.getElementById("tshirtCanvas");
		var context = canvas.getContext("2d");

		//remove previous shapes.
		fillBackgroundColor(canvas, context);

		var selectObj = document.getElementById("shape");
		var index = selectObj.selectedIndex;
		var shape = selectObj[index].value;

		if (shape == "squares") {
				for (var squares = 0; squares < 20; squares++) {
						drawSquare(canvas, context);
				}
		} else if (shape == "circles") {
				for (var circles = 0; circles < 20; circles++) {
						drawCircles(canvas, context);
				}
		} else if (shape == "smileFaces") {
		    drawSmileFace(canvas, context);
		}
		//drawTriangle(context);
		drawText(canvas, context);
}

function drawSquare(canvas, context) {
		var w = Math.floor(Math.random() * 40);
		var x = Math.floor(Math.random() * canvas.width);
		var y = Math.floor(Math.random() * canvas.height);

		context.fillStyle = "lightblue";
		context.fillRect(x, y, w, w);
}

function fillBackgroundColor(canvas, context) {
		var selectObj = document.getElementById("backgroundColor");
		var index = selectObj.selectedIndex;
		var bgColor = selectObj[index].value;

		context.fillStyle = bgColor;
		context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawTriangle(context) {
		context.beginPath();
		context.moveTo(100, 150);
		context.lineTo(250, 75);
		context.lineTo(125, 30);
		context.closePath();

		context.lineWidth = 5;
		context.stroke();
		context.fillStyle = "red";
		context.fill();

		context.beginPath();
		context.arc(400, 100, 75, degreeToRadians(270), 0, false);
		//context.lineWidth = 3;
		//context.stroke();
		//context.fillStyle = "black";
		context.fill();
}

function drawCircles(canvas, context) {
		var radius = Math.floor(Math.random() * 40);
		var x = Math.floor(Math.random() * canvas.width);
		var y = Math.floor(Math.random() * canvas.height);

		context.beginPath();
		context.arc(x, y, radius, 0, degreeToRadians(360), true);
		context.fillStyle = "lightblue";
		context.fill();
}

function degreeToRadians(degree) {
		return (degree * Math.PI) / 180;
}

function drawSmileFace(canvas, context) {
		//the face circle.
		context.beginPath();
		context.arc(250, 100, 70, 0, degreeToRadians(360), true);
		//fille with yellow.
		context.fillStyle = "#ffffcc";
		context.fill();
		context.stroke();

		//the left eye.
		context.beginPath();
		context.arc(215, 75, 10, 0, degreeToRadians(360), true);
		context.stroke();

		//the right eye.
		context.beginPath();
		context.arc(285, 75, 10, 0, degreeToRadians(360), true);
		context.stroke();

		//the nose;
		context.beginPath();
		context.lineTo(250, 100);
		context.lineTo(250, 125);
		context.stroke();

		//the mouth.
		context.beginPath();
		context.arc(250, 135, 25, degreeToRadians(20), degreeToRadians(160), false);  
		context.stroke();
}

//Each tweet has a ton of data in it. The piece we use is the 
//text of the tweet.
function updateTweets(tweets) {
		var tweetSelection = document.getElementById("tweet");

		for (var i = 0; i < tweets.length; i++) {
				tweet = tweets[i];
				var option = document.createElement("option");
				option.text = tweet.text;
				//set the value to the same text. replace double quotes with single
				//quote to avoid formatting issues in HTML.
				option.value = tweet.text.replace("\"", "'");

				tweetSelection.options.add(option);
		}
		tweetSelection.selectedIndex = 0;
}

function drawText(canvas, context) {
		var selectObj = document.getElementById("foregroundColor");
		var index = selectObj.selectedIndex;
		var fgColor = selectObj[index].value;

		//set foregroundColor, the text color still in lightblue.
		//context.foregroundColor = fgColor;
		context.fillStyle = fgColor;
		context.font = "bold 1em sans-serif";
		context.textAlign = "left";
		context.fillText("I saw this tweet", 20, 40);

		//draw tweet.
		selectObj = document.getElementById("tweet");
		index = selectObj.selectedIndex;
		var tweetText = selectObj[index].value;

		drawBird(context);

		context.font = "italic 1.2em Times, serif";
		context.align = "left";
		context.fillText(tweetText, 30, 100);


		context.font = "bold 1em sans-serif";
		context.textAlign = "right";
		context.strokeText("and all I got was this lousy t-shirt!", canvas.width - 20, canvas.height - 40);
}

function drawBird(context) {

		//drwa twitter bird.
		var twitterBird = new Image();
		twitterBird.src = "../figures/twitterBird.png";

		//when the image has been loaded, execute this function.
		twitterBird.onload = function() {
			context.drawImage(twitterBird, 20, 120, 50, 50);
		};
}

function makeImage() {
		var canvas = document.getElementById("tshirtCanvas");
		canvas.onclick = function() {
				window.location = canvas.toDataURL("image/png");
		};
}
