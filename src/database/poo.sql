-- Active: 1675088848511@@127.0.0.1@3306

----------CRIAR AS TABELAS
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL
);

CREATE TABLE accounts (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    owner_id TEXT NOT NULL,
    balance REAL DEFAULT (0) NOT NULL,
    created_at TEXT DEFAULT (DATETIME()) NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES users (id)
);
----------POPULAR AS TABELAS
INSERT INTO users (id, name, email, password)
VALUES
	("u001", "Fulano", "fulano@email.com", "fulano123"),
	("u002", "Beltrana", "beltrana@email.com", "beltrana00");

INSERT INTO accounts (id, owner_id)
VALUES
	("a001", "u001"),
	("a002", "u002");

----------VISUALIZAR AS TABELAS
SELECT * FROM users;
SELECT * FROM accounts;

---------DELETAR AS TABELAS
DROP TABLE users;
DROP TABLE accounts;

----------------------------------------
