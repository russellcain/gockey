package db

import (
	_ "github.com/mattn/go-sqlite3"
)

const ListQuery string = "SELECT * FROM ? WHERE ID > ? ORDER BY id DESC LIMIT 100"
const SelectByIdQuery string = `SELECT * FROM ? WHERE id=?;`
