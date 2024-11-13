<?php

/** @var \App\Model\BoardGame[] $boardGames */
/** @var \App\Service\Router $router */

$title = 'Board Game List';
$bodyClass = 'index';

ob_start(); ?>
    <h1>Board Games List</h1>

    <a href="<?= $router->generatePath('board-game-create') ?>">Create new</a>

    <ul class="index-list">
        <?php foreach ($boardGames as $boardGame): ?>
            <li><h3><?= $boardGame->getTitle() ?></h3>
                <ul class="action-list">
                    <li><a href="<?= $router->generatePath('board-game-show', ['id' => $boardGame->getId()]) ?>">Details</a></li>
                    <li><a href="<?= $router->generatePath('board-game-edit', ['id' => $boardGame->getId()]) ?>">Edit</a></li>
                </ul>
            </li>
        <?php endforeach; ?>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
