<?php

/** @var \App\Model\BoardGame $boardGame */
/** @var \App\Service\Router $router */

$title = "{$boardGame->getTitle()} ({$boardGame->getId()})";
$bodyClass = 'show';

ob_start(); ?>
    <h1><?= $boardGame->getTitle() ?></h1>
    <article>
        Gatunek: <?= $boardGame->getGenre();?>
    </article>
    <article>
        Autor: <?= $boardGame->getAuthor();?>
    </article>
    <div style="width:300px; height:300px; border:1px solid black">
        <img src="<?= $boardGame->getImg();?>" alt="<?= $boardGame->getImg();?>" style="width:100%">
    </div>
    <article>
        Opis: <?= $boardGame->getDescription();?>
    </article>

    <ul class="action-list">
        <li> <a href="<?= $router->generatePath('board-game-index') ?>">Back to list</a></li>
        <li><a href="<?= $router->generatePath('board-game-edit', ['id'=> $boardGame->getId()]) ?>">Edit</a></li>
    </ul>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
