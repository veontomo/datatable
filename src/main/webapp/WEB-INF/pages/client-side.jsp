<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

<html>
<title>Data table</title>
<link rel="stylesheet" type="text/css"
	href="/datatable/consumer/css/datatables.min.css">  
<script type="text/javascript" src="/datatable/consumer/js/jquery-3.3.1.min.js"></script>
<script type="text/javascript" src="/datatable/consumer/js/datatables.min.js"></script>
<body>
	<a href="/datatable/consumer/serverside">Server-side rendering</a>
	<h1>Data Table client side</h1>
	<table id="example" class="display" cellspacing="0" width="100%">
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
        $('#example').DataTable( {
            "processing": true,
            "serverSide": false,
            "ajax": "/datatable/producer/data/strings"
        } );
    } );
    </script>
</body>
</html>