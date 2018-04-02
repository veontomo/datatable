var positionNode = document.getElementById('position');
var control = document.querySelector('form[name="control"]');

function initTable() {
	$('#table').DataTable(
			{
				serverSide : true,
				ajax : {
					url : "/datatable/consumer/data/persons",
					type : 'POST',
					dataType : 'json',
					contentType : 'application/json',
					data : function(data) {
						Array.from(control.querySelectorAll('input, select'))
								.forEach(function(i) {
									data[i.name] = i.value;
								});
						var result = JSON.stringify(data);
						console.log("data: ", data);
						return result;
					},
					error : function(err) {
						console.error(err);
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

}

function addListItem(message) {
	var target = document.getElementById("requestList");
	var item = document.createElement("li");
	item.innerHTML = message;
	target.appendChild(item);
}

function requestPositions() {
	return $.ajax({
		url : '/datatable/consumer/data/positions',
		type : 'GET'
	}).then(function(data) {
		console.log('positions received: ', data);
		fillIn(positionNode, data);
	}, function(data) {
		console.error('branches are NOT received', data);
	});

}

function fillIn(parent, items) {
	while (parent.lastChild && parent.firstChild !== parent.lastChild) {
		parent.removeChild(parent.lastChild);
	}
	items.forEach(function(item) {
		var node = document.createElement('option');
		node.value = item;
		node.innerHTML = item;
		parent.appendChild(node);
	});
}

$(document).ready(function() {
	initTable();
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

	$.when(requestPositions()).done(function() {
		console.log('positions are loaded');
	});

});
