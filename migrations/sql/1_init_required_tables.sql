CREATE TABLE IF NOT EXISTS leagues (
    id INTEGER NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS teams (
    id INTEGER NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    owner VARCHAR(40) DEFAULT (''),
    league_id INTEGER NOT NULL,
    FOREIGN KEY(league_id) REFERENCES leagues(id)
);

CREATE TABLE IF NOT EXISTS players (
    id INTEGER NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    photo VARCHAR(255) DEFAULT(''),
    position VARCHAR(40),
    nhl_team_code VARCHAR(40),
    nhl_team_name VARCHAR(40),
    salary INTEGER DEFAULT(0)
);

CREATE TABLE IF NOT EXISTS ref_table (
    id STRING NOT NULL PRIMARY KEY, -- `{league_id}_{team_id}_{player_id}`
    league_id INTEGER NOT NULL,
    team_id INTEGER NOT NULL,
    player_id INTEGER NOT NULL,
    status VARCHAR(40) NOT NULL DEFAULT ('added'),
    event_datetime TEXT DEFAULT (datetime()),
    FOREIGN KEY(league_id) REFERENCES leagues(id),
    FOREIGN KEY(team_id) REFERENCES teams(id),
    FOREIGN KEY(player_id) REFERENCES players(id)
);