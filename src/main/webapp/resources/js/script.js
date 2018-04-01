var control = document.querySelector('form[name="control"]');
$(document)
		.ready(
				function() {
					$('#table')
							.DataTable(
									{
										serverSide : true,
										ajax : {
											url : "/datatable/consumer/data/persons",
											type : 'POST',
											dataType : 'json',
											contentType : 'application/json',
											data : function(data) {
												Array
														.from(
																control
																		.querySelectorAll('input, select'))
														.forEach(
																function(i) {
																	data[i.name] = i.value;
																});
												var result = JSON
														.stringify(data);
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
								addListItem(url.replace(/%5B/g, '[').replace(
										/%5D/g, ']'));
							});

							this.addEventListener('error', function() {
								console.log('XHR errored out', method, url);
							});
							origOpen.apply(this, arguments);
						};
					})();

				});
