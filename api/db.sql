CREATE DATABASE IF NOT EXISTS productivity_db;

USE productivity_db;

CREATE TABLE IF NOT EXISTS users(
    id INT NOT NULL AUTO_INCREMENT,
    email VARCHAR(200) NOT NULL,
    password VARCHAR(200) NOT NULL,
    birth_date DATE NOT NULL,
    created_at TIMESTAMP NOT NULL,
    photo LONGBLOB,
    PRIMARY KEY (id)
);