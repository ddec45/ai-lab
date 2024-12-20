<?php

/** @var \App\Model\BoardGame $boardGame */
/** @var \App\Service\Router $router */

$title = "Edit Board Game {$boardGame->getTitle()} ({$boardGame->getId()})";
$bodyClass = "edit";

ob_start(); ?>
    <h1><?= $title ?></h1>
    <form action="<?= $router->generatePath('board-game-edit') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="board-game-edit">
        <input type="hidden" name="id" value="<?= $boardGame->getId() ?>">
    </form>

    <ul class="action-list">
        <li>
            <a href="<?= $router->generatePath('board-game-index') ?>">Back to list</a></li>
        <li>
            <form action="<?= $router->generatePath('board-game-delete') ?>" method="post">
                <input type="submit" value="Delete" onclick="return confirm('Are you sure?')">
                <input type="hidden" name="action" value="board-game-delete">
                <input type="hidden" name="id" value="<?= $boardGame->getId() ?>">
            </form>
        </li>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
