<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<title>Data table server side</title>
<link rel="stylesheet" type="text/css"
	href="<c:url value="/resources/css/datatables.min.css"/>">

<script type="text/javascript" src="<c:url value="/resources/js/jquery-3.3.1.min.js"/>"></script>
<script type="text/javascript" src="<c:url value="/resources/js/datatables.min.js"/>"></script>
<body>
	<a href="/datatable/consumer/clientside">Client-side rendering</a>
	<h1>Data Table client side</h1>
	<ol id="requestList"></ol>
	<table id="example" class="display" style="width:100%">
		<thead>
			<tr>
				<th>First name</th>
				<th>Last name</th>
				<th>Position</th>
				<th>Office</th>
				<th>Start date</th>
				<th>Salary</th>
			</tr>
		</thead>
		<tfoot>
			<tr>
				<th>First name</th>
				<th>Last name</th>
				<th>Position</th>
				<th>Office</th>
				<th>Start date</th>
				<th>Salary</th>
			</tr>
		</tfoot>
	</table>
	<script type="text/javascript">
		$(document).ready(function() {
			$('#example').DataTable({
				"processing" : true,
				"serverSide" : true,
				"ajax" : "/datatable/producer/data/strings"
			});
		});

		
		function addListItem(message) {
			var target = document.getElementById("requestList");
			var item = document.createElement("li");
			item.innerHTML = message;
			target.appendChild(item);

			console.dir(xhr); // have a look if there is anything useful here
		};
		
		
		(function() {
		    var origOpen = XMLHttpRequest.prototype.open;
		    XMLHttpRequest.prototype.open = function(method, url) {
		        this.addEventListener('load', function() {
		        	addListItem(url.replace(/%5B/g, '[').replace(/%5D/g, ']'));
		        });

		        this.addEventListener('error', function() {
		            console.log('XHR errored out', method, url);
		        });
		        origOpen.apply(this, arguments);
		    };
		})();
	</script>
</body>
</html>