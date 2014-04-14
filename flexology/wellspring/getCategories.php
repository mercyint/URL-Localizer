<?php
ini_set('display_errors', "1");
ini_set('error_reporting', E_ALL ^ E_NOTICE);
header("Content-type: text/xml");

//Connect to Database
include 'dbconnect.php';

$linkID = mysql_connect($db_host, $db_user, $db_pwd) or die ("Could not connect to host");
mysql_select_db($db_name, $linkID) or die("Could not find database");

$query = "SELECT * FROM requestCategories";
$resultID = mysql_query($query, $linkID) or die("Data not found.");



$articleTitle = $row['title'];
$articleCategoryID = $row['catid'];
$articleContent = $row['fulltext']; 
//$articleContent = "This is the content coming from PHP"; 
?>

<categories>
<?php while($row = mysql_fetch_object($resultID))
{ ?>
	<category>
		<categoryID><?php echo $row->categoryID; ?></categoryID>
		<categoryTitle><?php echo $row->categoryTitle; ?></categoryTitle>
	</category>
<?php } ?>
</categories>