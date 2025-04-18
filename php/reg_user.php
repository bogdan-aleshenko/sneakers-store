<?php
function valid($email, $pass, $repeat_pass)  {
  if (filter_var($email, FILTER_VALIDATE_EMAIL) && $pass === $repeat_pass) {
    return true;
  } else {
    return false;
  }
}
$data = json_decode(file_get_contents('php://input'), true);

// $email = 'aleksbond565347@gmail.com';
// $password = 'test1234';
// $repeat_password = 'test1234';

if(isset($data['email']) && isset($data['password']) && isset($data['repeatPassword'])) {
  $email = $data['email'];
  $password = bin2hex($data['password']);
  $repeat_password = bin2hex($data['repeatPassword']);

  require_once './include/connect.php';

  if(valid($email, $password, $repeat_password)){
    $result = $mysql->query("SELECT `id` FROM `users` WHERE `email` = '$email'");


    if($result->num_rows === 0){
      $mysql->query("INSERT INTO `users` (`id`, `email`, `password`) VALUES (NULL, '$email', '$password')");
    }else{
      echo json_encode(array('success' => false, 'message' => 'Даний корисутвач вже зарєстрован!.'));
    }

    $result = $mysql->query("SELECT `id` FROM `users` WHERE `email` = '$email'");

    while($row = $result->fetch_assoc()){
      $id_user = $row["id"];
    }

  }else{
    echo json_encode(array('success' => false, 'message' => 'Дані не пройшли валідацію.'));
  }

  $mysql->close();

  echo json_encode(array('success' => true, 'message' => 'Користувача успішно зареєстровано.', 'id' =>  $id_user));
} else {
  echo json_encode(array('success' => false, 'message' => 'Помилка: Дані не були передані коректно.'));
}
