<?php
ini_set('display_errors', "1");
ini_set('error_reporting', E_ALL ^ E_NOTICE);
header("Content-type: text/xml");

//Connect to Database
include 'dbconnect.php';

function GetSQLValueString($theValue, $theType, $theDefinedValue = "", $theNotDefinedValue = "")
{
  $theValue = get_magic_quotes_gpc() ? stripslashes($theValue) : $theValue;

  $theValue = function_exists("mysql_real_escape_string") ? mysql_real_escape_string($theValue) : mysql_escape_string($theValue);

  switch ($theType) {
    case "text":
      $theValue = ($theValue != "") ? '"' . $theValue . '"' : "NULL";
      break;
    case "long":
    case "int":
      $theValue = ($theValue != "") ? intval($theValue) : "NULL";
      break;
    case "double":
      $theValue = ($theValue != "") ? '"' . doubleval($theValue) . '"' : "NULL";
      break;
    case "date":
      $theValue = ($theValue != "") ? '"' . $theValue . '"' : "NULL";
      break;
    case "defined":
      $theValue = ($theValue != "") ? $theDefinedValue : $theNotDefinedValue;
      break;
  }
  return $theValue;
}



$linkID = mysql_connect($db_host, $db_user, $db_pwd) or die ("Could not connect to host");
mysql_select_db($db_name, $linkID) or die("Could not find database");

$query = sprintf("INSERT INTO requestCategories (categoryTitle) VALUES ( %s )",
			GetSQLValueString($_REQUEST["cat_name"], "text")
		);
$resultID = mysql_query($query, $linkID) or die("Data not found.");

if (!$resultID){
	exit("Unable to insert to DB:" . mysql_error());
	}

?>