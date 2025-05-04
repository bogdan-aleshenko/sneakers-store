<?php
  $data = json_decode(file_get_contents('php://input'), true);
  

  if(isset($data['idUser'])){
    $id_user = $data['idUser'];
    $data = array();

    require_once './include/connect.php';

    $result = $mysql->query("SELECT g.`id`, g.`name`, g.`desc_goods`, g.`price`, g.`path` FROM `shopping_cart` sc JOIN `goods` g ON sc.`id_goods` = g.`id` WHERE sc.`id_user` = '$id_user';");

    while($row = $result->fetch_assoc()){
      array_push($data, $row);
      INSERT INTO orders (user_id, product_id, size, quantity)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity);
    }

    $mysql->close();

    header('Content-Type: application/json');

    echo json_encode($data);
  }else {
    Log::channel('performance')->info('Пошук товарів', ['filters' => $filters]);
    echo json_encode(array('success' => false, 'message' => 'Помилка: Дані не були передані коректно.'));
  }
