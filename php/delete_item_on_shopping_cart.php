<?php

$data = json_decode(file_get_contents('php://input'), true);
  
if(isset($data['idUser']) && isset($data['idGoods'])){
  $id_user = $data['idUser'];
  $id_goods = $data['idGoods'];

  require_once './include/connect.php';

  $mysql->query("DELETE FROM `shopping_cart` WHERE `id_goods` = '$id_goods' AND `id_user` = '$id_user'");

  $mysql->close();

  echo json_encode(array('success' => true, 'message' => 'Товар успішно видалено.', 'id'=> $id_goods));
}else {
  echo json_encode(array('success' => false, 'message' => 'Помилка: Дані не були передані коректно.'));
}

//DELETE FROM `shopping_cart` WHERE `shopping_cart`.`id` = 11

