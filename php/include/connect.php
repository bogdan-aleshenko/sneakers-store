<?php

$mysql = new mysqli("localhost", "root", "", "gold_star");

if (!$mysql)
	die('Database connecting error!');

$mysql->query("SET NAMES 'utf8'");
