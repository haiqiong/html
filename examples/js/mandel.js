var numberOfWorkers = 8;
var workers = [];

window.onload = init;

function init() {
		setupGraphics();     //defined in mandellib.js

		//click the image and zoom in.
		canvas.onclick = function(event) {
				//event.clientX is x position.
				handleClick(event.clientX, event.clientY);
		}

		for (var i = 0; i < numberOfWorkers; i++) {
				var worker = new Worker("../js/mandel_worker.js");
				//when the worker finish the task.
				worker.onmessage = function(event) {
						processWork(event.target, event.data);
				}
				//idle is the additiona property, not the property from Web Worker API.
				worker.idle = true;
				workers.push(worker);
		}
		//let worker do sth.
		startWorkers();
}

//the row to draw.
var nextRow = 0;
//the iteration number.
var generation = 0;

function startWorkers() {
		generation++;
		nextRow = 0;

		for (var i = 0; i < workers.length; i++) {
				var worker = workers[i];
				if (worker.idle) {
						var task = createTask(nextRow);
						worker.idle = false;
						//tell the work to start work.
						worker.postMessage(task);
						nextRow++;
				}
		}
}

function processWork(worker, workerResult) {
		drawRow(workerResult);
		reassignWorker(worker);
}

function reassignWorker(worker) {
		var row = nextRow++;

		if (row >= canvas.height) {
				worker.idle = true;
		} else {
				var task = createTask(row);
				worker.idle = false;
				worker.postMessage(task);
		}
}

function handleClick(x, y) {
		//resize the area. (x, y) is the center.
		var width = r_max - r_min;
		var height = i_min - i.max;
		var click_r = r_min + width * x / canvas.width;
		var click_i = i_max + height * y / canvas.height;

		//zoom determines how far zoomed in the fractal.
		var zoom = 8;

		r_min = click_r - width/zoom;
		r_max = click_r + width/zoom;
		i_max = click_i - height/zoom;
		i_min = click_i + height/zoom;

		startWorkers();
}
