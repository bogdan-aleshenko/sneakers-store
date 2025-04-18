<?php
  $data = json_decode(file_get_contents('php://input'), true);

  if(isset($data['idUser']) && isset($data['idGoods'])){
    $id_user = $data['idUser'];
    $id_goods = $data['idGoods'];

    require_once './include/connect.php';

    $result = $mysql->query("SELECT * FROM `shopping_cart` WHERE `id_goods` = '$id_goods' AND `id_user` = '$id_user'");
    
    if($result->num_rows === 0){
      $mysql->query("INSERT INTO `shopping_cart` (`id`, `id_goods`, `id_user`) VALUES (NULL, '$id_goods', '$id_user')");
      $mysql->close();
      echo json_encode(array('success' => true, 'message' => 'Товар успішно доданий!'));
    }else{
      $mysql->close();
      echo json_encode(array('success' => false, 'message' => 'Помилка: Товар вже існує.'));
    }
 
  } else {
    echo json_encode(array('success' => false, 'message' => 'Помилка: Дані не були передані коректно.'));
  }

