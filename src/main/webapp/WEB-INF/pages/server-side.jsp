<!DOCTYPE html>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<title>Data table server side</title>
<link rel="stylesheet" type="text/css"
	href="<c:url value="/resources/css/datatables.min.css"/>">
<link rel="stylesheet" type="text/css"
	href="<c:url value="/resources/css/custom.css"/>">

<script type="text/javascript"
	src="<c:url value="/resources/js/jquery-3.3.1.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/resources/js/datatables.min.js"/>"></script>
<body>
	<a href="/datatable/consumer/clientside">Client-side rendering</a>
	<h1>Data Table client side</h1>
	<form name="control">
		<label for="name">Name</label> <input type="text" name="name"
			id="name"> <label for="position">Position</label> <select
			name="position" id="position"><option value="all">all</option>
		</select>
	</form>
	<ol id="requestList"></ol>
	<table id="table" class="display" style="width: 100%">
		<thead>
			<tr>
				<th>id</th>
				<th>First name</th>
				<th>Last name</th>
				<th>Position</th>
			</tr>
		</thead>
	</table>
	<table id="template" style="display: none;">
		<tr colspan="4">
			<td>
				<table class="name template-item">
					<tr>
						<td class="template-name">name</td>
					</tr>

				</table>
				<table class="surname template-item">
					<tr>
						<td class="template-surname">Surname</td>
					</tr>

				</table>
			</td>
		</tr>
	</table>
	<script type="text/javascript"
		src="<c:url value="/resources/js/script.js"/>"></script>

</body>
</html>