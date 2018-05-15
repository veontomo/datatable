<!DOCTYPE html>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<html>
<title>Upload</title>
<link rel="stylesheet" type="text/css"
	href="<c:url value="/resources/css/datatables.min.css"/>">
<link rel="stylesheet" type="text/css"
	href="<c:url value="/resources/css/custom.css"/>">

<script type="text/javascript"
	src="<c:url value="/resources/js/jquery-3.3.1.min.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/resources/js/upload/vendor/jquery.ui.widget.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/resources/js/upload/jquery.iframe-transport.js"/>"></script>
<script type="text/javascript"
	src="<c:url value="/resources/js/upload/jquery.fileupload.js"/>"></script>

<body>
	<form name="upload" action="/datatable/consumer/upload/files"
		method="post" enctype="multipart/form-data">
		<input id="fileupload" type="file" name="files[]" multiple> <input
			type="submit" value="Submit">
	</form>
	<script type="text/javascript"
		src="<c:url value="/resources/js/upload.js"/>"></script>

</body>
</html>