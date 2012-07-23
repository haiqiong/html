window.onload = function() {
		var worker = new Worker("../js/worker.js");
		//tell a worker to do some work is by sending it a msg.
		worker.postMessage("ping");
		//when the worker finishes the task.
		worker.onmessage = function(event) {
				var message = "Worker says " + event.data;
				document.getElementById("output").innerHTML = message;
		};
};

