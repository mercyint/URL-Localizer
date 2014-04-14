<?php
require_once('VOAuthor.php');

//conection info
define("DATABASE_SERVER", "localhost");
define("DATABASE_USERNAME", "mihai");
define("DATABASE_PASSWORD", "mihai");
define("DATABASE_NAME", "flex360");

class MyService {
	
	/**
	 * Retrieve all the records from the table
	 * @return an array of VOAuthor
	 */
	public function getData() {
		//connect to the database.
		//we could have used an abstracting layer for connecting to the database.
		//for the sake of simplicity, I choose not to.
		$mysql = mysql_connect(DATABASE_SERVER, DATABASE_USERNAME, DATABASE_PASSWORD);
		mysql_select_db(DATABASE_NAME);
		//retrieve all rows
		$query = "SELECT id_aut, fname_aut, lname_aut FROM authors_aut ORDER BY fname_aut";
		$result = mysql_query($query);
		
		$ret = array();
		while ($row = mysql_fetch_object($result)) {
			$tmp = new VOAuthor();
			$tmp->id_aut = $row->id_aut;
			$tmp->fname_aut = $row->fname_aut;
			$tmp->lname_aut = $row->lname_aut;
			$ret[] = $tmp;
		}
		mysql_free_result($result);
		return $ret;
	}
	/**
	 * Update one item in the table
	 * @param VOAuthor to be updated 
	 * @return NULL
	 */
	public function saveData($author) {
		if ($author == NULL)
			return NULL;
		//connect to the database.
		$mysql = mysql_connect(DATABASE_SERVER, DATABASE_USERNAME, DATABASE_PASSWORD);
		mysql_select_db(DATABASE_NAME);
		//save changes
		$query = "UPDATE authors_aut SET fname_aut='".$author->fname_aut."', lname_aut='".$author->lname_aut."' WHERE id_aut=".  $author->id_aut;
		$result = mysql_query($query);
		return NULL;
	}
}
?>