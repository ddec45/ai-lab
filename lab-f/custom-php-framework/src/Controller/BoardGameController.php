<?php
namespace App\Controller;

use App\Exception\NotFoundException;
use App\Model\BoardGame;
use App\Service\Router;
use App\Service\Templating;

class BoardGameController
{
    public function indexAction(Templating $templating, Router $router): ?string
    {
        $boardGames = BoardGame::findAll();
        $html = $templating->render('board_game/index.html.php', [
            'boardGames' => $boardGames,
            'router' => $router,
        ]);
        return $html;
    }

    public function createAction(?array $requestBoardGame, Templating $templating, Router $router): ?string
    {
        if ($requestBoardGame) {
            $boardGame = BoardGame::fromArray($requestBoardGame);
            // @todo missing validation
            $boardGame->save();

            $path = $router->generatePath('board-game-index');
            $router->redirect($path);
            return null;
        } else {
            $boardGame = new BoardGame();
        }

        $html = $templating->render('board_game/create.html.php', [
            'boardGame' => $boardGame,
            'router' => $router,
        ]);
        return $html;
    }

    public function editAction(int $boardGameId, ?array $requestBoardGame, Templating $templating, Router $router): ?string
    {
        $boardGame = BoardGame::find($boardGameId);
        if (! $boardGame) {
            throw new NotFoundException("Missing boardGame with id $boardGameId");
        }

        if ($requestBoardGame) {
            $boardGame->fill($requestBoardGame);
            // @todo missing validation
            $boardGame->save();

            $path = $router->generatePath('board-game-index');
            $router->redirect($path);
            return null;
        }

        $html = $templating->render('board_game/edit.html.php', [
            'boardGame' => $boardGame,
            'router' => $router,
        ]);
        return $html;
    }

    public function showAction(int $boardGameId, Templating $templating, Router $router): ?string
    {
        $boardGame = BoardGame::find($boardGameId);
        if (! $boardGame) {
            throw new NotFoundException("Missing boardGame with id $boardGameId");
        }

        $html = $templating->render('board_game/show.html.php', [
            'boardGame' => $boardGame,
            'router' => $router,
        ]);
        return $html;
    }

    public function deleteAction(int $boardGameId, Router $router): ?string
    {
        $boardGame = BoardGame::find($boardGameId);
        if (! $boardGame) {
            throw new NotFoundException("Missing boardGame with id $boardGameId");
        }

        $boardGame->delete();
        $path = $router->generatePath('board-game-index');
        $router->redirect($path);
        return null;
    }
}
