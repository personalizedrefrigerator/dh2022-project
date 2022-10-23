DROP TABLE IF EXISTS user;
DROP TABLE IF EXISTS tag;
DROP TABLE IF EXISTS post;
DROP TABLE IF EXISTS postLike;
DROP TABLE IF EXISTS comment;
DROP TABLE IF EXISTS commentLike;

CREATE TABLE user (
    userId INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName TEXT NOT NULL,
    lastName TEXT NOT NULL,
    username TEXT NOT NULL UNIQUE,
    pass TEXT NOT NULL,
    salt TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE
);

CREATE TABLE tag (
    tagId INTEGER PRIMARY KEY AUTOINCREMENT,
    tagName TEXT NOT NULL UNIQUE,
    color TEXT NOT NULL
);

CREATE TABLE post (
    postId INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    userId INTEGER NOT NULL,
    content TEXT NOT NULL,
    createdDate TIMESTAMP NOT NULL,
    tagId INTEGER NOT NULL,
    FOREIGN KEY(userId) REFERENCES user(userId),
    FOREIGN KEY(tagId) REFERENCES tag(tagId)
);

CREATE TABLE postLike (
    postId INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    FOREIGN KEY(userId) REFERENCES user(userId),
    FOREIGN KEY(postId) REFERENCES post(postId),
    PRIMARY KEY(postId, userId)
);

CREATE TABLE comment (
    commentId INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    postId INTEGER NOT NULL,
    content TEXT NOT NULL,
    createdDate TIMESTAMP NOT NULL,
    FOREIGN KEY(postId) REFERENCES post(postId),
    FOREIGN KEY(userId) REFERENCES user(userId)
);

CREATE TABLE commentLike (
    commentId INTEGER NOT NULL,
    userId INTEGER NOT NULL,
    FOREIGN KEY(userId) REFERENCES user(userId),
    FOREIGN KEY(commentId) REFERENCES comment(commentId),
    PRIMARY KEY(commentId, userId)
);
