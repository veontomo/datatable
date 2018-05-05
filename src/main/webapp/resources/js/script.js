var positionNode = document.getElementById('position');
var control = document.querySelector('form[name="control"]');

/**
 * Return true if the element exists and has given class name.
 * 
 * @param elem
 *            check whether this element exists
 * @param name
 *            presence of this class name among the element's class names is to
 *            be checked
 * @returns true if the element has requested class name, false otherwise
 */
function hasClass(elem, name) {
	if (elem && name) {
		var allNameStr = elem.className;
		if (allNameStr) {
			var names = allNameStr.split(/\s+/);
			return names.indexOf(name) != -1;
		}
	}
	return false;
}

/**
 * Generate the info block using given data and applying a class name.
 * 
 * @param data
 * @param label
 *            class name
 * @returns
 */
function generateInfoBlock(data, label) {
	console.log('row', row);
	console.log('data', data);
	var row = document.createElement('tr');
	row.className = 'info-box';
	var cell = document.createElement('td');
	for ( var key in data) {
		if (data.hasOwnProperty(key)) {
			var d = document.createElement('div');
			d.appendChild(document.createTextNode(key + ": " + data[key]));
			cell.appendChild(d);

		}
	}
	row.appendChild(cell);
	return row;
}

/**
 * Add or remove an info block after the given row.
 * 
 * @param row
 * @param data
 */
function toggleInfoBlock(row, data) {
	var className = 'info-box';
	var nextRow = row.nextSibling;
	if (hasClass(nextRow, className)) {
		row.parentNode.removeChild(nextRow);
	} else {
		var infoRow = generateInfoBlock(data, className);
		if (nextRow) {
			row.parentNode.insertBefore(infoRow, nextRow);
		} else {
			row.parentNode.appendChild(infoRow);
		}
	}
}

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
				"createdRow" : function(row, data, index) {
					// console.log("row", row);
					// console.log("data", data);
					// console.log("index", index);
					var name = "highlight";
					if (data['mansion'] == 'programmer') {
						console.log('row found: ' + index);
						var classNames = row.className.split(" ");
						if (classNames.indexOf(name) == -1) {
							console.log('apply the style');
							row.className += " " + name;
							console.log("row", row);
						}
						row.addEventListener('click', function() {
							console.log("click on row ", this);
							toggleInfoBlock(this, data);
						})

					}
				},
				"columns" : [ {
					data : "id"
				}, {
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
