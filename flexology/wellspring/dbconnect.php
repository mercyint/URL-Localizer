<?php
$db_host = "localhost";
$db_user = "root";
$db_pwd = "";
$db_name = "wellspring";
mysql_connect($db_host, $db_user, $db_pwd);
mysql_select_db($db_name) or die( "Unable to select database");
?>