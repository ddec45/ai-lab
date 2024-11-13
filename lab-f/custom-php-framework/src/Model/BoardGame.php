<?php
namespace App\Model;

use App\Service\Config;

class BoardGame
{
    private ?int $id = null;
    private ?string $title = null;
    private ?string $genre = null;
    private ?string $author = null;
    private ?string $img = null;
    private ?string $description = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): BoardGame
    {
        $this->id = $id;

        return $this;
    }

    public function getTitle(): ?string
    {
        return $this->title;
    }

    public function setTitle(?string $title): BoardGame
    {
        $this->title = $title;

        return $this;
    }

    public function getGenre(): ?string
    {
        return $this->genre;
    }

    public function setGenre(?string $genre): BoardGame
    {
        $this->genre = $genre;

        return $this;
    }

    public function getAuthor(): ?string
    {
        return $this->author;
    }

    public function setAuthor(?string $author): BoardGame
    {
        $this->author = $author;

        return $this;
    }

    public function getImg(): ?string
    {
        return $this->img;
    }

    public function setImg(?string $img): BoardGame
    {
        $this->img = $img;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): BoardGame
    {
        $this->description = $description;

        return $this;
    }

    public static function fromArray($array): BoardGame
    {
        $post = new self();
        $post->fill($array);

        return $post;
    }

    public function fill($array): BoardGame
    {
        if (isset($array['id']) && ! $this->getId()) {
            $this->setId($array['id']);
        }
        if (isset($array['title'])) {
            $this->setTitle($array['title']);
        }
        if (isset($array['genre'])) {
            $this->setGenre($array['genre']);
        }
        if (isset($array['author'])) {
            $this->setAuthor($array['author']);
        }
        if (isset($array['img'])) {
            $this->setImg($array['img']);
        }
        if (isset($array['description'])) {
            $this->setDescription($array['description']);
        }

        return $this;
    }

    public static function findAll(): array
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM board_game';
        $statement = $pdo->prepare($sql);
        $statement->execute();

        $boardGames = [];
        $boardGamesArray = $statement->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($boardGamesArray as $boardGameArray) {
            $boardGames[] = self::fromArray($boardGameArray);
        }

        return $boardGames;
    }

    public static function find($id): ?BoardGame
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM board_game WHERE id = :id';
        $statement = $pdo->prepare($sql);
        $statement->execute(['id' => $id]);

        $boardGameArray = $statement->fetch(\PDO::FETCH_ASSOC);
        if (! $boardGameArray) {
            return null;
        }
        $boardGame = BoardGame::fromArray($boardGameArray);

        return $boardGame;
    }

    public function save(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        if (! $this->getId()) {
            $sql = "INSERT INTO board_game (title, genre, author, img, description) VALUES (:title, :genre, :author, :img, :description)";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                'title' => $this->getTitle(),
                'genre' => $this->getGenre(),
                'author' => $this->getAuthor(),
                'img' => $this->getImg(),
                'description' => $this->getDescription(),
            ]);

            $this->setId($pdo->lastInsertId());
        } else {
            $sql = "UPDATE board_game SET title = :title, genre = :genre, author = :author, img = :img, description = :description WHERE id = :id";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                'title' => $this->getTitle(),
                'genre' => $this->getGenre(),
                'author' => $this->getAuthor(),
                'img' => $this->getImg(),
                'description' => $this->getDescription(),
                ':id' => $this->getId(),
            ]);
        }
    }

    public function delete(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = "DELETE FROM board_game WHERE id = :id";
        $statement = $pdo->prepare($sql);
        $statement->execute([
            ':id' => $this->getId(),
        ]);

        $this->setId(null);
        $this->setTitle(null);
        $this->setGenre(null);
        $this->setAuthor(null);
        $this->setImg(null);
        $this->setDescription(null);
    }
}
