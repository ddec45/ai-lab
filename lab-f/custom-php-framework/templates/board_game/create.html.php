<?php

/** @var \App\Model\BoardGame $boardGame */
/** @var \App\Service\Router $router */

$title = 'Create Board Game';
$bodyClass = "edit";

ob_start(); ?>
    <h1>Create Board Game</h1>
    <form action="<?= $router->generatePath('board-game-create') ?>" method="post" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="board-game-create">
    </form>

    <a href="<?= $router->generatePath('board-game-index') ?>">Back to list</a>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
