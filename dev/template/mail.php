<?php
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

$_POST = json_decode(file_get_contents("php://input"), true);

$name = $_POST['name'];
$nameCat = $_POST['nameCat'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$withDate = $_POST['withDate'];
$beforeDate = $_POST['beforeDate'];

$mail = new PHPMailer\PHPMailer\PHPMailer();
try {
    $msg = 'Мы перезвоним вам через 15 минут';
    $mail->isSMTP();
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth   = true;
    $mail->Host       = 'smtp.gmail.com';
    $mail->Username   = '';
    $mail->Password   = '';
    $mail->SMTPSecure = 'ssl';
    $mail->Port       = 465;
    $mail->setFrom('', '');
    $mail->addAddress('');

    $mail->isHTML(true);

    $mail->Subject = 'Новая заявка';
    $mail->Body    = "<b>Имя:</b> $name <br><b>Имя питомца:</b> $nameCat <br><b>Телефон:</b> $phone<br><b>E-mail:</b> $email<br><b>Дата заезда: с</b> $withDate <b>по </b> $beforeDate";

    if ($mail->send()) {
        echo "$msg";
    } else {
        echo "Сообщение не было отправлено. Неверно указаны настройки вашей почты";
    }
} catch (Exception $e) {
    echo "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
}
