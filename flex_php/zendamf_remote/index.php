<?php
require_once('Zend/Amf/Server.php');
require_once('MyService.php');

$server = new Zend_Amf_Server();
//adding our class to Zend AMF Server
$server->setClass("MyService");
//Mapping the ActionScript VO to the PHP VO
//you don't have to add the package name
$server->setClassMap("VOAuthor", "VOAuthor");

echo($server -> handle());
?>