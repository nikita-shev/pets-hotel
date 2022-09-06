<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Страница благодарности</title>
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/stylesheet.css">
    <link rel="stylesheet" href="css/main.css">

    <script src="https://api-maps.yandex.ru/2.1/?apikey=7ea25d75-3291-4617-8301-7871f6b77d3c&lang=ru_RU" type="text/javascript"></script>
</head>
<body>

<?php include('template/header.php'); ?>

<section class="description">
    <div class="container">
        <div class="description-wrapper d-flex">
            <div class="offer description__offer wow fadeInLeft">
                <h1 class="offer__title">Внутренняя отделка помещений "под ключ"</h1>
                <p class="offer__text">с гарантией качества, прописанной в договоре</p>
                <ul class="offer-list">
                    <li class="offer-list__item">
                        <div class="offer-list__clock d-flex">Точно соблюдаем сроки</div>
                    </li>
                    <li class="offer-list__item">
                        <div class="offer-list__calculate d-flex">Рассчитаем смету на работы и&nbsp;материалы в день обращения</div>
                    </li>
                    <li class="offer-list__item">
                        <div class="offer-list__paint d-flex">Предложим более 100 вариантов исполнения&nbsp;дизайна Вашего жилья</div>
                    </li>
                </ul>
            </div>
            <img class="description-image description__img wow fadeInRight" src="img/room.png" alt="Комната">
        </div>
    </div>
</section>

<?php include('template/footer.php'); ?>

<script src="js/jquery-3.4.1.min.js"></script>
<script src="js/main.js"></script>
</body>
</html>