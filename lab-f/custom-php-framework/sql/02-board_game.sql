create table board_game
(
    id      integer not null
        constraint post_pk
            primary key autoincrement,
    title text not null,
    genre text not null,
    author text not null,
    img text not null,
    description text not null
);
