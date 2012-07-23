//computerRow() is defined inside workerlib.js.
importScripts("../js/workerlib.js");

//all the worker does is set up the onmessage handler.
onmessage = function(task) {
		var workerResult = computeRow(task.data);
		postMessage(workerResult);
}
