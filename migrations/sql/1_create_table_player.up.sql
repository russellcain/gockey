CREATE TABLE IF NOT EXISTS players (
    id INTEGER NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(40),
    nhl_team_id VARCHAR(40),
    salary INTEGER
);