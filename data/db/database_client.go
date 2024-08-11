package db

import (
	"database/sql"
	"fmt"

	"github.com/gockey/data/constants"
	"github.com/gockey/util"
	_ "github.com/mattn/go-sqlite3"
)

const db_file string = "gockey.db"

type DatabaseCursor struct {
	db *sql.DB
	// mu sync.Mutex
}

var db_client *DatabaseCursor

func GetInitializedDBClient() (*DatabaseCursor, error) {
	if db_client == nil {
		var err error
		db_client, err = NewDatabaseClient()
		if err != nil {
			return nil, err
		}
		// and now that we have initialized the db client for the first time, confirm tables exist
		errors := db_client.InitializeReqTables()
		if len(errors) > 0 {
			// figure out if this should ever be a show stopper? we might never need to surface errs
			util.ErrorLog.Println("DB INIT TABLES ERRORS", errors)
			return db_client, nil
		}
	}
	return db_client, nil
}

func NewDatabaseClient() (*DatabaseCursor, error) {
	db, err := sql.Open("sqlite3", db_file)
	if err != nil {
		util.ErrorLog.Println("Could not connect to", db_file)
		return nil, err
	}
	return &DatabaseCursor{
		db: db,
	}, nil
}

func CloseDBCursor(curs *DatabaseCursor) error {
	util.InfoLog.Println("Shutting down database cursor now")
	fmt.Println("Shutting down database cursor now")
	return curs.db.Close()
}

func (curs *DatabaseCursor) InitializeReqTables() []error {
	var error_list []error
	for _, init_script := range constants.CreateScriptsIter() {
		_, err := curs.db.Exec(init_script.Script)
		if err != nil {
			util.ErrorLog.Println("Could not intialize:", init_script.Label)
			util.ErrorLog.Println("\terror:", err)
			error_list = append(error_list, err) // this allows us to initialize as many tables as we can?
		} else {
			util.InfoLog.Println(init_script.Label, "is ready to get humming")
		}
	}
	if len(error_list) != 0 {
		return error_list
	}
	return nil
}
