package service

import (
	"github.com/gockey/data/db"
)

var db_client, err = db.GetInitializedDBClient()
