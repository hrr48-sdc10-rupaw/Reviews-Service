DROP DATABASE IF EXISTS reviewsComponent;


CREATE DATABASE reviewsComponent;
USE reviewsComponent;

DROP TABLE IF EXISTS games_users;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS users;

CREATE TABLE games (
  id int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (id)
);


CREATE TABLE users (
  id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  avatar VARCHAR(512),
  games_owned_count int(7) DEFAULT 0,
  reviews_count int(5) DEFAULT 0,
  comments_count int(6) DEFAULT 0,
  PRIMARY KEY (id)
);


CREATE TABLE reviews (
  id int(11) NOT NULL AUTO_INCREMENT,
  FK_game_id int(11) NOT NULL,
  FK_user_id int(11) NOT NULL,
  recommended boolean NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  body text NOT NULL,
  helpful_count int(9) DEFAULT 0,
  funny_count int(9) DEFAULT 0,
  comments_count int(6) DEFAULT 0,
  awards  VARCHAR(250),
  PRIMARY KEY (id),
  FOREIGN KEY (FK_user_id) REFERENCES users(id),
  FOREIGN KEY (FK_game_id) REFERENCES games(id)
);


CREATE TABLE games_users (
  id int(11) NOT NULL AUTO_INCREMENT,
  FK_game_id int(11) NOT NULL,
  FK_user_id int(11) NOT NULL,
  time_played int(6) DEFAULT 0,
  purchase_type varchar(20) NOT NULL,
  avatar VARCHAR(512),
  PRIMARY KEY (id),
  FOREIGN KEY (FK_user_id) REFERENCES users(id),
  FOREIGN KEY (FK_game_id) REFERENCES games(id)
);