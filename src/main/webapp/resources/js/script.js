var positionNode = document.getElementById('position');
var control = document.querySelector('form[name="control"]');
var templateNode = document.getElementById('template');

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
			var ind = names.indexOf(name);
			return ind != -1;
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
	var template = templateNode.cloneNode(true);
	var row = template.querySelector('tr');
	if (row) {
		mark(row, label);
		return row;
	}
	console.log('return nothing');
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
	mark(node, 'surname-box');
	console.log('create surname data returns', node);
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
	mark(node, 'name-box');
	console.log('create name data returns', node);
	return node;
}

/**
 * Return the elements that are present in both arrays.
 * 
 * @param src
 *            array
 * @param filter
 *            array
 * @returns array
 */
function intersect(src, filter) {
	return src.filter(function(e) {
		return filter.indexOf(e) != -1;
	});
}

/**
 * Make visible those elements whose class attribute contains the marker and
 * make invisible those elements whose class attribute does not contain the
 * marker.
 * 
 * @param elems
 * @param marker
 */
function highlight(elems, marker) {
	console.log('highlight', elems, marker);
	elems.forEach(function(e) {
		var names = getClassNames(e);
		setVisibility(e, names.indexOf(marker) != -1);
	});
}

/**
 * Add a class name to the element in order to make visible or invisible.
 * 
 * @param e
 * @param visibility
 *            true for make the element visible, false - invisible
 */
function setVisibility(e, visibility) {
	console.log('Setting visibility of', e, ' to', visibility);
	var visibleClass = 'template-item-visible';
	var invisibleClass = 'template-item-invisible';
	var isVisible = hasClass(e, visibleClass);
	if (visibility) {
		mark(e, visibleClass);
		unmark(e, invisibleClass);
	} else {
		unmark(e, visibleClass);
		mark(e, invisibleClass);

	}
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
	console.log('toggle info block', elem, parent, data);
	var infoBlockMarker = 'info-block';
	var invisibleName = 'template-invisible';
	var next = parent.nextSibling;
	var clickedClassNames = intersect(getClassNames(elem),
			[ 'name', 'surname' ]);
	if (clickedClassNames.length == 1) {
		clickedClassName = clickedClassNames[0];
		console.log('clicked on element with class name: ' + clickedClassName);
	} else {
		console.log('Clicked element contains too many class names',
				clickedClassNames);
		return;
	}
	if (hasClass(next, infoBlockMarker)) {
		console.log('info block is present', next);
		if (hasClass(next, invisibleName)) {
			console.log(next, 'info block contains class ' + invisibleName
					+ ', it is to be removed.');
			unmark(next, invisibleName);
			console.log('classes of ', next, next.className);
		} else {
			console.log('info block is visible');
		}
		var item = next.getElementsByClassName(clickedClassName)[0];
		console.log('Bound item', item, ' for class name ' + clickedClassName);
		if (!hasClass(item, invisibleName)) {
			console.log(item, 'is visible');
			mark(item, invisibleName);
			console.log(item, 'is made invisible');
		} else {
			console.log(item, ' is invisible');
			var items = next.getElementsByClassName('template-item');
			console.log('items', items);
			var items = $(items).toArray();
			highlight(items, clickedClassName);
		}

	} else {
		console.log('info block is not present');
		var newNode = insertAfter(generateInfoBlock(data), parent);
		console.log('new node', newNode);
		if (newNode) {
			mark(newNode, infoBlockMarker);
			var items = newNode.getElementsByClassName('template-item');
			console.log('items', items);
			var items = $(items).toArray();
			highlight(items, clickedClassName);

		}
	}

}

/**
 * Insert a new node after existing one.
 * 
 * @param newNode
 * @param existingNode
 * @returns newly inserted node
 */
function insertAfter(newNode, existingNode) {
	var parent = existingNode.parentNode;
	if (parent) {
		var beforeNode = existingNode.nextSibling;
		if (beforeNode) {
			return parent.insertBefore(newNode, beforeNode);
		} else {
			return parent.appendChild(newNode);
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
		elem.className = names.join(' ');
	}
}

/**
 * Remove the marker from the elem's class names.
 * 
 * @param elem
 * @param marker
 */
function unmark(elem, marker) {
	if (!elem) {
		console.warn('the first argument is missing in unmark');
		return;
	}
	console.log('before: elem classes', elem.className);
	if (hasClass(elem, marker)) {
		var names = getClassNames(elem) || [];
		var filteredOut = names.filter(function(n) {
			return n != marker;
		});
		console.log(names, '->', filteredOut);
		elem.className = filteredOut.join(' ');

	}
	console.log('after: elem classes', elem.className);
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
