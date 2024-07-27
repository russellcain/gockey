CREATE TABLE IF NOT EXISTS players (
    id VARCHAR(40),
    name VARCHAR(255),
    position VARCHAR(255),
    nhl_team_id VARCHAR(40),
    salary INTEGER,
    PRIMARY KEY(id)
);