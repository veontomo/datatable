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
		var names = getClassNames(elem);
		if (names) {
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
	var row = document.createElement('tr');
	row.className = 'info-box';
	var cell = document.createElement('td');
	cell.colSpan = 4;
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
 * Create a surname block.
 * 
 * @param data
 */
function createSurnameData(data) {
	var className = 'info-box';
	var node = generateInfoBlock({
		surname : data.surname
	}, className);
	node.className += ' surname-box';
	return node;
}

/**
 * Create a name block.
 * 
 * @param data
 */
function createNameData(data) {
	var className = 'info-box';
	var node = generateInfoBlock({
		name : data.name
	}, className);
	node.className += ' name-box';
	return node;
}

/**
 * 
 * Add or remove an info block as a next child parent node.
 * 
 * @param elem
 * @param parent
 *            elem's parent node
 * @param data
 * @param generator
 *            two argument function that returns an html node that is to be
 *            inserted after the element
 * @returns
 */
function toggleInfoBlock(elem, parent, data, generator) {
	var name = 'active';
	if (hasClass(elem, name)) {
		var nextRow = parent.nextSibling;
		parent.parentNode.removeChild(nextRow);
		unmark(elem, name);

	} else {
		var siblings = parent.childNodes;
		var marked = $(siblings).toArray().filter(function(n) {
			return hasClass(n, name);
		});
		var numberOfMarkedElems = marked.length;
		if (numberOfMarkedElems > 1) {
			console.error('Too many marked elements!', parent);
		}
		if (numberOfMarkedElems == 0) {
			var node = generator(data, name);
			var next = parent.nextSibling;
			if (next) {
				parent.parentNode.insertBefore(node, next);
			} else {
				parent.parentNode.appendChild(node);
			}
			mark(elem, name);
		} else {
			var nextRow = parent.nextSibling;
			parent.parentNode.removeChild(nextRow);
			unmark(marked[0], name);
			toggleInfoBlock(elem, parent, data, generator);
		}

	}

}

/**
 * Return class names of the given node.
 * 
 * @param node
 * @returns array of strings, might be empty if no class names are found or null
 *          if no node is given.
 */
function getClassNames(node) {
	if (node) {
		var classAttrName = 'class';
		var classNames = node.getAttribute(classAttrName) || "";
		return classNames.split(/\s+/).filter(function(n) {
			return n != '';
		});

	}
}

/**
 * Mark the element by adding the class name to its class names (if any).
 * 
 * @param elem
 * @param name
 */
function mark(elem, marker) {
	if (elem && !hasClass(elem, marker)) {
		var names = getClassNames(elem) || [];
		names.push(marker);
		elem.setAttribute('class', names.join(' '));
	}
}

/**
 * Remove the marker from the elem's class names.
 * 
 * @param elem
 * @param marker
 */
function unmark(elem, marker) {
	if (elem && hasClass(elem, marker)) {
		var names = getClassNames(elem) || [];
		var filteredOut = names.filter(function(n) {
			return n != marker;
		});
		elem.setAttribute('class', filteredOut.join(' '));
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
					var name = "highlight";
					if (data['mansion'] == 'programmer') {
						console.log('row found: ' + index);
						var classNames = row.className.split(" ");
						if (classNames.indexOf(name) == -1) {
							console.log('apply the style');
							row.className += " " + name;
							console.log("row", row);
						}
						row.querySelector('.name').addEventListener(
								'click',
								function(e) {
									toggleInfoBlock(this, row, data,
											createNameData);
								}, true);
						row.querySelector('.surname').addEventListener(
								'click',
								function(e) {
									toggleInfoBlock(this, row, data,
											createSurnameData);
								});

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
				} ],
				columnDefs : [ {
					targets : 1,
					className : 'name'
				}, {
					targets : 2,
					className : 'surname'
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

	$.when(requestPositions()).then(function(v) {
		console.log('positions are loaded', v);
		fillIn(positionNode, v);
	});

});
