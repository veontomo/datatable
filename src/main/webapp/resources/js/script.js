$(document).ready(function() {
	$('#table').DataTable({
		// processing : true,
		serverSide : true,
		// ajax : "/datatable/producer/data/strings",
		ajax : {
			url : "/datatable/consumer/data/persons",
			type : 'POST',
			dataType : 'json',
			contentType : 'application/json',
			data : function(data) {
				data.screen = "red";
				data.pc = 32;
				console.log("modified data:", data);
			}
		},
		"columns" : [ {
			data : "name"
		}, {
			data : "surname"
		}, {
			data : "mansion"
		} ]
	});

	function addListItem(message) {
		var target = document.getElementById("requestList");
		var item = document.createElement("li");
		item.innerHTML = message;
		target.appendChild(item);
	}

	(function() {
		var origOpen = XMLHttpRequest.prototype.open;
		XMLHttpRequest.prototype.open = function(method, url) {
			console.log("method", method);
			console.log("url", url);
			this.addEventListener('load', function() {
				addListItem(url.replace(/%5B/g, '[').replace(/%5D/g, ']'));
			});

			this.addEventListener('error', function() {
				console.log('XHR errored out', method, url);
			});
			origOpen.apply(this, arguments);
		};
	})();

});
