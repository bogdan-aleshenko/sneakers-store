<?php
require_once './include/connect.php';

$result = $mysql->query("SELECT * FROM `goods`");
$data = array();

while($row = $result->fetch_assoc()){
  array_push($data, $row);
}

$mysql->close();

header('Content-Type: application/json');

echo json_encode($data);