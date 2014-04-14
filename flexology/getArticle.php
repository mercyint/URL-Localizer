<?php
ini_set('display_errors', "1");
ini_set('error_reporting', E_ALL ^ E_NOTICE);
header("Content-type: text/xml");

//Connect to Database
include 'dbconnect.php';

$linkID = mysql_connect($db_host, $db_user, $db_pwd) or die ("Could not connect to host");
mysql_select_db($db_name, $linkID) or die("Could not find database");

$query = "SELECT * FROM jos_content WHERE id = 1";
$resultID = mysql_query($query, $linkID) or die("Data not found.");

$row = mysql_fetch_assoc($resultID);

$articleTitle = $row['title'];
$articleCategoryID = $row['catid'];
$articleContent = $row['fulltext']; 
//$articleContent = "This is the content coming from PHP"; 
?>

<article>
	<articleTitle><?php echo $articleTitle; ?></articleTitle>
	<articleCategoryID><?php echo $articleCategoryID; ?></articleCategoryID>
	<articleContent><?php echo $articleContent; ?></articleContent>
</article>