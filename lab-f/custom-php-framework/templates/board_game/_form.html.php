<?php
    /** @var $boardGame ?\App\Model\BoardGame */
?>

<div class="form-group">
    <label for="title">Title</label>
    <input type="text" id="title" name="boardGame[title]" value="<?= $boardGame ? $boardGame->getTitle() : '' ?>">
</div>

<div class="form-group">
    <label for="genre">Genre</label>
    <input type="text" id="genre" name="boardGame[genre]" value="<?= $boardGame ? $boardGame->getGenre() : '' ?>">
</div>

<div class="form-group">
    <label for="author">Author</label>
    <input type="text" id="author" name="boardGame[author]" value="<?= $boardGame ? $boardGame->getAuthor() : '' ?>">
</div>

<div class="form-group">
    <label for="img">Image source</label>
    <input type="text" id="img" name="boardGame[img]" value="<?= $boardGame ? $boardGame->getImg() : '' ?>">
</div>

<div class="form-group">
    <label for="description">Description</label>
    <textarea id="description" name="boardGame[description]"><?= $boardGame? $boardGame->getDescription() : '' ?></textarea>
</div>



<div class="form-group">
    <label></label>
    <input type="submit" value="Submit">
</div>
