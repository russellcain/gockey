CREATE TABLE IF NOT EXISTS leagues (
    id INTEGER NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS teams (
    id INTEGER NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    owner VARCHAR(40),
    league_id INTEGER NOT NULL,
    FOREIGN KEY(league_id) REFERENCES leagues(id)
);

CREATE TABLE IF NOT EXISTS players (
    id INTEGER NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    position VARCHAR(40),
    nhl_team_code VARCHAR(40),
    salary INTEGER
);

CREATE TABLE IF NOT EXISTS team_player_ref (
    team_id INTEGER NOT NULL,
    player_id INTEGER NOT NULL,
    FOREIGN KEY(team_id) REFERENCES teams(id),
    FOREIGN KEY(player_id) REFERENCES players(id)
);