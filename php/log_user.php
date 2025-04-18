<?php
// $email = 'aleksbond565347@gmail.com';
// $password = '74657374';

$data = json_decode(file_get_contents('php://input'), true);

if(isset($data['email']) && isset($data['password'])) {
  $email = $data['email'];
  $password = bin2hex($data['password']);

  require_once './include/connect.php';

  $result = $mysql->query("SELECT * FROM `users` WHERE `email` = '$email' AND `password` = '$password'");

  $mysql->close();

  if($result->num_rows === 1){
    while($row = $result->fetch_assoc()){
      $id_user = $row["id"];
    }
      echo json_encode(array('success' => true, 'message' => 'Користувача успішно увійшов.', 'id' =>  $id_user));
  }
  else{
    echo json_encode(array('success' => false, 'message' => 'Помилка: такого користувача не було знайдено.'));
  }
  

} else {
  echo json_encode(array('success' => false, 'message' => 'Помилка: Не повні данні.'));
}
